import { useState, useCallback } from "react"

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          )
        })
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false)
        })
        .catch((err) => {
          console.error(
            `Error attempting to exit fullscreen mode: ${err.message} (${err.name})`
          )
        })
    }
  }, [])

  return [isFullscreen, toggleFullscreen]
}

export default useFullscreen
