export const LINE_BREAK_REGEX = /(?:\r\n|\r|\n)/g

export default function buildVerseFromContent(content) {
  const verse = content.split('\n\n')
  return verse.map((v, index) => ({
      page: index,
      lines: v.replace(LINE_BREAK_REGEX, '<br />'),
  }))
}