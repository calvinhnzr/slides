import { useEffect } from "react"
import { useAtom } from "jotai"
import classNames from "classnames"
import { styled } from "styled-components"
import "@/styles/Slide.css"
import {
  slidesAtom,
  currentArticleAtom,
  explosionViewAtom,
} from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Slideshow } from "@/components/styled/Slideshow"
import { Progress } from "@/components/styled/Progress"

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #202123;
  z-index: 100;
  &.explosion {
    transform: scale(0.15);
    overflow: visible;
    /* border: 1rem solid white; */
    /* padding-left: -10rem; */
    position: relative;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      outline: 2rem solid white;
      z-index: 10;
    }
  }
`

export function App() {
  const [slidesData] = useAtom(slidesAtom)
  const [currentArticle] = useAtom(currentArticleAtom)
  const [explosionView, setExplosionView] = useAtom(explosionViewAtom)

  const MAX_VALUE = slidesData[0].length - 1
  const [isFullscreen, toggleFullscreen] = useFullscreen()
  const { buttons, axes } = useGamepad(true)

  useKeyDown((event) => {
    switch (event.key) {
      case "f":
        toggleFullscreen()
        break
      case "F":
        toggleFullscreen()
        break
      case "e":
        setExplosionView(!explosionView)
        break
      case "E":
        setExplosionView(!explosionView)
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

    if (buttons[4] || buttons[5]) setExplosionView(!explosionView)
  }, [buttons, axes])

  const appClassNames = classNames({
    explosion: explosionView,
  })

  return (
    <Div id="app" className={appClassNames}>
      <Slideshow data={slidesData[0]} max={MAX_VALUE} />
      {!explosionView ? (
        <Progress max={MAX_VALUE} value={currentArticle} />
      ) : null}
    </Div>
  )
}

export default App
