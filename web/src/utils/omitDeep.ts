//function that creates a deep copy of an object while omitting a specified key
export function omitDeep(obj: any, key: string) {
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
