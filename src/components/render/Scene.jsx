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
  Plane,
  Grid,
  ContactShadows,
  Environment,
  Html,
} from "@react-three/drei"
import * as THREE from "three"
import styled from "styled-components"
import Tree from "./Tree"

export const Scene = (props) => {
  return (
    <>
      <Stage adjustCamera={false}>{props.children}</Stage>

      {/* <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
        castShadow
      />
      <pointLight
        position={[-10, -10, -10]}
        decay={0}
        intensity={Math.PI}
        castShadow
      /> */}
      {/* <Plane
        rotation-x={-Math.PI * 0.5}
        scale={20}
        receiveShadow
        position={[0, -0.01, 0]}
      /> */}

      {/* <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={30}
      /> */}

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
