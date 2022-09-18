/**
 * It takes two dates, checks if they are valid dates, if not, it casts them to dates, then it
 * calculates the difference between the two dates and returns a human readable string.
 * @param date1 - The first date to compare.
 * @param date2 - The date to compare to.
 * @returns The difference between two dates in years, months, days, hours, minutes, or seconds.
 */
export function timeSince(date1, date2) {
  // check if the arguments are valid dates, else cast to dates
  date1 = date1 instanceof Date ? date1 : new Date(date1)
  date2 = date2 instanceof Date ? date2 : new Date(date2)

  let seconds = Math.floor((date2 - date1) / 1000)

  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + ' years'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + ' months'
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + ' days'
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + ' hours'
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}
