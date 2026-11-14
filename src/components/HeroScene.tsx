import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useFinePointer'

interface PearlProps {
  color: string
  roughness?: number
}

/** Material mutiara: clearcoat + sedikit iridescence, tetap ringan. */
function Pearl({ color, roughness = 0.15 }: PearlProps) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={0.15}
      clearcoat={1}
      clearcoatRoughness={0.08}
      iridescence={0.55}
      iridescenceIOR={1.3}
      iridescenceThicknessRange={[120, 420]}
    />
  )
}

interface FloatProps {
  position: [number, number, number]
  speed: number
  phase: number
  scale?: number
  children: React.ReactNode
  reduce: boolean
}

/** Mengapung pelan sambil berputar. */
function Floaty({ position, speed, phase, scale = 1, children, reduce }: FloatProps) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const m = ref.current
    if (!m || reduce) return
    const t = clock.getElapsedTime()
    m.position.y = position[1] + Math.sin(t * speed + phase) * 0.25
    m.rotation.x += 0.003 * speed
    m.rotation.y += 0.005 * speed
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {children}
    </mesh>
  )
}

function heartGeometry() {
  const s = new THREE.Shape()
  s.moveTo(0, 0.5)
  s.bezierCurveTo(0, 0.8, -0.5, 1, -0.75, 0.75)
  s.bezierCurveTo(-1.1, 0.4, -0.8, 0, 0, -0.6)
  s.bezierCurveTo(0.8, 0, 1.1, 0.4, 0.75, 0.75)
  s.bezierCurveTo(0.5, 1, 0, 0.8, 0, 0.5)
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.25, bevelEnabled: true, bevelSegments: 8, bevelSize: 0.18, bevelThickness: 0.2, curveSegments: 32 })
  g.center()
  return g
}

function Objects({ mobile, reduce }: { mobile: boolean; reduce: boolean }) {
  const group = useRef<THREE.Group>(null)
  const heart = useMemo(heartGeometry, [])
  const { gl, camera, size } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const tilt = useRef({ x: 0, y: 0 })
  const spin = useRef(0)

  // parallax kursor + drag untuk memutar
  useEffect(() => {
    const el = gl.domElement
    let drag = false
    let lx = 0
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / innerWidth - 0.5
      pointer.current.y = e.clientY / innerHeight - 0.5
      if (drag) {
        spin.current += (e.clientX - lx) * 0.005
        lx = e.clientX
      }
    }
    const down = (e: PointerEvent) => {
      drag = true
      lx = e.clientX
    }
    const up = () => (drag = false)
    el.style.cursor = 'grab'
    addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    addEventListener('pointercancel', up)
    return () => {
      removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      removeEventListener('pointercancel', up)
    }
  }, [gl])

  const wide = size.width >= 900
  useFrame(() => {
    const g = group.current
    if (!g) return
    tilt.current.x += (pointer.current.x - tilt.current.x) * 0.05
    tilt.current.y += (pointer.current.y - tilt.current.y) * 0.05
    g.rotation.y = tilt.current.x * 0.6 + spin.current
    g.rotation.x = tilt.current.y * 0.35
    spin.current *= 0.97
    camera.position.y = -window.scrollY * 0.004
  })

  return (
    <group ref={group} position={wide ? [1.2, 0, 0] : [-0.6, -2.3, 0]} scale={wide ? 1 : 0.6}>
      <Floaty position={[2.6, 0.4, 0]} speed={0.6} phase={0.5} reduce={reduce}>
        <torusKnotGeometry args={[1.5, 0.5, mobile ? 120 : 220, mobile ? 20 : 32, 2, 3]} />
        <Pearl color="#ffc3d6" roughness={0.12} />
      </Floaty>
      <Floaty position={[-0.4, -2.4, 1]} speed={0.8} phase={2} reduce={reduce}>
        <sphereGeometry args={[1.15, mobile ? 40 : 64, mobile ? 40 : 64]} />
        <Pearl color="#cbb8ff" roughness={0.08} />
      </Floaty>
      <Floaty position={[-2.4, 1.4, -0.5]} speed={0.9} phase={4} scale={0.8} reduce={reduce}>
        <primitive object={heart} attach="geometry" />
        <Pearl color="#f28aad" roughness={0.1} />
      </Floaty>
      <Floaty position={[0.6, 2.9, -1]} speed={1.2} phase={1} reduce={reduce}>
        <icosahedronGeometry args={[0.6, 0]} />
        <Pearl color="#ffffff" roughness={0.05} />
      </Floaty>
      {!mobile && (
        <>
          <Floaty position={[5.4, -2.6, -1]} speed={1} phase={3} reduce={reduce}>
            <torusGeometry args={[0.9, 0.32, 40, 90]} />
            <Pearl color="#ffd2bf" roughness={0.15} />
          </Floaty>
          <Floaty position={[5.6, 2.6, 0]} speed={1.4} phase={5} reduce={reduce}>
            <sphereGeometry args={[0.4, 48, 48]} />
            <Pearl color="#ff9fbe" roughness={0.1} />
          </Floaty>
        </>
      )}
      <Sparkles count={mobile ? 35 : 90} scale={[20, 12, 8]} size={mobile ? 3 : 4} speed={reduce ? 0 : 0.3} opacity={0.9} color="#ff9fc0" />
    </group>
  )
}

/** Lingkungan pastel prosedural (tanpa unduhan HDR) untuk pantulan mutiara. */
function PastelEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#ffd0e0']} />
      <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 6, 4]} scale={[14, 4, 1]} />
      <Lightformer form="rect" intensity={1.4} color="#ffb3cd" position={[-7, 0, 3]} rotation-y={Math.PI / 2} scale={[10, 6, 1]} />
      <Lightformer form="rect" intensity={1.4} color="#c9b5ff" position={[7, -1, 3]} rotation-y={-Math.PI / 2} scale={[10, 6, 1]} />
      <Lightformer form="circle" intensity={1.2} color="#ffd9c4" position={[0, -6, 2]} rotation-x={Math.PI / 2} scale={8} />
    </Environment>
  )
}

export default function HeroScene() {
  const mobile = useIsMobile()
  const reduce = usePrefersReducedMotion()
  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 14], fov: 35, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
      frameloop={reduce ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <PastelEnv />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.2} />
      <pointLight position={[-6, -2, 4]} intensity={90} distance={30} color="#ff8fb8" />
      <pointLight position={[6, -4, 2]} intensity={80} distance={30} color="#a98bff" />
      <Objects mobile={mobile} reduce={reduce} />
    </Canvas>
  )
}
