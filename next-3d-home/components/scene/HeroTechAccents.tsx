"use client";

/**
 * 首屏科技感装饰：无限网格、星尘粒子、轨道线框体、发光环
 * 与 AbstractHero 同场景，受 Bloom 影响更明显
 */
import { useFrame } from "@react-three/fiber";
import { Grid, Sparkles } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import type { Theme } from "@/components/providers/SiteUiProvider";

type Props = {
  reducedMotion: boolean;
  theme: Theme;
};

function WireOrbiter({
  radius,
  speed,
  phase,
  y,
  children,
}: {
  radius: number;
  speed: number;
  phase: number;
  y: number;
  children: ReactNode;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((st) => {
    if (!g.current) return;
    const t = st.clock.elapsedTime * speed + phase;
    g.current.position.set(Math.cos(t) * radius, y, Math.sin(t) * radius);
    g.current.rotation.y += st.clock.getDelta() * (speed * 0.35);
    g.current.rotation.x += st.clock.getDelta() * 0.12;
  });
  return <group ref={g}>{children}</group>;
}

export function HeroTechAccents({ reducedMotion, theme }: Props) {
  const knot = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  const gridColors = useMemo(
    () =>
      theme === "light"
        ? { cell: "#94a3b8" as const, section: "#6366f1" as const }
        : { cell: "#334155" as const, section: "#818cf8" as const },
    [theme]
  );

  const sparkCount = reducedMotion ? 48 : 140;
  const sparkColor = theme === "light" ? "#6366f1" : "#a5b4fc";

  useFrame((st, delta) => {
    if (reducedMotion) return;
    if (knot.current) {
      knot.current.rotation.x += delta * 0.45;
      knot.current.rotation.y += delta * 0.62;
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <Grid
        args={[24, 24]}
        position={[0, -2.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        side={THREE.DoubleSide}
        infiniteGrid
        followCamera
        fadeDistance={18}
        fadeStrength={1.15}
        fadeFrom={0}
        cellSize={0.42}
        sectionSize={3.6}
        cellThickness={0.85}
        sectionThickness={1.35}
        cellColor={gridColors.cell}
        sectionColor={gridColors.section}
      />

      <Sparkles
        count={sparkCount}
        scale={[14, 6, 10]}
        position={[0, 0.6, 0]}
        size={reducedMotion ? 2.2 : 3.2}
        speed={reducedMotion ? 0.25 : 0.55}
        opacity={theme === "light" ? 0.55 : 0.75}
        color={sparkColor}
      />

      {/* 高 Bloom 线框扭结 */}
      <mesh ref={knot} position={[2.15, 0.15, -0.85]} castShadow={false}>
        <torusKnotGeometry args={[0.42, 0.11, 96, 14]} />
        <meshStandardMaterial
          color="#c4c9ff"
          emissive="#6366f1"
          emissiveIntensity={2.2}
          metalness={0.9}
          roughness={0.15}
          wireframe={!reducedMotion}
        />
      </mesh>

      {/* 薄发光环 — 慢转 */}
      <mesh ref={ring} position={[-1.9, 0.35, -0.6]} rotation={[1.1, 0.4, 0.25]}>
        <torusGeometry args={[0.95, 0.018, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.85} />
      </mesh>

      {/* 轨道线框多面体 */}
      <WireOrbiter radius={2.85} speed={0.38} phase={0} y={0.15}>
        <mesh>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial color="#a5b4fc" wireframe />
        </mesh>
      </WireOrbiter>
      <WireOrbiter radius={3.15} speed={-0.31} phase={1.8} y={-0.2}>
        <mesh>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color="#818cf8" wireframe />
        </mesh>
      </WireOrbiter>
      <WireOrbiter radius={2.55} speed={0.52} phase={3.1} y={0.45}>
        <mesh>
          <tetrahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial color="#c7d2fe" wireframe />
        </mesh>
      </WireOrbiter>
    </group>
  );
}
