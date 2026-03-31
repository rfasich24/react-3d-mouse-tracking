import React, { useMemo, useEffect } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export function Model(props) {
  const { scene } = useGLTF('/karakter.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  useEffect(() => {
    // Pastikan kamu cek console untuk memastikan nama Head dan Neck benar
    console.log("Nodes:", nodes);
  }, [nodes]);

useFrame((state) => {
    // Pastikan kedua tulang dipanggil
    const head = nodes['Head_07']; 
    const neck = nodes['Neck_06']; 
    
    if (!head || !neck) return;

    // Ambil posisi kursor (-1 sampai 1)
    const mouseX = state.pointer.x; // Kiri - Kanan
    const mouseY = state.pointer.y; // Atas - Bawah

    // Batas maksimal rotasi (sekitar 45 derajat)
    const batasRotasi = Math.PI / 4; 

    // ==========================================
    // 1. KEPALA: FOKUS ATAS/BAWAH (Nunduk/Ndangak)
    // ==========================================
    // Asumsi dari tes sebelumnya: sumbu X yang benar. 
    // (Ubah tanda minus atau ganti sumbu X kalau terbalik)
    const targetNunduk = -mouseY * batasRotasi;
    head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetNunduk, 0.1);


    // ==========================================
    // 2. LEHER: FOKUS KIRI/KANAN (Menoleh)
    // ==========================================
    // Umumnya, sumbu Y digunakan untuk putaran kiri-kanan (yaw).
    // Diberi tanda minus (-) agar arah putarannya selaras dengan mouse.
    const targetNengok = mouseX * batasRotasi;
    
    // Terapkan ke tulang LEHER, bukan KEPALA
    neck.rotation.z = THREE.MathUtils.lerp(neck.rotation.z, targetNengok, 0.1);
  });

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={11}>
          <primitive object={nodes._rootJoint} />
          {/* Pastikan mesh di bawah ini sesuai dengan hasil generate gltfjsx kamu */}
          <skinnedMesh geometry={nodes.Object_219.geometry} material={materials.M_Sage_Darkcloth_L_Inst} skeleton={nodes.Object_219.skeleton} />
          <skinnedMesh geometry={nodes.Object_220.geometry} material={materials.M_Sage_Darkskin_L_Inst} skeleton={nodes.Object_220.skeleton} />
          <skinnedMesh geometry={nodes.Object_221.geometry} material={materials.M_Sage_Darkhair_L_Inst} skeleton={nodes.Object_221.skeleton} />
          <skinnedMesh geometry={nodes.Object_222.geometry} material={materials.M_Sage_Darkhairblack_L_Inst} skeleton={nodes.Object_222.skeleton} />
          <skinnedMesh geometry={nodes.Object_223.geometry} material={materials.M_Sage_Darkeye_L_Inst} skeleton={nodes.Object_223.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/karakter.glb')