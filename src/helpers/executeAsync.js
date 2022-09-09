export default function executeAsync(func, onFailure) {
  setTimeout(() => {
    try {
      func()
    } catch (error) {
      onFailure(error)
    }
  })
}