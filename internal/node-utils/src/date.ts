import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

/* eslint-disable unicorn/no-top-level-side-effects -- dayjs plugins must be registered once for the shared date utility. */
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Shanghai')
/* eslint-enable unicorn/no-top-level-side-effects */

const dateUtility = dayjs

export { dateUtility as dateUtil }
