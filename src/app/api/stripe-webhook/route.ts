import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { syncCustomerProfileFromCheckoutSession } from '../../../lib/stripeMembershipCustomer'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secret || !webhookSecret) {
    console.error('[stripe-webhook] STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET missing')
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 500 })
  }

  const stripe = new Stripe(secret, { apiVersion: Stripe.API_VERSION })
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  const payload = await request.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    console.error('[stripe-webhook] Signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      if (session.mode === 'subscription') {
        await syncCustomerProfileFromCheckoutSession(stripe, session)
      }
    }
  } catch (error) {
    console.error('[stripe-webhook] Handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
