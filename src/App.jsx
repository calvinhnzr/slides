import { useRef, useEffect } from "react"
import { useAtom } from "jotai"

import "./styles/reset.css"
import "./styles/index.css"
import "./styles/App.css"
import "./styles/Slide.css"

import { currentSlideAtom, MAX_VALUE, slidesAtom } from "@store/atoms"

import useGamepad from "@hooks/useGamepad"
import useKeyDown from "@hooks/useKeydown"
import useFullscreen from "@hooks/useFullScreen"

import { Main, Article, Grid } from "@components/styled/Slideshow"
import { Progress } from "@components/styled/Progess"

export function App() {
  const { buttons, axes } = useGamepad(true)
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  const [currentSlide, setCurrentSlide] = useAtom(currentSlideAtom)

  const [slidesData] = useAtom(slidesAtom)

  const updateXValue = (newX) => {
    if (newX >= 0 && newX <= MAX_VALUE) {
      setCurrentSlide((prev) => ({
        ...prev,
        x: newX,
      }))
    }
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
        updateXValue(currentSlide.x + 1)
        break
      case "ArrowLeft":
        updateXValue(currentSlide.x - 1)
        break

      case "ArrowDown":
        updateYValue(currentSlide.y[currentSlide.x] + 1)

        break
      case "ArrowUp":
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
    if (buttons[15] || buttons[1]) updateXValue(currentSlide.x + 1)
    if (buttons[14] || buttons[2]) updateXValue(currentSlide.x - 1)

    if (buttons[13] || buttons[0])
      updateYValue(currentSlide.y[currentSlide.x] + 1)
    if (buttons[12] || buttons[3])
      updateYValue(currentSlide.y[currentSlide.x] + 1)

    if (buttons[6] || buttons[7]) toggleFullscreen()
  }, [buttons, axes])

  return (
    <>
      <Progress max={MAX_VALUE} value={currentSlide.x} />
      <Main $currentSlideX={currentSlide.x}>
        {/* {slidesData.map((el, index) => (
          <Article
            key={index}
            className={el.layout || "normal"}
            saves index of x not from current slide, rather in mapping from mdx files
            $currentSlideY={currentSlide.y[currentSlide.x]}
          >
            render grid based on num of subfolders 
            <Grid layout={el.layout} className={el.slideClasses || "simple"}>
              <el.default />
            </Grid>
          </Article>
        ))} */}
      </Main>
    </>
  )
}

export default App
