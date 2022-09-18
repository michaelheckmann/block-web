/**
 * "If the object is an array, map over it and call the function on each item. If the object is an
 * object, reduce over it and call the function on each value. If the object is neither an array nor an
 * object, return the object."
 *
 * The function is recursive, so it will call itself on each item in an array or object
 * @param {T} obj - The object to replace the id with a unique id.
 */
export function replaceIdWithUniqueId<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceIdWithUniqueId(item)) as unknown as T
  } else if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (key === 'id') {
        return { ...acc, [key]: Math.floor(Math.random() * 1000) }
      } else {
        return { ...acc, [key]: replaceIdWithUniqueId(value) }
      }
    }, {}) as T
  } else {
    return obj
  }
}
