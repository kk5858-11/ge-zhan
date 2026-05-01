"use client";

/**
 * 首屏抽象几何体：玻璃球 + 金属环 + 金属方块
 * 导航联动：sceneNudge 目标偏航角经阻尼叠加到 rotation.y
 */
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Group, MathUtils } from "three";
import { getSceneTargetYaw } from "@/lib/sceneNudge";

type Props = {
  reducedMotion: boolean;
};

export function AbstractHero({ reducedMotion }: Props) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();
  const autoYaw = useRef(0);
  const nudgeYaw = useRef(0);

  const rotSpeed = useMemo(() => (reducedMotion ? 0.15 : 0.35), [reducedMotion]);

  useFrame((state, delta) => {
    if (!group.current) return;
    autoYaw.current += delta * rotSpeed * 0.25;
    const target = getSceneTargetYaw();
    nudgeYaw.current = MathUtils.lerp(nudgeYaw.current, target, 1 - Math.exp(-delta * 2.4));
    group.current.rotation.y = autoYaw.current + nudgeYaw.current;
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * 0.25, 0.06);
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.2, 0.06);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <Float speed={reducedMotion ? 0.6 : 1.2} rotationIntensity={0.4} floatIntensity={0.35}>
      <group ref={group} scale={reducedMotion ? 0.92 : 1}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.05, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={reducedMotion ? 4 : 10}
            resolution={reducedMotion ? 256 : 512}
            transmission={1}
            roughness={0.15}
            thickness={0.6}
            ior={1.45}
            chromaticAberration={0.03}
            anisotropy={0.1}
            color="#c7c9ff"
          />
        </mesh>

        <mesh castShadow receiveShadow rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[1.55, 0.06, 16, 120]} />
          <meshStandardMaterial color="#6366f1" metalness={1} roughness={0.08} emissive="#312e81" emissiveIntensity={0.55} />
        </mesh>

        <mesh castShadow receiveShadow position={[0.1, -0.35, 0.35]} rotation={[0.5, 0.8, 0.2]}>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshStandardMaterial color="#a5b4fc" metalness={0.95} roughness={0.12} />
        </mesh>
      </group>
    </Float>
  );
}
