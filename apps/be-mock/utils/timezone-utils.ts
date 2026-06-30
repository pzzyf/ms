let mockTimeZone: null | string = null

export function setTimezone(timeZone: string) {
  mockTimeZone = timeZone
}

export function getTimezone() {
  return mockTimeZone
}
