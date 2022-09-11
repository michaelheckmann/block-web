/**
 * If the objects are the same object, or if they have the same keys and values, then they are
 * shallowly equal.
 * @param {object} obj1 - The first object to compare.
 * @param {object} obj2 - The object to compare against.
 */
export function shallowEqual(obj1: object, obj2: object) {
  if (obj1 === obj2) return true
  if (obj1 == null || obj2 == null) return false
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) return false
  }
  return true
}
