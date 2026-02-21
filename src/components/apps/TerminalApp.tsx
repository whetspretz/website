import { useState, useRef, useEffect, useCallback } from 'react'

// ── ASCII art pool (3-5 lines each) ──
const ASCII_ART: string[] = [
  // Cat
  ` /\\_/\\
( o.o )
 > ^ <`,
  // Rocket
  `   /\\
  /  \\
 /    \\
|  ()  |
|______|
  \\  /
   \\/`,
  // Coffee
  `  ( (
   ) )
 .______.
 |      |]
 |      |
 \\______/`,
  // Skull
  `  _____
 /     \\
| () () |
|   ^   |
|  \\_/  |
 \\_____/`,
  // Fish
  `  /\\  /\\
 /  \\/  \\
<  (o>   >
 \\  /\\  /
  \\/  \\/`,
  // Cactus
  `   |
  \\|/
   |
  /|\\
   |
  _|_`,
  // Ghost
  `  .-.
 ( o o)
 |  O  |
 | ||| |
 ' ' ' '`,
  // Heart
  `  ** **
 *    *
  *  *
   **
   *`,
  // UFO
  `    ___
 __/   \\__
/  o   o  \\
\\____^____/
   /|||\\`,
  // Music note
  `  ♪
  |
  |
 /|
(_|`,
]

const WRONG_RESPONSES = [
  'Nope.',
  'Not even close.',
  'Try harder.',
  'Interesting guess... but no.',
  'Wrong.',
  'Hmm, nah.',
  'Keep trying.',
  'Bold guess. Still wrong.',
  'That ain\'t it.',
  'Nice try though.',
]

interface Line {
  type: 'prompt' | 'output' | 'ascii'
  content: string
}

const INITIAL_LINES: Line[] = [
  { type: 'prompt', content: 'cat skills.txt' },
  { type: 'output', content: '  React / TypeScript / Next.js\n  Tailwind CSS / Figma\n  Node.js / Supabase\n  Design Systems\n  UI/UX Design' },
  { type: 'prompt', content: 'echo $STATUS' },
  { type: 'output', content: '  Available for work' },
]

function pickRandom(pool: string[], count: number, exclude: string[]): string[] {
  const available = pool.filter(a => !exclude.includes(a))
  const picks: string[] = []
  const copy = [...available]
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length)
    picks.push(copy[idx])
    copy.splice(idx, 1)
  }
  return picks
}

function Prompt({ command, children }: { command?: string; children?: React.ReactNode }): React.JSX.Element {
  return (
    <div>
      <span className="text-white">guest@whets</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$ </span>
      {command && <span className="text-white">{command}</span>}
      {children}
    </div>
  )
}

export function TerminalApp(): React.JSX.Element {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const [riddleActive, setRiddleActive] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const wrongIndexRef = useRef(0)
  const lastArtsRef = useRef<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Subtle nudge: show hint after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hintDismissed) setShowHint(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [hintDismissed])

  // Auto-hide hint after 4s
  useEffect(() => {
    if (!showHint) return
    const timer = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(timer)
  }, [showHint])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    setShowHint(false)
    setHintDismissed(true)

    const newLines: Line[] = [{ type: 'prompt', content: input }]

    if (cmd === 'riddle me') {
      const arts = pickRandom(ASCII_ART, 3, lastArtsRef.current)
      lastArtsRef.current = arts
      newLines.push({ type: 'output', content: '  solve the riddle to win!' })
      arts.forEach(art => {
        newLines.push({ type: 'ascii', content: art })
      })
      setRiddleActive(true)
    } else if (cmd === 'clear') {
      setInput('')
      setLines(INITIAL_LINES)
      setRiddleActive(false)
      return
    } else if (riddleActive) {
      const response = WRONG_RESPONSES[wrongIndexRef.current % WRONG_RESPONSES.length]
      wrongIndexRef.current++
      newLines.push({ type: 'output', content: `  ${response}` })
    } else {
      newLines.push({ type: 'output', content: `  command not found. try 'riddle me'` })
    }

    setLines(prev => [...prev, ...newLines])
    setInput('')
  }, [input, riddleActive])

  return (
    <div
      className="font-mono h-full"
      style={{ fontSize: '0.75rem' }}
      onClick={focusInput}
    >
      {/* History */}
      {lines.map((line, i) => {
        if (line.type === 'prompt') {
          return <Prompt key={i} command={line.content} />
        }
        if (line.type === 'ascii') {
          return (
            <pre
              key={i}
              className="text-[#dfff00] my-2 ml-4"
              style={{ fontSize: '0.65rem', lineHeight: 1.3 }}
            >
              {line.content}
            </pre>
          )
        }
        return (
          <div key={i} className="text-white mb-1" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {line.content}
          </div>
        )
      })}

      {/* Active prompt with input */}
      <Prompt>
        <form onSubmit={handleSubmit} className="inline">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => {
              setInput(e.target.value)
              if (showHint) {
                setShowHint(false)
                setHintDismissed(true)
              }
            }}
            className="bg-transparent border-none outline-none text-white font-mono p-0 m-0"
            style={{ fontSize: '0.75rem', width: `${Math.max(1, input.length + 1)}ch`, caretColor: 'white' }}
            autoComplete="off"
            spellCheck={false}
          />
        </form>
        {!input && (
          <span
            className="inline-block w-2 h-3 bg-white"
            style={{ animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }}
          />
        )}
        {showHint && !input && (
          <span
            className="text-white/30 ml-3"
            style={{ animation: 'fadeInOut 4s ease forwards', fontSize: '0.7rem' }}
          >
            type something...
          </span>
        )}
      </Prompt>

      <div ref={bottomRef} />
    </div>
  )
}
