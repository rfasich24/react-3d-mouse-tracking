import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei' // <-- Tambahkan OrbitControls di sini
import { Model } from './Karakter' 

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0e0e0e' }}>
      {/* Kamu juga bisa memundurkan kamera dengan membesarkan angka Z (angka ketiga) */}
      <Canvas camera={{ position: [0, 1.5, 8], fov: 45 }}>
        
        {/* FITUR SAKTI: Memungkinkanmu zoom (scroll mouse) dan memutar kamera (klik + drag) */}
        <OrbitControls />

        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        
        {/* PERBAIKAN SKALA & POSISI */}
        {/* Tambahkan properti scale={}. Coba angka 0.5, 0.1, atau bahkan 0.01 jika masih raksasa */}
        <Model 
          position={[0, -3, 0]} // Turunkan posisi Y (angka tengah) agar kakinya pas di lantai
          scale={0.5}           // <- Ubah angka ini sampai ukurannya pas di layar
        />

        {/* Bayangan di lantai (sesuaikan posisi Y-nya dengan posisi Y Model di atas) */}
        <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={10} blur={2} far={4} />

      </Canvas>
    </div>
  )
}

export default App