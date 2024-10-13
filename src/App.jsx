import { useRef, useEffect } from "react"
import { useAtom } from "jotai"

import { countAtom, MAX_VALUE, slidesAtom } from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import Slideshow from "@/components/Slideshow"
import Page from "@/components/Page"
import Progress from "@/components/Progess"

export function App() {
  const { buttons, axes } = useGamepad(true)
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  const [count, setCount] = useAtom(countAtom)
  const [slides] = useAtom(slidesAtom)

  useKeyDown((event) => {
    switch (event.key) {
      case "ArrowRight":
        setCount((count) => count + 1)
        break
      case "ArrowLeft":
        setCount((count) => count - 1)
        break
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
    if (buttons[15] || buttons[1]) setCount((count) => count + 1)
    if (buttons[14] || buttons[2]) setCount((count) => count - 1)
    if (buttons[6] || buttons[7]) toggleFullscreen()
  }, [buttons, axes])

  return (
    <>
      <Slideshow current={count}>
        {slides.map((SlideComponent, index) => (
          <Page key={index}>
            <SlideComponent.default />
          </Page>
        ))}
      </Slideshow>
      <Progress max={MAX_VALUE} value={count} />
    </>
  )
}

export default App
