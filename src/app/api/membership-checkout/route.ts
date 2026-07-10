import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import {
  formatMembershipFullName,
  getOrCreateStripeCustomer,
  isValidMembershipEmail,
  isValidMembershipNamePart,
  normalizeMembershipEmail,
} from '../../../lib/stripeMembershipCustomer'

export const runtime = 'nodejs'

/** Annual membership Price (recurring); renews each June 1 with prorated first period. */
const DEFAULT_MEMBERSHIP_PRICE_ID = 'price_1TXCE5AHcbvyQGr2d5sq9FlR'

/** Shown alongside the pay button on Stripe Checkout (hosted page). */
const CHECKOUT_CUSTOM_SUBMIT_MESSAGE =
  'You will be charged a prorated amount for the remainder of this club year today. Your membership automatically renews for the full $100 each June 1st.'

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
          price: membershipPriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        billing_cycle_anchor_config: {
          month: 6,
          day_of_month: 1,
        },
        proration_behavior: 'create_prorations',
        metadata: {
          billing_model: 'billing_cycle_anchor_june_1',
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
