export default function buildVerseFromContent(content) {
  const verse = content.split('\n\n')
  return verse.map((v, index) => ({
      page: index,
      lines: v.replace(/(?:\r\n|\r|\n)/g, '<br />'),
  }))
}