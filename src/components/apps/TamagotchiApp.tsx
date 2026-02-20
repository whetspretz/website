import { useState, useEffect, useRef, useCallback } from 'react'

// --- Config ---
const CAT_NAME = 'Zoltar'
const TICK_MS = 3000
const COOLDOWN_MS = 500
const WANDER_MS = 2500
const STORAGE_KEY = 'tamagotchi-state'

type Mood = 'idle' | 'happy' | 'annoyed' | 'dirty' | 'hungry'
type Cosmetic = 'none' | 'bow' | 'crown' | 'bandana' | 'sunglasses' | 'halo'
type Tab = 'game' | 'unlocks'

interface GameState {
  hearts: number
  hunger: number
  dirt: number
  userHP: number
  cosmetic: Cosmetic
  timestamp: number
  timesMaxHearts: number
  scratchesTaken: number
  scoopsDone: number
}

// --- Achievements ---
type StatKey = 'timesMaxHearts' | 'scratchesTaken' | 'scoopsDone'

interface Achievement {
  id: string
  label: string
  desc: string
  goal: number
  stat: StatKey
  reward: Cosmetic
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-love',   label: 'First Love',   desc: 'Reach 100 hearts',           goal: 1,  stat: 'timesMaxHearts', reward: 'bow' },
  { id: 'devoted',      label: 'Devoted',       desc: 'Reach 100 hearts 5 times',   goal: 5,  stat: 'timesMaxHearts', reward: 'crown' },
  { id: 'tough-love',   label: 'Tough Love',    desc: 'Survive 10 scratches',        goal: 10, stat: 'scratchesTaken', reward: 'bandana' },
  { id: 'clean-freak',  label: 'Clean Freak',   desc: 'Scoop litter 20 times',       goal: 20, stat: 'scoopsDone',     reward: 'sunglasses' },
  { id: 'best-friends', label: 'Best Friends',  desc: 'Reach 100 hearts 10 times',   goal: 10, stat: 'timesMaxHearts', reward: 'halo' },
]

function isUnlocked(state: GameState, a: Achievement): boolean {
  return state[a.stat] >= a.goal
}

function unlockedCosmetics(state: GameState): Cosmetic[] {
  const unlocked: Cosmetic[] = ['none']
  for (const a of ACHIEVEMENTS) {
    if (isUnlocked(state, a)) unlocked.push(a.reward)
  }
  return unlocked
}

// --- Helpers ---
function clamp(v: number): number {
  return Math.max(0, Math.min(100, v))
}

function deriveMood(hearts: number, hunger: number, dirt: number): Mood {
  if (hunger > 70) return 'hungry'
  if (dirt > 70) return 'dirty'
  if (hearts > 70) return 'happy'
  return 'idle'
}

function defaultState(): GameState {
  return {
    hearts: 50, hunger: 20, dirt: 10, userHP: 100,
    cosmetic: 'none', timestamp: Date.now(),
    timesMaxHearts: 0, scratchesTaken: 0, scoopsDone: 0,
  }
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const saved = JSON.parse(raw) as GameState
    const elapsed = (Date.now() - saved.timestamp) / 1000
    const ticks = Math.floor(elapsed / (TICK_MS / 1000))
    let { hearts, hunger, dirt } = saved
    hunger = clamp(hunger + ticks * 2)
    dirt = clamp(dirt + ticks)
    const decayTicks = Math.min(ticks, 100)
    if (hunger > 60 || dirt > 60) hearts = clamp(hearts - decayTicks)
    return {
      ...saved,
      hearts, hunger, dirt, timestamp: Date.now(),
      // Backfill new fields for old saves
      timesMaxHearts: saved.timesMaxHearts ?? 0,
      scratchesTaken: saved.scratchesTaken ?? 0,
      scoopsDone: saved.scoopsDone ?? 0,
    }
  } catch {
    return defaultState()
  }
}

function saveState(s: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...s, timestamp: Date.now() }))
  } catch { /* ignore */ }
}

// --- Pixel cat sprite ---
const PX = 4
const C = { body: '#c8c8c8', dark: '#888', eye: '#222', nose: '#e88', accent: '#dfff00' }

function catPixels(mood: Mood, cosmetic: Cosmetic): string {
  const { body: b, dark: d, eye: e, nose: n, accent: a } = C

  const pixels: [number, number, string][] = [
    // ears
    [2,0,d],[3,0,b],[7,0,b],[8,0,d],
    [2,1,b],[3,1,b],[7,1,b],[8,1,b],
    // head
    [2,2,b],[3,2,b],[4,2,b],[5,2,b],[6,2,b],[7,2,b],[8,2,b],
    // eyes
    [2,3,b],[3,3,e],[4,3,b],[5,3,b],[6,3,b],[7,3,e],[8,3,b],
    // nose
    [2,4,b],[3,4,b],[4,4,b],[5,4,n],[6,4,b],[7,4,b],[8,4,b],
    // body
    [1,5,b],[2,5,b],[3,5,b],[4,5,b],[5,5,b],[6,5,b],[7,5,b],[8,5,b],[9,5,b],
    [1,6,b],[2,6,b],[3,6,b],[4,6,b],[5,6,b],[6,6,b],[7,6,b],[8,6,b],[9,6,b],
    [1,7,b],[2,7,b],[3,7,d],[4,7,b],[5,7,b],[6,7,b],[7,7,d],[8,7,b],[9,7,b],
    // legs
    [1,8,d],[2,8,d],[4,8,b],[5,8,b],[6,8,b],[8,8,d],[9,8,d],
    // tail
    [9,6,d],[10,5,d],
  ]

  // Mood faces
  if (mood === 'happy') pixels.push([4,4,d],[6,4,d])
  if (mood === 'annoyed') pixels.push([3,2,d],[7,2,d])
  if (mood === 'hungry') pixels.push([5,5,d])
  if (mood === 'dirty') pixels.push([10,2,'#6cf'],[10,3,'#6cf'])

  // Cosmetics
  if (cosmetic === 'bow') {
    pixels.push([5,0,a],[4,0,a],[6,0,a],[5,-1,a])
  } else if (cosmetic === 'crown') {
    pixels.push([4,-1,a],[5,-1,a],[6,-1,a],[4,-2,a],[6,-2,a],[5,-2,a])
  } else if (cosmetic === 'bandana') {
    pixels.push([2,1,a],[3,1,a],[4,1,a],[5,1,a],[6,1,a],[7,1,a],[8,1,a])
    pixels.push([8,2,a],[9,2,a]) // trailing knot
  } else if (cosmetic === 'sunglasses') {
    // Replace eyes with shades
    pixels.push([2,3,d],[3,3,'#333'],[4,3,'#333'],[5,3,b],[6,3,'#333'],[7,3,'#333'],[8,3,d])
  } else if (cosmetic === 'halo') {
    pixels.push([3,-2,a],[4,-2,a],[5,-2,a],[6,-2,a],[7,-2,a])
    pixels.push([3,-3,a],[7,-3,a]) // ring top
    pixels.push([4,-3,a],[5,-3,a],[6,-3,a])
  }

  return pixels.map(([c,r,color]) => `${c*PX}px ${r*PX}px 0 0 ${color}`).join(',')
}

// --- Meter ---
function Meter({ label, value, color, ariaLabel }: { label: string; value: number; color: string; ariaLabel: string }): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="w-16 text-white/70 shrink-0">{label}</span>
      <div
        className="flex-1 h-3 border border-white/30 relative"
        role="meter"
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full transition-all duration-300" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="w-8 text-right text-white/60 tabular-nums">{value}</span>
    </div>
  )
}

// --- Main ---
export function TamagotchiApp(): React.JSX.Element {
  const [state, setState] = useState<GameState>(loadState)
  const [mood, setMood] = useState<Mood>('idle')
  const [annoyed, setAnnoyed] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const [sparkle, setSparkle] = useState(false)
  const [log, setLog] = useState<string[]>([`${CAT_NAME} stretches and looks at you.`])
  const [tab, setTab] = useState<Tab>('game')
  const [catPos, setCatPos] = useState({ x: 50, y: 50 })
  const [facingLeft, setFacingLeft] = useState(false)

  const annoyedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevMaxRef = useRef(state.hearts >= 100)

  const addLog = useCallback((msg: string) => {
    setLog(prev => [...prev.slice(-4), msg])
  }, [])

  // --- Cat wandering ---
  useEffect(() => {
    const id = setInterval(() => {
      setCatPos(prev => {
        const nx = 15 + Math.random() * 70
        const ny = 20 + Math.random() * 60
        setFacingLeft(nx < prev.x)
        return { x: nx, y: ny }
      })
    }, WANDER_MS)
    return () => clearInterval(id)
  }, [])

  // --- Passive tick ---
  useEffect(() => {
    const id = setInterval(() => {
      setState(prev => {
        const hunger = clamp(prev.hunger + 2)
        const dirt = clamp(prev.dirt + 1)
        let hearts = prev.hearts
        if (hunger > 60 || dirt > 60) hearts = clamp(hearts - 1)
        const next = { ...prev, hunger, dirt, hearts }
        saveState(next)
        return next
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  // --- Derive mood ---
  useEffect(() => {
    setMood(annoyed ? 'annoyed' : deriveMood(state.hearts, state.hunger, state.dirt))
  }, [state.hearts, state.hunger, state.dirt, annoyed])

  // --- Max hearts tracking ---
  useEffect(() => {
    const atMax = state.hearts >= 100
    if (atMax && !prevMaxRef.current) {
      setState(prev => {
        const next = { ...prev, timesMaxHearts: prev.timesMaxHearts + 1 }
        saveState(next)
        // Check for newly unlocked achievements
        for (const a of ACHIEVEMENTS) {
          if (a.stat === 'timesMaxHearts' && !isUnlocked(prev, a) && isUnlocked(next, a)) {
            addLog(`Unlocked: ${a.label}! (${a.reward})`)
          }
        }
        return next
      })
      setSparkle(true)
      addLog(`Besties achieved! ${CAT_NAME} loves you.`)
      setTimeout(() => setSparkle(false), 3000)
    }
    prevMaxRef.current = atMax
  }, [state.hearts, addLog])

  // --- Actions ---
  const doAction = useCallback((action: () => void) => {
    if (cooldown) return
    setCooldown(true)
    action()
    setTimeout(() => setCooldown(false), COOLDOWN_MS)
  }, [cooldown])

  const feed = useCallback(() => {
    doAction(() => {
      setState(prev => {
        const next = { ...prev, hunger: clamp(prev.hunger - 25), hearts: clamp(prev.hearts + 10) }
        saveState(next)
        return next
      })
      addLog(`You fed ${CAT_NAME}. Nom nom.`)
    })
  }, [doAction, addLog])

  const pet = useCallback(() => {
    doAction(() => {
      const scratched = Math.random() < 0.5
      if (scratched) {
        const dmg = Math.floor(Math.random() * 11) + 5
        setState(prev => {
          const next = { ...prev, userHP: clamp(prev.userHP - dmg), scratchesTaken: prev.scratchesTaken + 1 }
          saveState(next)
          for (const a of ACHIEVEMENTS) {
            if (a.stat === 'scratchesTaken' && !isUnlocked(prev, a) && isUnlocked(next, a)) {
              addLog(`Unlocked: ${a.label}! (${a.reward})`)
            }
          }
          return next
        })
        setAnnoyed(true)
        if (annoyedTimer.current) clearTimeout(annoyedTimer.current)
        annoyedTimer.current = setTimeout(() => setAnnoyed(false), 2000)
        addLog(`Scratch! You lost ${dmg} HP. ${CAT_NAME} hisses.`)
      } else {
        setState(prev => {
          const next = { ...prev, hearts: clamp(prev.hearts + 15) }
          saveState(next)
          return next
        })
        addLog(`${CAT_NAME} purrs contentedly.`)
      }
    })
  }, [doAction, addLog])

  const scoop = useCallback(() => {
    doAction(() => {
      setState(prev => {
        const next = { ...prev, dirt: clamp(prev.dirt - 30), hearts: clamp(prev.hearts + 10), scoopsDone: prev.scoopsDone + 1 }
        saveState(next)
        for (const a of ACHIEVEMENTS) {
          if (a.stat === 'scoopsDone' && !isUnlocked(prev, a) && isUnlocked(next, a)) {
            addLog(`Unlocked: ${a.label}! (${a.reward})`)
          }
        }
        return next
      })
      addLog(`Litter scooped. ${CAT_NAME} approves.`)
    })
  }, [doAction, addLog])

  const playString = useCallback(() => {
    doAction(() => {
      setState(prev => {
        const next = { ...prev, hearts: clamp(prev.hearts + 12), hunger: clamp(prev.hunger + 5) }
        saveState(next)
        return next
      })
      addLog(`${CAT_NAME} pounces on the string!`)
    })
  }, [doAction, addLog])

  const equipCosmetic = useCallback((c: Cosmetic) => {
    setState(prev => {
      const next = { ...prev, cosmetic: c }
      saveState(next)
      return next
    })
  }, [])

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const available = unlockedCosmetics(state)

  return (
    <div className="flex flex-col h-full font-mono select-none" style={{ background: '#111', imageRendering: 'pixelated' }}>
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-white/85 text-sm tracking-wider uppercase">{CAT_NAME}</span>
        <div className="flex gap-1">
          {(['game', 'unlocks'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[10px] px-2 py-0.5 border transition-colors ${
                tab === t
                  ? 'border-[#dfff00]/50 text-[#dfff00]/90 bg-[#dfff00]/10'
                  : 'border-white/25 text-white/55 hover:border-white/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'game' ? (
        <>
          {/* Cat sprite area */}
          <div className="flex-1 relative min-h-0 overflow-hidden">
            {sparkle && !reducedMotion && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute tamagotchi-sparkle"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.15}s`,
                      width: 6, height: 6,
                      background: '#dfff00',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Wandering cat */}
            <div
              className="absolute"
              style={{
                left: `${catPos.x}%`,
                top: `${catPos.y}%`,
                transition: reducedMotion ? 'none' : 'left 1.5s ease-in-out, top 1.5s ease-in-out',
                transform: `translate(-50%, -50%) ${facingLeft ? 'scaleX(-1)' : ''}`,
              }}
            >
              <div
                style={{
                  width: PX,
                  height: PX,
                  boxShadow: catPixels(mood, state.cosmetic),
                  transform: 'scale(1.5)',
                }}
                aria-label={`${CAT_NAME} the cat, feeling ${mood}`}
                role="img"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 flex flex-col gap-1.5 pb-2">
            <Meter label="Hearts" value={state.hearts} color="#dfff00" ariaLabel={`Hearts: ${state.hearts} out of 100`} />
            <Meter label="User HP" value={state.userHP} color="#ff6b6b" ariaLabel={`Your HP: ${state.userHP} out of 100`} />
            <div className="flex gap-3 mt-0.5">
              <div className="flex items-center gap-1 text-[10px] text-white/50">
                <span>hunger</span><span className="text-white/70">{state.hunger}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/50">
                <span>dirt</span><span className="text-white/70">{state.dirt}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/50">
                <span>mood</span><span className="text-white/70">{mood}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-1.5 px-4 pb-2">
            {[
              { label: 'Feed', fn: feed, icon: '~' },
              { label: 'Pet', fn: pet, icon: '*' },
              { label: 'Scoop', fn: scoop, icon: '#' },
              { label: 'Play', fn: playString, icon: '>' },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={btn.fn}
                disabled={cooldown}
                className="flex flex-col items-center gap-0.5 py-2 border border-white/30 text-white/80 text-xs
                  hover:border-[#dfff00]/50 hover:text-[#dfff00] active:bg-[#dfff00]/10
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-base leading-none">{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Log */}
          <div className="px-4 pb-3 flex flex-col gap-0.5 text-[11px] text-white/55 max-h-24 overflow-y-auto" aria-live="polite" aria-label="Game status log">
            {log.map((entry, i) => (
              <div key={i} className="flex gap-1.5">
                <span className="text-white/35 shrink-0">&gt;</span>
                <span>{entry}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Unlocks panel */
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="flex flex-col gap-3 pt-2">
            {ACHIEVEMENTS.map(a => {
              const progress = Math.min(state[a.stat], a.goal)
              const done = isUnlocked(state, a)
              return (
                <div
                  key={a.id}
                  className={`border p-3 ${done ? 'border-[#dfff00]/40 bg-[#dfff00]/5' : 'border-white/20'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs ${done ? 'text-[#dfff00]' : 'text-white/40'}`}>
                      {done ? '+' : 'o'}
                    </span>
                    <span className={`text-xs font-bold ${done ? 'text-[#dfff00]/90' : 'text-white/70'}`}>
                      {a.label}
                    </span>
                    <span className="ml-auto text-[10px] text-white/50">
                      {a.reward}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/55 mb-1.5">{a.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 border border-white/25 relative">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${(progress / a.goal) * 100}%`,
                          backgroundColor: done ? '#dfff00' : 'rgba(255,255,255,0.2)',
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-white/50 tabular-nums w-10 text-right">
                      {progress}/{a.goal}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cosmetic selector */}
          <div className="mt-4 pt-3 border-t border-white/20">
            <p className="text-[10px] text-white/60 mb-2 tracking-wider uppercase">Equipped</p>
            <div className="flex flex-wrap gap-1.5">
              {available.map(c => (
                <button
                  key={c}
                  onClick={() => equipCosmetic(c)}
                  className={`text-[10px] px-2.5 py-1 border transition-colors ${
                    state.cosmetic === c
                      ? 'border-[#dfff00]/60 text-[#dfff00] bg-[#dfff00]/10'
                      : 'border-white/25 text-white/55 hover:border-white/40'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
