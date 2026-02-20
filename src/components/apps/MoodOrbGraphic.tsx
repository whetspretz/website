import { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'

const VERTEX_SHADER = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = `
  uniform float time;
  uniform float themePuzzle;
  uniform float themeEscape;
  uniform float themeDeeply;
  uniform float themeRush;
  uniform float themeLove;
  uniform float themeLearn;
  uniform float themeThink;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    float noise1 = sin(vPosition.x * 2.0 + time * 1.2) * 0.5 + 0.5;
    float noise2 = sin(vPosition.y * 2.0 + time * 1.5) * 0.5 + 0.5;
    float noise3 = sin(vPosition.z * 2.0 + time * 0.9) * 0.5 + 0.5;

    float ripple1 = sin(length(vPosition.xy) * 8.0 - time * 3.0) * 0.5 + 0.5;
    float ripple2 = sin(length(vPosition.yz) * 6.0 - time * 2.5) * 0.5 + 0.5;
    float ripple3 = sin(length(vPosition.xz) * 7.0 - time * 2.8) * 0.5 + 0.5;
    float rippleEffect = (ripple1 + ripple2 + ripple3) / 3.0;

    vec3 defaultColor1 = vec3(0.3 + noise1 * 0.4, 0.1 + noise2 * 0.3, 0.8 + noise3 * 0.2);
    vec3 defaultColor2 = vec3(0.8 + noise2 * 0.2, 0.2 + noise3 * 0.3, 0.4 + noise1 * 0.4);
    vec3 defaultColor3 = vec3(0.2 + noise3 * 0.3, 0.6 + noise1 * 0.4, 0.9 + noise2 * 0.1);

    vec3 puzzleColor1 = vec3(0.1 + noise1 * 0.3, 0.7 + noise2 * 0.2, 0.5 + noise3 * 0.3);
    vec3 puzzleColor2 = vec3(0.2 + noise2 * 0.2, 0.9 + noise3 * 0.1, 0.6 + noise1 * 0.2);
    vec3 puzzleColor3 = vec3(0.3 + noise3 * 0.3, 0.6 + noise1 * 0.3, 0.7 + noise2 * 0.2);

    vec3 escapeColor1 = vec3(0.9 + noise1 * 0.1, 0.6 + noise2 * 0.2, 0.1 + noise3 * 0.3);
    vec3 escapeColor2 = vec3(1.0, 0.7 + noise2 * 0.2, 0.2 + noise3 * 0.3);
    vec3 escapeColor3 = vec3(0.8 + noise3 * 0.2, 0.5 + noise1 * 0.2, 0.1 + noise2 * 0.2);

    vec3 deeplyColor1 = vec3(0.2 + noise1 * 0.2, 0.1 + noise2 * 0.2, 0.6 + noise3 * 0.3);
    vec3 deeplyColor2 = vec3(0.3 + noise2 * 0.2, 0.2 + noise3 * 0.2, 0.8 + noise1 * 0.2);
    vec3 deeplyColor3 = vec3(0.4 + noise3 * 0.2, 0.3 + noise1 * 0.2, 0.7 + noise2 * 0.2);

    vec3 rushColor1 = vec3(0.9 + noise1 * 0.1, 0.1 + noise2 * 0.2, 0.3 + noise3 * 0.3);
    vec3 rushColor2 = vec3(1.0, 0.2 + noise2 * 0.2, 0.5 + noise3 * 0.2);
    vec3 rushColor3 = vec3(0.8 + noise3 * 0.2, 0.0 + noise1 * 0.2, 0.4 + noise2 * 0.3);

    vec3 loveColor1 = vec3(0.9 + noise1 * 0.1, 0.3 + noise2 * 0.3, 0.6 + noise3 * 0.2);
    vec3 loveColor2 = vec3(1.0, 0.5 + noise2 * 0.2, 0.7 + noise3 * 0.2);
    vec3 loveColor3 = vec3(0.8 + noise3 * 0.1, 0.4 + noise1 * 0.3, 0.8 + noise2 * 0.1);

    vec3 learnColor1 = vec3(0.7 + noise1 * 0.2, 0.9 + noise2 * 0.1, 0.2 + noise3 * 0.2);
    vec3 learnColor2 = vec3(0.8 + noise2 * 0.2, 1.0, 0.3 + noise1 * 0.2);
    vec3 learnColor3 = vec3(0.6 + noise3 * 0.2, 0.8 + noise1 * 0.2, 0.1 + noise2 * 0.2);

    vec3 thinkColor1 = vec3(0.8 + noise1 * 0.2, 0.2 + noise2 * 0.2, 0.2 + noise3 * 0.2);
    vec3 thinkColor2 = vec3(0.9 + noise2 * 0.1, 0.3 + noise3 * 0.2, 0.3 + noise1 * 0.2);
    vec3 thinkColor3 = vec3(0.7 + noise3 * 0.2, 0.1 + noise1 * 0.2, 0.2 + noise2 * 0.2);

    vec3 finalColor1 = defaultColor1;
    vec3 finalColor2 = defaultColor2;
    vec3 finalColor3 = defaultColor3;
    float totalWeight = 1.0;

    if (themePuzzle > 0.0) {
      finalColor1 = mix(finalColor1, puzzleColor1, themePuzzle / (totalWeight + themePuzzle));
      finalColor2 = mix(finalColor2, puzzleColor2, themePuzzle / (totalWeight + themePuzzle));
      finalColor3 = mix(finalColor3, puzzleColor3, themePuzzle / (totalWeight + themePuzzle));
      totalWeight += themePuzzle;
    }
    if (themeEscape > 0.0) {
      finalColor1 = mix(finalColor1, escapeColor1, themeEscape / (totalWeight + themeEscape));
      finalColor2 = mix(finalColor2, escapeColor2, themeEscape / (totalWeight + themeEscape));
      finalColor3 = mix(finalColor3, escapeColor3, themeEscape / (totalWeight + themeEscape));
      totalWeight += themeEscape;
    }
    if (themeDeeply > 0.0) {
      finalColor1 = mix(finalColor1, deeplyColor1, themeDeeply / (totalWeight + themeDeeply));
      finalColor2 = mix(finalColor2, deeplyColor2, themeDeeply / (totalWeight + themeDeeply));
      finalColor3 = mix(finalColor3, deeplyColor3, themeDeeply / (totalWeight + themeDeeply));
      totalWeight += themeDeeply;
    }
    if (themeRush > 0.0) {
      finalColor1 = mix(finalColor1, rushColor1, themeRush / (totalWeight + themeRush));
      finalColor2 = mix(finalColor2, rushColor2, themeRush / (totalWeight + themeRush));
      finalColor3 = mix(finalColor3, rushColor3, themeRush / (totalWeight + themeRush));
      totalWeight += themeRush;
    }
    if (themeLove > 0.0) {
      finalColor1 = mix(finalColor1, loveColor1, themeLove / (totalWeight + themeLove));
      finalColor2 = mix(finalColor2, loveColor2, themeLove / (totalWeight + themeLove));
      finalColor3 = mix(finalColor3, loveColor3, themeLove / (totalWeight + themeLove));
      totalWeight += themeLove;
    }
    if (themeLearn > 0.0) {
      finalColor1 = mix(finalColor1, learnColor1, themeLearn / (totalWeight + themeLearn));
      finalColor2 = mix(finalColor2, learnColor2, themeLearn / (totalWeight + themeLearn));
      finalColor3 = mix(finalColor3, learnColor3, themeLearn / (totalWeight + themeLearn));
      totalWeight += themeLearn;
    }
    if (themeThink > 0.0) {
      finalColor1 = mix(finalColor1, thinkColor1, themeThink / (totalWeight + themeThink));
      finalColor2 = mix(finalColor2, thinkColor2, themeThink / (totalWeight + themeThink));
      finalColor3 = mix(finalColor3, thinkColor3, themeThink / (totalWeight + themeThink));
      totalWeight += themeThink;
    }

    float mixFactor1 = sin(vPosition.y * 3.0 + time * 1.4) * 0.5 + 0.5;
    float mixFactor2 = sin(vPosition.x * 3.0 + time * 1.0) * 0.5 + 0.5;
    vec3 mixedColor = mix(finalColor1, finalColor2, mixFactor1);
    mixedColor = mix(mixedColor, finalColor3, mixFactor2);
    mixedColor += rippleEffect * 0.15;

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    mixedColor += fresnel * 0.3;

    gl_FragColor = vec4(mixedColor, 1.0);
  }
`

const GLOW_VERTEX = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GLOW_FRAGMENT = `
  uniform float time;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    vec3 glowColor = vec3(
      0.5 + sin(time * 0.5) * 0.3,
      0.3 + sin(time * 0.7) * 0.2,
      0.8 + sin(time * 0.3) * 0.2
    );
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
  }
`

interface ThemeOption {
  key: string
  label: string
}

const THEMES: ThemeOption[] = [
  { key: 'puzzle', label: 'Solve a puzzle' },
  { key: 'escape', label: 'Escape' },
  { key: 'deeply', label: 'Feel Deeply' },
  { key: 'rush', label: 'Feel a rush' },
  { key: 'love', label: 'Fall in love' },
  { key: 'learn', label: 'Learn something' },
  { key: 'think', label: 'Think Deeply' },
]

const THEME_UNIFORM_MAP: Record<string, string> = {
  puzzle: 'themePuzzle',
  escape: 'themeEscape',
  deeply: 'themeDeeply',
  rush: 'themeRush',
  love: 'themeLove',
  learn: 'themeLearn',
  think: 'themeThink',
}

export function MoodOrbGraphic(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeThemes, setActiveThemes] = useState<Set<string>>(new Set())
  const themeTargetsRef = useRef<Record<string, number>>({
    puzzle: 0, escape: 0, deeply: 0, rush: 0, love: 0, learn: 0, think: 0,
  })

  const toggleTheme = useCallback((key: string) => {
    setActiveThemes(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
        themeTargetsRef.current[key] = 0
      } else {
        next.add(key)
        themeTargetsRef.current[key] = 1
      }
      return next
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Main sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64)
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        time: { value: 0 },
        themePuzzle: { value: 0 },
        themeEscape: { value: 0 },
        themeDeeply: { value: 0 },
        themeRush: { value: 0 },
        themeLove: { value: 0 },
        themeLearn: { value: 0 },
        themeThink: { value: 0 },
      },
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

    // Glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.65, 64, 64)
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: GLOW_VERTEX,
      fragmentShader: GLOW_FRAGMENT,
      uniforms: { time: { value: 0 } },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial)
    scene.add(glowSphere)

    // Wave rings
    const waveRings: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const ringGeometry = new THREE.TorusGeometry(2, 0.02, 16, 100)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x8844ff,
        transparent: true,
        opacity: 0.6,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2
      ring.userData.offset = i * (Math.PI * 2) / 4
      ring.userData.baseScale = 0.3
      scene.add(ring)
      waveRings.push(ring)
    }

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, 1))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    // Drag state
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }

    const onPointerDown = (e: PointerEvent): void => {
      isDragging = true
      prevMouse = { x: e.clientX, y: e.clientY }
    }
    const onPointerUp = (): void => { isDragging = false }
    const onPointerMove = (e: PointerEvent): void => {
      if (!isDragging) return
      const dx = e.clientX - prevMouse.x
      const dy = e.clientY - prevMouse.y
      sphere.rotation.y += dx * 0.01
      sphere.rotation.x += dy * 0.01
      glowSphere.rotation.y += dx * 0.01
      glowSphere.rotation.x += dy * 0.01
      prevMouse = { x: e.clientX, y: e.clientY }
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)

    // Theme interpolation state
    const themeCurrent: Record<string, number> = {
      puzzle: 0, escape: 0, deeply: 0, rush: 0, love: 0, learn: 0, think: 0,
    }

    // Animation loop
    let time = 0
    let animId = 0
    const animate = (): void => {
      animId = requestAnimationFrame(animate)
      time += 0.01

      // Smooth theme transitions
      for (const key of Object.keys(themeCurrent)) {
        const target = themeTargetsRef.current[key] ?? 0
        themeCurrent[key] += (target - themeCurrent[key]) * 0.05
      }

      sphereMaterial.uniforms.time.value = time
      glowMaterial.uniforms.time.value = time

      for (const [key, uniformName] of Object.entries(THEME_UNIFORM_MAP)) {
        sphereMaterial.uniforms[uniformName].value = themeCurrent[key]
      }

      // Auto-rotate when not dragging
      if (!isDragging) {
        sphere.rotation.y += 0.002
        sphere.rotation.x += 0.001
        glowSphere.rotation.y += 0.002
        glowSphere.rotation.x += 0.001
      }

      // Animate wave rings
      waveRings.forEach((ring, i) => {
        const wave = Math.sin(time * 2 + ring.userData.offset)
        const scale = ring.userData.baseScale + wave * 0.1
        ring.scale.set(scale, scale, scale)
        ;(ring.material as THREE.MeshBasicMaterial).opacity = Math.abs(wave) * 0.3 + 0.2
        const hue = (time * 0.1 + i * 0.2) % 1
        ;(ring.material as THREE.MeshBasicMaterial).color.setHSL(hue, 0.7, 0.5)
      })

      renderer.render(scene, camera)
    }
    animate()

    // Resize handling
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
      }
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
      container.removeChild(renderer.domElement)
      sphereGeometry.dispose()
      sphereMaterial.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
      waveRings.forEach(r => {
        r.geometry.dispose()
        ;(r.material as THREE.MeshBasicMaterial).dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" style={{ cursor: 'grab' }} />
      <div
        className="absolute bottom-4 left-1/2 flex gap-2 flex-wrap justify-center"
        style={{ transform: 'translateX(-50%)', maxWidth: '90%' }}
      >
        {THEMES.map(t => (
          <button
            key={t.key}
            onClick={() => toggleTheme(t.key)}
            className="select-none"
            style={{
              background: activeThemes.has(t.key) ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
              border: `1px solid ${activeThemes.has(t.key) ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}`,
              color: activeThemes.has(t.key) ? '#fff' : 'rgba(255,255,255,0.7)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: activeThemes.has(t.key) ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
