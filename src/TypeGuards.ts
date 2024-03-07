export const TypeGuards = {
  isRecord (data: unknown): data is Record<string, unknown> {
    return isObject(data) && data !== null && !Array.isArray(data)
  },
}

function isObject (data: unknown): data is object {
  return typeof data === 'object'
}
