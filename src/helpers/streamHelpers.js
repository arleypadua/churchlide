export function toJsonFile(content) {
  return new Blob([JSON.stringify(content)], { type: 'application/json' })
}

export async function parseJsonStreamToObject(stream) {
  let result = ''
  const decoder = new TextDecoder()
  const reader = stream.getReader()

  do {
    var { value } = await reader.read()
    if (value) {
      result = result.concat(decoder.decode(value))
    }
  } while (value)

  return JSON.parse(result)
}