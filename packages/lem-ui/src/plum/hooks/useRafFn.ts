let isActive = false

export function useRafFn(fn: any, options: Record<string, any>) {
  const { immediate = true } = options
  function loop() {
    if (!isActive) {
      return
    }
    fn()
    if (window) {
      window.requestAnimationFrame(loop)
    }
  }

  function resume() {
    if (!isActive) {
      isActive = true
      loop()
    }
  }

  function pause() {
    isActive = false
  }

  if (immediate) {
    resume()
  }

  return {
    isActive,
    pause,
    resume,
  }
}
