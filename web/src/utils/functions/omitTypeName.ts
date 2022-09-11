type obj = {
  [key: string]: any
}

export function omitTypeName<T extends obj>(obj: T): Omit<T, '__typename'> {
  if (!Object.hasOwn(obj, '__typename')) {
    return obj
  }
  const { __typename, ...rest } = obj
  return rest
}
