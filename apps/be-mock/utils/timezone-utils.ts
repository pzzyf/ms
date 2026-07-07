const timeZoneState: { mockTimeZone: null | string } = {
  mockTimeZone: null,
}

export function setTimezone(timeZone: string) {
  timeZoneState.mockTimeZone = timeZone
}

export function getTimezone() {
  return timeZoneState.mockTimeZone
}
