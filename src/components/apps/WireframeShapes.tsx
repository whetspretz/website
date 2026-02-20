import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const WIRE_COLOR = 0x84ff00
const BG_COLOR = 0x0a0e1a

function createMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color: WIRE_COLOR, wireframe: true })
}

function createMountains(mat: THREE.MeshBasicMaterial): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(4, 4, 39, 39)
  const verts = geo.attributes.position.array as Float32Array
  for (let i = 0; i < verts.length; i += 3) {
    const x = verts[i]
    const y = verts[i + 1]
    let h = 0
    h += Math.exp(-((x - 0.5) ** 2 + (y - 0.25) ** 2) / 0.5) * 1.2
    h += Math.exp(-((x + 0.25) ** 2 + (y - 0.4) ** 2) / 0.3) * 1.0
    h += Math.exp(-((x - 1.2) ** 2 + (y + 0.15) ** 2) / 0.4) * 0.9
    h += Math.exp(-((x + 1) ** 2 + (y + 0.25) ** 2) / 0.6) * 0.75
    h += (Math.random() - 0.5) * 0.08
    verts[i + 2] = h
  }
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2.8
  return mesh
}

function createWrinkledPlane(mat: THREE.MeshBasicMaterial): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(3, 3, 32, 32)
  const verts = geo.attributes.position.array as Float32Array
  for (let i = 0; i < verts.length; i += 3) {
    const x = verts[i]
    const y = verts[i + 1]
    let z = 0
    z += Math.sin(x * 3 + y * 2) * 0.15
    z += Math.sin(x * 5 - y * 3) * 0.1
    z += Math.sin(x * 2 + y * 4) * 0.12
    z += Math.cos(x * 4 + y * 1.5) * 0.08
    z += (Math.random() - 0.5) * 0.1
    verts[i + 2] = z
  }
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 6
  return mesh
}

function addMesh(parent: THREE.Group, geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  parent.add(m)
  return m
}

function createPNL(mat: THREE.MeshBasicMaterial): THREE.Group {
  const group = new THREE.Group()

  // P
  const p = new THREE.Group()
  addMesh(p, new THREE.BoxGeometry(0.3, 2, 0.3), mat, -0.35, 0, 0)
  addMesh(p, new THREE.BoxGeometry(1, 0.3, 0.3), mat, 0.15, 0.85, 0)
  addMesh(p, new THREE.BoxGeometry(1, 0.3, 0.3), mat, 0.15, 0.15, 0)
  addMesh(p, new THREE.BoxGeometry(0.3, 0.7, 0.3), mat, 0.65, 0.5, 0)
  p.position.x = -1.8
  group.add(p)

  // N
  const n = new THREE.Group()
  addMesh(n, new THREE.BoxGeometry(0.3, 2, 0.3), mat, -0.5, 0, 0)
  const nDiag = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.3, 0.3), mat)
  nDiag.rotation.z = Math.PI / 6
  n.add(nDiag)
  addMesh(n, new THREE.BoxGeometry(0.3, 2, 0.3), mat, 0.5, 0, 0)
  group.add(n)

  // L
  const l = new THREE.Group()
  addMesh(l, new THREE.BoxGeometry(0.3, 2, 0.3), mat, -0.35, 0, 0)
  addMesh(l, new THREE.BoxGeometry(1, 0.3, 0.3), mat, 0.15, -0.85, 0)
  l.position.x = 1.8
  group.add(l)

  group.scale.setScalar(0.6)
  return group
}

function createPigeon(mat: THREE.MeshBasicMaterial): { group: THREE.Group; leftWing: THREE.Mesh; rightWing: THREE.Mesh } {
  const group = new THREE.Group()

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 12), mat)
  body.scale.set(1, 0.9, 1.3)
  group.add(body)

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 10), mat)
  head.position.set(0, 0.7, 0.6)
  head.scale.set(0.9, 1, 0.9)
  group.add(head)

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.5, 8), mat)
  neck.position.set(0, 0.35, 0.4)
  neck.rotation.x = 0.3
  group.add(neck)

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 6), mat)
  beak.position.set(0, 0.7, 1)
  beak.rotation.x = Math.PI / 2
  group.add(beak)

  const wingGeo = new THREE.SphereGeometry(0.6, 12, 10)
  const leftWing = new THREE.Mesh(wingGeo, mat)
  leftWing.position.set(-0.7, 0.1, -0.1)
  leftWing.scale.set(0.4, 0.6, 1.2)
  leftWing.rotation.z = -0.3
  group.add(leftWing)

  const rightWing = new THREE.Mesh(wingGeo, mat)
  rightWing.position.set(0.7, 0.1, -0.1)
  rightWing.scale.set(0.4, 0.6, 1.2)
  rightWing.rotation.z = 0.3
  group.add(rightWing)

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, 8), mat)
  tail.position.set(0, 0.2, -1)
  tail.rotation.x = Math.PI / 2
  tail.scale.set(1, 0.3, 1)
  group.add(tail)

  const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 6)
  const leftLeg = new THREE.Mesh(legGeo, mat)
  leftLeg.position.set(-0.25, -0.85, 0.1)
  group.add(leftLeg)
  const rightLeg = new THREE.Mesh(legGeo, mat)
  rightLeg.position.set(0.25, -0.85, 0.1)
  group.add(rightLeg)

  const footGeo = new THREE.BoxGeometry(0.25, 0.05, 0.15)
  const leftFoot = new THREE.Mesh(footGeo, mat)
  leftFoot.position.set(-0.25, -1.15, 0.15)
  group.add(leftFoot)
  const rightFoot = new THREE.Mesh(footGeo, mat)
  rightFoot.position.set(0.25, -1.15, 0.15)
  group.add(rightFoot)

  const eyeGeo = new THREE.SphereGeometry(0.08, 6, 6)
  const leftEye = new THREE.Mesh(eyeGeo, mat)
  leftEye.position.set(-0.2, 0.8, 0.85)
  group.add(leftEye)
  const rightEye = new THREE.Mesh(eyeGeo, mat)
  rightEye.position.set(0.2, 0.8, 0.85)
  group.add(rightEye)

  group.scale.setScalar(0.9)
  return { group, leftWing, rightWing }
}

function createChatBubble(tailSide: 'left' | 'right', mat: THREE.MeshBasicMaterial): THREE.Group {
  const group = new THREE.Group()

  group.add(new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 0.8, 8, 6, 4), mat))

  const cornerGeo = new THREE.SphereGeometry(0.3, 8, 8)
  for (const [cx, cy] of [[-1.1, 0.6], [1.1, 0.6], [-1.1, -0.6], [1.1, -0.6]]) {
    const c = new THREE.Mesh(cornerGeo, mat)
    c.position.set(cx, cy, 0)
    group.add(c)
  }

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.8, 6), mat)
  tail.position.set(tailSide === 'left' ? -0.8 : 0.8, -1.1, 0)
  tail.rotation.z = tailSide === 'left' ? Math.PI / 4 : -Math.PI / 4
  group.add(tail)

  group.scale.setScalar(0.55)
  return group
}

export function WireframeShapes(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(BG_COLOR)

    const w = el.clientWidth || 1
    const h = el.clientHeight || 1
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    el.appendChild(renderer.domElement)

    const mat = createMaterial()
    const geometries: THREE.BufferGeometry[] = []
    const allMeshes: THREE.Object3D[] = []

    // Grid positions: 4 columns x 3 rows
    const COLS = 4
    const SPACING_X = 4.2
    const SPACING_Y = 4
    function gridPos(index: number): [number, number] {
      const col = index % COLS
      const row = Math.floor(index / COLS)
      const x = (col - (COLS - 1) / 2) * SPACING_X
      const y = ((2 - row) - 1) * SPACING_Y // centered vertically
      return [x, y]
    }

    // Row 1: Sphere, Prism, Cube, Octahedron
    const sphereGeo = new THREE.SphereGeometry(1.2, 28, 22)
    geometries.push(sphereGeo)
    const sphere = new THREE.Mesh(sphereGeo, mat)
    const [sx, sy] = gridPos(0)
    sphere.position.set(sx, sy, 0)
    scene.add(sphere)
    allMeshes.push(sphere)

    const prismGeo = new THREE.CylinderGeometry(0, 1.5, 2, 3)
    geometries.push(prismGeo)
    const prism = new THREE.Mesh(prismGeo, mat)
    const [px, py] = gridPos(1)
    prism.position.set(px, py, 0)
    scene.add(prism)
    allMeshes.push(prism)

    const cubeGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    geometries.push(cubeGeo)
    const cube = new THREE.Mesh(cubeGeo, mat)
    const [cx, cy] = gridPos(2)
    cube.position.set(cx, cy, 0)
    scene.add(cube)
    allMeshes.push(cube)

    const octaGeo = new THREE.OctahedronGeometry(1)
    geometries.push(octaGeo)
    const octa = new THREE.Mesh(octaGeo, mat)
    const [ox, oy] = gridPos(3)
    octa.position.set(ox, oy, 0)
    scene.add(octa)
    allMeshes.push(octa)

    // Row 2: Torus, Dodecahedron, Mountains, Wrinkled Plane
    const torusGeo = new THREE.TorusGeometry(0.8, 0.3, 12, 24)
    geometries.push(torusGeo)
    const torus = new THREE.Mesh(torusGeo, mat)
    const [tx, ty] = gridPos(4)
    torus.position.set(tx, ty, 0)
    scene.add(torus)
    allMeshes.push(torus)

    const dodecaGeo = new THREE.DodecahedronGeometry(0.9)
    geometries.push(dodecaGeo)
    const dodeca = new THREE.Mesh(dodecaGeo, mat)
    const [dx, dy] = gridPos(5)
    dodeca.position.set(dx, dy, 0)
    scene.add(dodeca)
    allMeshes.push(dodeca)

    const mountains = createMountains(mat)
    const [mx, my] = gridPos(6)
    mountains.position.set(mx, my, 0)
    mountains.scale.setScalar(0.7)
    scene.add(mountains)
    allMeshes.push(mountains)

    const wrinkled = createWrinkledPlane(mat)
    const [wx, wy] = gridPos(7)
    wrinkled.position.set(wx, wy, 0)
    wrinkled.scale.setScalar(0.7)
    scene.add(wrinkled)
    allMeshes.push(wrinkled)

    // Row 3: PNL, Pigeon, Chat Bubble 1, Chat Bubble 2
    const pnl = createPNL(mat)
    const [pnlx, pnly] = gridPos(8)
    pnl.position.set(pnlx, pnly, 0)
    scene.add(pnl)
    allMeshes.push(pnl)

    const pigeon = createPigeon(mat)
    const [pigx, pigy] = gridPos(9)
    pigeon.group.position.set(pigx, pigy, 0)
    scene.add(pigeon.group)
    allMeshes.push(pigeon.group)

    const chat1 = createChatBubble('left', mat)
    const [c1x, c1y] = gridPos(10)
    chat1.position.set(c1x, c1y, 0)
    scene.add(chat1)
    allMeshes.push(chat1)

    const chat2 = createChatBubble('right', mat)
    const [c2x, c2y] = gridPos(11)
    chat2.position.set(c2x, c2y, 0)
    scene.add(chat2)
    allMeshes.push(chat2)

    let time = 0
    let animId: number

    function animate() {
      animId = requestAnimationFrame(animate)
      time += 0.01

      sphere.rotation.y += 0.005
      prism.rotation.y += 0.005
      cube.rotation.x += 0.003
      cube.rotation.y += 0.005
      octa.rotation.x += 0.004
      octa.rotation.y += 0.006
      torus.rotation.x += 0.005
      torus.rotation.y += 0.003
      dodeca.rotation.x += 0.003
      dodeca.rotation.y += 0.004
      mountains.rotation.z += 0.002
      wrinkled.rotation.y += 0.003
      pnl.rotation.y += 0.005

      pigeon.group.rotation.y += 0.005
      pigeon.leftWing.rotation.z = -0.3 + Math.sin(time * 3) * 0.15
      pigeon.rightWing.rotation.z = 0.3 - Math.sin(time * 3) * 0.15

      chat1.rotation.y += 0.005
      chat1.position.y = c1y + Math.sin(time * 1.5) * 0.2
      chat2.rotation.y += 0.005
      chat2.position.y = c2y + Math.cos(time * 1.5) * 0.2

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
      mat.dispose()
      geometries.forEach((g) => g.dispose())
      allMeshes.forEach((obj) => {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
          }
        })
      })
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
