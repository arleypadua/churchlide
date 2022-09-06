const generateStyle = (color1, color2, color3) => ({
  background: `linear-gradient(90deg, ${color1} 0%, ${color2} 29%, ${color3} 100%)`
})

export default function togglePresentationTheme(color1, color2, color3) {
  document.body.classList.add('hide_overflow')
  document.body.classList.add('presentation_theme')

  const style = generateStyle(color1, color2, color3)
  document.body.style.background = style.background
}