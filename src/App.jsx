import { useRef, useEffect } from "react"
import { useAtom } from "jotai"

import { currentSlideAtom, slidesAtom } from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Main, Article, Section } from "@/components/styled/Slideshow"
import { Progress } from "@/components/styled/Progess"

export function App() {
  const { buttons, axes } = useGamepad(true)
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  const [currentSlide, setCurrentSlide] = useAtom(currentSlideAtom)

  const [slidesData] = useAtom(slidesAtom)

  const MAX_VALUE = slidesData.length

  useEffect(() => {
    setCurrentSlide((prev) => ({
      ...prev,
      y: new Array(slidesData[0].length).fill(0),
    }))
  }, [])

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
        newYArray[prev.x] = newY < 0 ? 0 : newY // Ensure y value is never negative
      }
      return {
        ...prev,
        y: newYArray,
      }
    })
  }
  useKeyDown((event) => {
    console.log(currentSlide)
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
      <Main $currentSlideX={currentSlide.x}>
        {slidesData &&
          slidesData[0].map((article, index) => {
            return (
              <Article
                key={index}
                className={"normal"}
                $currentSlideY={currentSlide.y[currentSlide.x]}
              >
                {article.map((section, index) => {
                  const el = section[0]
                  return (
                    <Section
                      key={index}
                      className={section[0].slideClasses || "simple"}
                    >
                      {<el.default />}
                    </Section>
                  )
                })}
              </Article>
            )
          })}
      </Main>
      <Progress max={MAX_VALUE} value={currentSlide.x} />
    </>
  )
}

export default App
