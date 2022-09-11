export function omitStoryBookArgs(keys: string | string[]) {
  const out = {}

  if (typeof keys === 'string') {
    keys = [keys]
  }

  keys.forEach((key) => {
    out[key] = {
      table: {
        disable: true,
      },
    }
  })

  return out
}
