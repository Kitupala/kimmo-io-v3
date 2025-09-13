import * as THREE from "three";
import { useRef, useState, useEffect, memo, ReactNode } from "react";
import {
  Canvas,
  createPortal,
  useFrame,
  useThree,
  ThreeElements,
} from "@react-three/fiber";
import {
  useFBO,
  useGLTF,
  Preload,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { easing } from "maath";

type ModeProps = Record<string, unknown>;

interface FluidGlassLensProps {
  lensProps?: ModeProps;
  children?: ReactNode;
}

export default function FluidGlassLens({
  lensProps = {},
  children,
}: FluidGlassLensProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, toneMapping: THREE.NoToneMapping }}
    >
      <Lens modeProps={lensProps}>{children}</Lens>
      <Preload />
    </Canvas>
  );
}

type MeshProps = ThreeElements["mesh"];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const geoWidthRef = useRef<number>(1);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp, gl } = useThree();

  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const [hovered, setHovered] = useState(false);
  const opacityRef = useRef(0);
  const scaleFactorRef = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [gl]);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    const targetOpacity = hovered ? 1 : 0;
    const targetScale = hovered
      ? ((modeProps as { scale?: number }).scale ?? 0.15)
      : 0.01;

    easing.damp(opacityRef, "current", targetOpacity, 0.3, delta);
    easing.damp(scaleFactorRef, "current", targetScale, 0.3, delta);

    ref.current.scale.setScalar(scaleFactorRef.current);

    if ("opacity" in ref.current.material) {
      ref.current.material.opacity = opacityRef.current;
      ref.current.material.transparent = true;
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  const { ior, thickness, anisotropy, chromaticAberration, ...extraMat } =
    modeProps as {
      ior?: number;
      thickness?: number;
      anisotropy?: number;
      chromaticAberration?: number;
      [key: string]: unknown;
    };

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          chromaticAberration={chromaticAberration ?? 0.1}
          anisotropy={anisotropy ?? 0.01}
          metalness={0.0}
          reflectivity={0.2}
          clearcoatRoughness={0.0}
          envMapIntensity={0.1}
          transparent
          opacity={opacityRef.current}
          {...(typeof extraMat === "object" && extraMat !== null
            ? extraMat
            : {})}
        />
      </mesh>
    </>
  );
});

function Lens({
  children,
  modeProps,
  ...p
}: { children?: ReactNode; modeProps?: ModeProps } & MeshProps) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    >
      {children}
    </ModeWrapper>
  );
}
