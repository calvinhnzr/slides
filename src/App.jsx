import { useEffect, useRef } from "react"
import { useAtom } from "jotai"
import classNames from "classnames"
import { styled } from "styled-components"
import { Canvas } from "@react-three/fiber"
import { Box, View, CameraControls } from "@react-three/drei"

import {
  slidesAtom,
  currentArticleAtom,
  explosionViewAtom,
} from "@/store/atoms"

import { COLOR_BACKGROUND, COLOR_BACKGROUND_EXPLOSION } from "@/store/base"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Slideshow } from "@/components/styled/Slideshow"
import { Progress } from "@/components/styled/Progress"

import { Scene } from "@/components/render/Scene"

export function App() {
  const [slidesData] = useAtom(slidesAtom)
  const [currentArticle] = useAtom(currentArticleAtom)
  const [explosionView, setExplosionView] = useAtom(explosionViewAtom)

  const MAX_VALUE = slidesData[0].length - 1
  const [isFullscreen, toggleFullscreen] = useFullscreen()
  const { buttons, axes } = useGamepad(true)

  const appRef = useRef()

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

  return (
    // <div id="app" ref={appRef}>
    <>
      <Slideshow data={slidesData[0]} max={MAX_VALUE} />
      {!explosionView ? (
        <Progress max={MAX_VALUE} value={currentArticle} />
      ) : null}
      <Canvas id="canvas" eventSource={document.getElementById("root")}>
        <View.Port />
      </Canvas>
    </>
    // </div>
  )
}

export default App
