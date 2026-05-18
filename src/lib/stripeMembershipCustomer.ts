import Stripe from 'stripe'

type StripeClient = InstanceType<typeof Stripe>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Minimal Checkout Session fields used for email sync (webhook + API). */
export type CheckoutSessionEmailSource = {
  customer?: string | { id: string } | null
  customer_details?: { email?: string | null } | null
  customer_email?: string | null
  mode?: string | null
}

export function normalizeMembershipEmail(value: string): string {
  return value.trim().toLowerCase()
}

export function isValidMembershipEmail(value: string): boolean {
  const normalized = normalizeMembershipEmail(value)
  return normalized.length > 0 && normalized.length <= 320 && EMAIL_PATTERN.test(normalized)
}

/** Find or create a Stripe Customer with a persisted email for exports and portal. */
export async function getOrCreateStripeCustomer(
  stripe: StripeClient,
  email: string
): Promise<string> {
  const normalized = normalizeMembershipEmail(email)
  const existing = await stripe.customers.list({ email: normalized, limit: 1 })
  const match = existing.data[0]

  if (match) {
    if (match.email !== normalized) {
      await stripe.customers.update(match.id, { email: normalized })
    }
    return match.id
  }

  const customer = await stripe.customers.create({ email: normalized })
  return customer.id
}

/** Copy checkout email onto the Customer when Stripe leaves customer.email empty. */
export async function syncCustomerEmailFromCheckoutSession(
  stripe: StripeClient,
  session: CheckoutSessionEmailSource
): Promise<void> {
  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id
  const email =
    session.customer_details?.email ?? session.customer_email ?? undefined

  if (!customerId || !email) return

  const normalized = normalizeMembershipEmail(email)
  if (!isValidMembershipEmail(normalized)) return

  const customer = await stripe.customers.retrieve(customerId)
  if (customer.deleted) return

  if (customer.email !== normalized) {
    await stripe.customers.update(customerId, { email: normalized })
  }
}
