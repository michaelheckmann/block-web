/**
 * It takes an object and returns a new object with the same keys and values.
 * @param obj - The object to be copied.
 */
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
