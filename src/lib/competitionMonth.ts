const COMPETITION_MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/

export function isValidCompetitionMonth(value: string): boolean {
  return COMPETITION_MONTH_PATTERN.test(value)
}

export function defaultCompetitionMonth(now = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return formatCompetitionMonth(d)
}

export function formatCompetitionMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function normalizeCompetitionMonth(value?: string | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return isValidCompetitionMonth(trimmed) ? trimmed : null
}

export function competitionMonthFromUploadDate(uploadDate: string): string {
  const datePart = uploadDate.split('T')[0]?.split(' ')[0] ?? uploadDate
  return datePart.slice(0, 7)
}

export function getEffectiveCompetitionMonth(entry: {
  competitionMonth?: string | null
  uploadDate?: string | null
}): string | null {
  const normalized = normalizeCompetitionMonth(entry.competitionMonth)
  if (normalized) return normalized
  if (entry.uploadDate) return competitionMonthFromUploadDate(entry.uploadDate)
  return null
}

export function isPendingCompetitionEntry(score?: number | null): boolean {
  return score === undefined || score === null
}

export function formatCompetitionMonthLabel(value: string): string {
  if (!isValidCompetitionMonth(value)) return value
  const [year, month] = value.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function getCompetitionMonthOptions(count = 14, now = new Date()): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = []
  for (let offset = -1; offset < count; offset += 1) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1)
    const value = formatCompetitionMonth(d)
    options.push({ value, label: formatCompetitionMonthLabel(value) })
  }
  return options
}

export function resolveCompetitionMonth(
  monthParam: string | null | undefined,
  fallback = defaultCompetitionMonth()
): string {
  if (monthParam && isValidCompetitionMonth(monthParam)) {
    return monthParam
  }
  return fallback
}
