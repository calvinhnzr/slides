import React, { useRef, useEffect } from "react"

import {
  View,
  Box,
  Sphere,
  Torus,
  Stage,
  CameraControls,
  OrbitControls,
  Stars,
  useGLTF,
  Center,
  ContactShadows,
} from "@react-three/drei"
import { color } from "three/webgpu"

const Stones = () => {
  const rockModel = useGLTF("./model/rock.gltf")
  const menhirSmallModel = useGLTF("./model/menhir-small.gltf")
  const menhirMediumModel = useGLTF("./model/menhir-medium.gltf")
  const menhirLargeModel = useGLTF("./model/menhir-large.gltf")

  useEffect(() => {
    console.log(rockModel)
  }, [])

  return (
    <>
      {/* <CameraControls /> */}

      <group scale={0.3} position={[-3, 0, 0]}>
        <primitive
          object={rockModel.scene}
          position={[-10, 0, 0]}
          // rotation-y={0.3}
          castShadow
        />
        <primitive
          object={menhirSmallModel.scene}
          position={[0, 0, 0]}
          // rotation-y={0.3}
          castShadow
        />
        <primitive
          object={menhirMediumModel.scene}
          position={[10, 0, 0]}
          // rotation-y={0.3}
          castShadow
        />
        <primitive
          object={menhirLargeModel.scene}
          position={[20, 0, 0]}
          // rotation-y={0.3}
          castShadow
        />
      </group>
    </>
  )
}

export default Stones
