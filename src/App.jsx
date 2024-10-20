import { useEffect } from "react"
import { useAtom } from "jotai"
import { Canvas } from "@react-three/fiber"
import { View, Stars } from "@react-three/drei"
import { Perf } from "r3f-perf"

import { slidesAtom, explosionViewAtom } from "@/store/atoms"

import useGamepad from "@/hooks/useGamepad"
import useKeyDown from "@/hooks/useKeydown"
import useFullscreen from "@/hooks/useFullScreen"

import { Slideshow } from "./components/slideshow/index"

export function App() {
  const [slidesData] = useAtom(slidesAtom)
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

  return (
    <>
      <Canvas
        className="canvas canvas-view"
        eventSource={document.getElementById("root")}
      >
        {explosionView ? <Perf position={"top-left"} /> : null}
        <View.Port />
      </Canvas>

      <div id="app">
        <Slideshow data={slidesData} max={MAX_VALUE} />
      </div>

      <Canvas className="canvas canvas-background">
        <Stars
          radius={120}
          depth={10}
          count={5000}
          factor={12}
          saturation={20}
          fade
          speed={1}
        />
      </Canvas>
    </>
  )
}

export default App
