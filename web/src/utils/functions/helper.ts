export const removeKeys = (obj: any, keys: string | string[]) => {
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key]
    }
  }
  return obj
}
