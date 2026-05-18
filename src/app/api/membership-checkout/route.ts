import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { optionBJuneFirstFollowingCalendarYearUnix } from '../../../lib/membershipOptionBAnchor'
import {
  formatMembershipFullName,
  getOrCreateStripeCustomer,
  isValidMembershipEmail,
  isValidMembershipNamePart,
  normalizeMembershipEmail,
} from '../../../lib/stripeMembershipCustomer'

export const runtime = 'nodejs'

/** Annual membership Price (recurring); trial aligns first paid cycle to Option B June 1. */
const DEFAULT_MEMBERSHIP_PRICE_ID = 'price_1TXCE5AHcbvyQGr2d5sq9FlR'

/** One-time dues at checkout (cents). Must match your published annual amount. */
const MEMBERSHIP_SIGNUP_UNIT_AMOUNT_CENTS = 10_000

/** Shown alongside the pay button on Stripe Checkout (hosted page). */
const CHECKOUT_CUSTOM_SUBMIT_MESSAGE =
  "You'll be charged $100 today. Your membership renews automatically each June 1st. Cancel anytime."

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL
  const siteUrl = siteUrlRaw?.replace(/\/$/, '')
  const membershipPriceId = process.env.STRIPE_MEMBERSHIP_PRICE_ID || DEFAULT_MEMBERSHIP_PRICE_ID

  if (!secret) {
    console.error('[membership-checkout] STRIPE_SECRET_KEY missing')
    return NextResponse.json({ error: 'Membership checkout is not configured.' }, { status: 500 })
  }
  if (!siteUrl) {
    console.error('[membership-checkout] NEXT_PUBLIC_SITE_URL missing')
    return NextResponse.json({ error: 'Site URL is not configured.' }, { status: 500 })
  }

  let emailRaw = ''
  let firstNameRaw = ''
  let lastNameRaw = ''
  try {
    const body = (await request.json()) as {
      email?: unknown
      firstName?: unknown
      lastName?: unknown
    }
    if (typeof body.email === 'string') emailRaw = body.email
    if (typeof body.firstName === 'string') firstNameRaw = body.firstName
    if (typeof body.lastName === 'string') lastNameRaw = body.lastName
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!isValidMembershipEmail(emailRaw)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }
  if (!isValidMembershipNamePart(firstNameRaw) || !isValidMembershipNamePart(lastNameRaw)) {
    return NextResponse.json({ error: 'First and last name are required.' }, { status: 400 })
  }

  const email = normalizeMembershipEmail(emailRaw)
  const fullName = formatMembershipFullName(firstNameRaw, lastNameRaw)
  const stripe = new Stripe(secret, { apiVersion: Stripe.API_VERSION })

  // Checkout cannot attach a SubscriptionSchedule. Option B + charge today is modeled like a
  // two-phase schedule: (1) one-time line collects full dues now; (2) recurring item stays in
  // trial until June 1 (year + 1), then bills yearly from that anchor.
  const trialEnd = optionBJuneFirstFollowingCalendarYearUnix()
  const nowSec = Math.floor(Date.now() / 1000)
  const minTrialEnd = nowSec + 48 * 60 * 60
  if (trialEnd < minTrialEnd) {
    console.error('[membership-checkout] Option B trial_end is within Stripe minimum window', {
      trialEnd,
      minTrialEnd,
    })
    return NextResponse.json(
      { error: 'Membership billing window is invalid. Please try again later.' },
      { status: 500 }
    )
  }

  try {
    const customerId = await getOrCreateStripeCustomer(stripe, email, fullName)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      customer_update: {
        name: 'auto',
        address: 'auto',
      },
      custom_text: {
        submit: {
          message: CHECKOUT_CUSTOM_SUBMIT_MESSAGE,
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            tax_behavior: 'exclusive',
            product_data: {
              name: 'Annual membership dues',
              description:
                'Membership for the current club year. Recurring subscription renews each June.',
            },
            unit_amount: MEMBERSHIP_SIGNUP_UNIT_AMOUNT_CENTS,
          },
          quantity: 1,
        },
        {
          price: membershipPriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_end: trialEnd,
        metadata: {
          billing_model: 'option_b_checkout_trial',
          first_renewal_unix: String(trialEnd),
        },
      },
      success_url: `${siteUrl}/membership-success`,
      cancel_url: `${siteUrl}/`,
    })

    if (!session.url) {
      console.error('[membership-checkout] Checkout session missing url', session.id)
      return NextResponse.json({ error: 'Failed to start checkout session.' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[membership-checkout] Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
