//convert ISO date string to this format DD.MM.YYYY HH:mm with a leading zero if necessary
export const formatTimestamp = (timestamp: string, includeTime = true) => {
  const date = new Date(timestamp)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  if (includeTime) {
    return `${day}.${month}.${year} ${hours}:${minutes}`
  } else {
    return `${day}.${month}.${year}`
  }
}
