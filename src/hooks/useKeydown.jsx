import { useEffect } from "react"

function useKeyDown(callback) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      callback(event)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [callback])
}

export default useKeyDown
