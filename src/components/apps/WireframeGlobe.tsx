import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function WireframeGlobe(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0e1a)

    const w = el.clientWidth || 1
    const h = el.clientHeight || 1
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    el.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(1.5, 28, 22)
    const material = new THREE.MeshBasicMaterial({
      color: 0x84ff00,
      wireframe: true,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    let animId: number

    function animate() {
      animId = requestAnimationFrame(animate)
      sphere.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    observer.observe(el)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ borderRadius: 8, overflow: 'hidden' }}
    />
  )
}
