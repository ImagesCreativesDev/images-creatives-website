import Stripe from 'stripe'

type StripeClient = InstanceType<typeof Stripe>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Minimal Checkout Session fields used for customer profile sync (webhook + API). */
export type CheckoutSessionCustomerSource = {
  customer?: string | { id: string } | null
  customer_details?: { email?: string | null; name?: string | null } | null
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

export function normalizeMembershipNamePart(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

export function formatMembershipFullName(firstName: string, lastName: string): string {
  return `${normalizeMembershipNamePart(firstName)} ${normalizeMembershipNamePart(lastName)}`.trim()
}

export function isValidMembershipNamePart(value: string): boolean {
  const part = normalizeMembershipNamePart(value)
  return part.length >= 1 && part.length <= 100
}

export function isValidMembershipFullName(value: string): boolean {
  const name = value.trim()
  return name.length >= 2 && name.length <= 200
}

/** Find or create a Stripe Customer with email and full name for exports and portal. */
export async function getOrCreateStripeCustomer(
  stripe: StripeClient,
  email: string,
  name: string
): Promise<string> {
  const normalizedEmail = normalizeMembershipEmail(email)
  const normalizedName = name.trim().replace(/\s+/g, ' ')

  const existing = await stripe.customers.list({ email: normalizedEmail, limit: 1 })
  const match = existing.data[0]

  if (match) {
    const updates: { email?: string; name?: string } = {}
    if (match.email !== normalizedEmail) {
      updates.email = normalizedEmail
    }
    if (!match.name || match.name !== normalizedName) {
      updates.name = normalizedName
    }
    if (Object.keys(updates).length > 0) {
      await stripe.customers.update(match.id, updates)
    }
    return match.id
  }

  const customer = await stripe.customers.create({
    email: normalizedEmail,
    name: normalizedName,
  })
  return customer.id
}

/** Copy checkout email and name onto the Customer when Stripe leaves fields empty. */
export async function syncCustomerProfileFromCheckoutSession(
  stripe: StripeClient,
  session: CheckoutSessionCustomerSource
): Promise<void> {
  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id

  if (!customerId) return

  const email =
    session.customer_details?.email ?? session.customer_email ?? undefined
  const name = session.customer_details?.name ?? undefined

  const updates: { email?: string; name?: string } = {}

  if (email) {
    const normalizedEmail = normalizeMembershipEmail(email)
    if (isValidMembershipEmail(normalizedEmail)) {
      updates.email = normalizedEmail
    }
  }

  if (name) {
    const normalizedName = name.trim().replace(/\s+/g, ' ')
    if (isValidMembershipFullName(normalizedName)) {
      updates.name = normalizedName
    }
  }

  if (Object.keys(updates).length === 0) return

  const customer = await stripe.customers.retrieve(customerId)
  if (customer.deleted) return

  const patch: { email?: string; name?: string } = {}
  if (updates.email && customer.email !== updates.email) {
    patch.email = updates.email
  }
  if (updates.name && customer.name !== updates.name) {
    patch.name = updates.name
  }

  if (Object.keys(patch).length > 0) {
    await stripe.customers.update(customerId, patch)
  }
}

/** @deprecated Use syncCustomerProfileFromCheckoutSession */
export const syncCustomerEmailFromCheckoutSession = syncCustomerProfileFromCheckoutSession
