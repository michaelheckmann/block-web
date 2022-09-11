/**
 * It takes an object and a key, and returns a new object with the key omitted from the original object
 * @param {object} obj - the object you want to omit a key from
 * @param {string} key - The key to omit from the object
 * @returns { object } - the new object with the key
 */
export function omitDeep(obj: object, key: string): object {
  let newObj = {}
  for (let prop in obj) {
    if (prop !== key) {
      if (obj[prop] instanceof Object) {
        newObj[prop] = omitDeep(obj[prop], key)
      } else {
        newObj[prop] = obj[prop]
      }
    }
  }
  console.log('newobj', newObj)
  return newObj
}
