import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { MeshTransmissionMaterial, useGLTF, AccumulativeShadows, RandomizedLight, Environment, OrbitControls, Center, Text3D } from '@react-three/drei'
import { useControls } from 'leva'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [55, 20, 55], fov: 26 }}>
      <ambientLight intensity={Math.PI} />
      <group position={[0, -2.5, 0]}>
        <Center top>
          <GelatinousCube />
        </Center>
        <AccumulativeShadows temporal frames={100} alphaTest={0.9} color="#3ead5d" colorBlend={1} opacity={0.8} scale={40}>
          <RandomizedLight radius={10} ambient={0.5} intensity={Math.PI} position={[2.5, 8, -2.5]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={0.3} makeDefault />
      <Environment files="./dancing_hall_1k.hdr" background backgroundBlurriness={1} />
      {/* 添加3D文字 */}
      <Center position={[0, 5, 0]}>
        <Text3D
          font="/helvetiker_regular.typeface.json" // 指定字体文件
          size={2} // 字体大小
          height={0.2} // 厚度
          curveSegments={12} // 细分曲线段数
          bevelEnabled={true} // 启用倒角
          bevelThickness={0.1} // 倒角厚度
          bevelSize={0.02} // 倒角大小
        >
          Reject Ocean Show
          <meshPhysicalMaterial
            attach="material"
            color="#707c87"
            roughness={0.1}
            transmission={0.5}
            thickness={1.5}
            ior={3}
            specularIntensity={1}
            envMapIntensity={0.5}
            clearcoat={1}
            clearcoatRoughness={0.5}
          />
        </Text3D>
      </Center>
    </Canvas>
  )
}

export function GelatinousCube(props) {
  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.01, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.04, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.57, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.5, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#99ecff',
    bg: '#839681'
  })
  const { nodes, materials } = useGLTF('/frozenwhaleL.glb')
  console.log(nodes); // 检查 nodes 对象中的所有几何体
  console.log(materials); // 检查 materials 对象中的所有材质

  return (
    <group dispose={null}>
      <mesh geometry={nodes.cube1.geometry} position={[-0.56, -1.38, -0.11]}>
        {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2.geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.38, -0.11]}
      />
      <mesh geometry={nodes.cube1001.geometry} position={[-0.56, -1.34, -0.11]}>
        {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2001.geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.34, -0.11]}
      />
      <mesh geometry={nodes.cube1002.geometry} position={[-0.56, -1.38, -0.11]}>
        {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2002.geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.38, -0.11]}
      />
      <mesh geometry={nodes.cube1003.geometry} position={[-4.8, -1.38, -4.6]}>
        {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2003.geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-4.8, -1.38, -4.6]}
      />
      <mesh geometry={nodes.球体.geometry} position={[-11.10, 0.38, -9.45]}>
        {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
      </mesh>
      <mesh geometry={nodes.bubbles.geometry} material={materials.cube_bubbles_mat} position={[-0.56, -2.28, -0.11]} />
      <group position={[-1.0, -2, -1.5]}>
        <mesh geometry={nodes.arrows.geometry} material={materials.weapons_mat} />
      </group>
      <mesh geometry={nodes.bluewhale_1.geometry} material={materials.bluewhale} position={[0.0, -1.5, -0.50]} rotation={[0, 1.2 * Math.PI, 0]} />
      <mesh geometry={nodes.efish.geometry} material={materials.efish} position={[-0.4, -2.18, 0.10]}/>
      <mesh geometry={nodes.shark.geometry} material={materials.shark} position={[-0, -1.5, 0.5]} rotation={[0, 2.5 * Math.PI, 0]}/>
      <mesh geometry={nodes.turtle.geometry} material={materials.turtle} position={[-0.5, -1.68, 0.40]} rotation={[0, 2.1 * Math.PI, 0]} />
    </group>
  )
}
