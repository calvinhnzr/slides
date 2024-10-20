import { MeshWobbleMaterial, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import store from './store';


const Custom:  = ({ position }) => {
  const refMesh =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>();
  const onClick = () => {
    if (refMesh.current) {
      store.targetObj = refMesh.current;
    }
  };
  return (
    <mesh
      ref={refMesh as unknown as null}
      position={position}
      onClick={onClick}
    >
      <Sphere args={[1, 1, 32, 32]}>
        <MeshWobbleMaterial />
      </Sphere>
    </mesh>
  );
};
export default Custom;