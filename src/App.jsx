import { useEffect } from "react"
import { useAtom } from "jotai"

import "@/styles/Slide.css"
import { slidesAtom } from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Slideshow } from "@/components/styled/Slideshow"
import { Progress } from "@/components/styled/Progress"

export function App() {
  const [slidesData] = useAtom(slidesAtom)
  const MAX_VALUE = slidesData[0].length - 1
  const [isFullscreen, toggleFullscreen] = useFullscreen()
  const { buttons, axes } = useGamepad(true)
  useKeyDown((event) => {
    console.log(event)
    switch (event.key) {
      case "f":
        toggleFullscreen()
        break
      case "F":
        toggleFullscreen()
        break
    }
  })
  // Gamepad API
  useEffect(() => {
    if (buttons[15] || buttons[1])
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))

    if (buttons[14] || buttons[2])
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }))

    if (buttons[13] || buttons[0])
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))

    if (buttons[12] || buttons[3])
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))

    if (buttons[6] || buttons[7]) toggleFullscreen()
  }, [buttons, axes])

  return (
    <>
      <Slideshow data={slidesData[0]} max={MAX_VALUE} />
      <Progress max={MAX_VALUE} value={0} />
    </>
  )
}

export default App
