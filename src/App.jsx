import { useRef, useEffect } from "react"
import { useAtom } from "jotai"

import { currentSlideAtom, MAX_VALUE, slidesAtom } from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Main, Article, Grid } from "@/components/Slideshow"

import Progress from "@/components/Progess"
import { Title } from "./components/Title"

export function App() {
  const { buttons, axes } = useGamepad(true)
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  const [currentSlide, setCurrentSlide] = useAtom(currentSlideAtom)

  const [slidesData] = useAtom(slidesAtom)

  const updateXValue = (newX) => {
    setCurrentSlide((prev) => ({
      ...prev,
      x: newX,
    }))
  }

  const updateYValue = (newY) => {
    setCurrentSlide((prev) => {
      const newYArray = [...prev.y]
      if (prev.x >= 0 && prev.x < newYArray.length) {
        // Check if the current slide has a state of 'subslide'
        if (slidesData[prev.x].layout === "subslide") {
          newYArray[prev.x] = newY < 0 ? 0 : newY // Ensure y value is never negative
        }
      }
      return {
        ...prev,
        y: newYArray,
      }
    })
  }
  useKeyDown((event) => {
    console.log("X: " + currentSlide.x)
    console.log("Y: " + currentSlide.y)
    switch (event.key) {
      case "ArrowRight":
        // setCurrentHorizont(currentHorizont + 1)
        updateXValue(currentSlide.x + 1)
        break
      case "ArrowLeft":
        // setCurrentHorizont(currentHorizont - 1)
        updateXValue(currentSlide.x - 1)
        break

      case "ArrowDown":
        // setCurrentVertical(currentVertical + 1)
        updateYValue(currentSlide.y[currentSlide.x] + 1)

        break
      case "ArrowUp":
        // setCurrentVertical(currentVertical - 1)
        updateYValue(currentSlide.y[currentSlide.x] - 1)
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
      <Main $currentSlideX={currentSlide.x}>
        {/* Sliding Down Testing */}
        {/* <Article className="subslide" $currentSlideY={currentSlide.y[0]}>
          {[...Array(10)].map((el, index) => (
            <Grid key={index} className="simple">
              <Title>{index}</Title>
            </Grid>
          ))}
        </Article> */}
        {/*  */}
        {slidesData.map((el, index) => (
          <Article key={index} className={el.layout || "normal"}>
            <Grid layout={el.layout} className={el.slideClasses || "simple"}>
              <el.default />
            </Grid>
          </Article>
        ))}
      </Main>

      <Progress max={MAX_VALUE} value={currentSlide.x} />
    </>
  )
}

export default App
