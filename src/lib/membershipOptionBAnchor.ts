/**
 * Option B: first full renewal is always June 1 of (calendar year + 1), in the runtime timezone.
 */
export function optionBJuneFirstFollowingCalendarYear(now: Date = new Date()): Date {
  const y = now.getFullYear()
  return new Date(y + 1, 5, 1)
}

export function optionBJuneFirstFollowingCalendarYearUnix(now: Date = new Date()): number {
  return Math.floor(optionBJuneFirstFollowingCalendarYear(now).getTime() / 1000)
}
