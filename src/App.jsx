import { useRef, useEffect } from "react"
import { useAtom } from "jotai"

import {
  currentHorizontalAtom,
  currentVerticalAtom,
  MAX_VALUE,
  slidesAtom,
} from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Slideshow, Article, Grid } from "@/components/Slideshow"

import Progress from "@/components/Progess"
import { Title } from "./components/Title"

export function App() {
  const { buttons, axes } = useGamepad(true)
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  const [currentHorizont, setCurrentHorizont] = useAtom(currentHorizontalAtom)
  const [currentVertical, setCurrentVertical] = useAtom(currentVerticalAtom)
  const [slidesData] = useAtom(slidesAtom)

  useKeyDown((event) => {
    console.log(event.key)
    switch (event.key) {
      case "ArrowRight":
        setCurrentHorizont(currentHorizont + 1)
        break
      case "ArrowLeft":
        setCurrentHorizont(currentHorizont - 1)
        break

      case "ArrowDown":
        setCurrentVertical(currentVertical + 1)
        break
      case "ArrowUp":
        setCurrentVertical(currentVertical - 1)
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
    if (buttons[15] || buttons[1]) setCurrentHorizont(currentHorizont + 1)
    if (buttons[14] || buttons[2]) setCurrentHorizont(currentHorizont - 1)

    if (buttons[13] || buttons[0]) setCurrentVertical(currentVertical + 1)
    if (buttons[12] || buttons[3]) setCurrentVertical(currentVertical - 1)

    if (buttons[6] || buttons[7]) toggleFullscreen()
  }, [buttons, axes])

  return (
    <>
      <Slideshow $currentHorizont={currentHorizont}>
        {slidesData.map((el, index) => (
          <Article key={index} className={el.layout || "normal"}>
            <Grid layout={el.layout} className={el.slideClasses || "simple"}>
              <el.default />
            </Grid>
          </Article>
        ))}
        <Article className="subslide" $currentVertical={currentVertical}>
          {[...Array(10)].map((el, index) => (
            <Grid key={index} className="simple">
              <Title>{index}</Title>
            </Grid>
          ))}
        </Article>
      </Slideshow>

      <Progress max={MAX_VALUE} value={currentHorizont} />
    </>
  )
}

export default App
