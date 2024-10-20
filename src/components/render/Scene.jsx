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
  Cloud,
  Clouds,
} from "@react-three/drei"
import * as THREE from "three"
import styled from "styled-components"
import Tree from "./Tree"

export const Scene = (props) => {
  return (
    <>
      {props.children}
      {/* <Clouds material={THREE.MeshBasicMaterial} scale={0.3}>
        <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="white" />
        <Cloud seed={1} scale={2} volume={5} color="gray" fade={100} />
      </Clouds> */}

      {/* <axesHelper args={[50]} position={[0, 0, 0]} /> */}
      {/* <Stars /> */}
      {/* <Center visible={false}>
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
      </Center> */}
    </>
  )
}
