import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  CameraControls,
  Stage,
  useHelper,
  RoundedBox,
  PerspectiveCamera,
  Center,
  Stars,
} from "@react-three/drei"
import * as THREE from "three"
import styled from "styled-components"

export const Scene = () => {
  return (
    <>
      <CameraControls />

      <ambientLight intensity={1} />
      <Stars />
      <Center visible={false}>
        {[...Array(3)].map((_, i) => (
          <RoundedBox
            key={i}
            position={[i * 2, 0, 0]}
            args={[1, 1, 1]}
            radius={0.05}
            smoothness={4}
            bevelSegments={4}
            creaseAngle={0.4}
            // ref={(el) => (boxesRef.current[i] = el)}
          >
            <meshPhongMaterial color="#f3f3f3" />
          </RoundedBox>
        ))}
      </Center>
    </>
  )
}
