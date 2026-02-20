export function TerminalApp(): React.JSX.Element {
  return (
    <div className="font-mono" style={{ fontSize: '0.75rem' }}>
      <div className="text-green-400 mb-2">
        <span className="text-white">guest@whets</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$</span>
        <span className="text-white ml-2">cat skills.txt</span>
      </div>
      <div className="text-white mb-4 pl-2" style={{ lineHeight: 1.8 }}>
        <div>React / TypeScript / Next.js</div>
        <div>Tailwind CSS / Figma</div>
        <div>Node.js / Supabase</div>
        <div>Design Systems</div>
        <div>UI/UX Design</div>
      </div>
      <div className="text-green-400 mb-2">
        <span className="text-white">guest@whets</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$</span>
        <span className="text-white ml-2">echo $STATUS</span>
      </div>
      <div className="text-white mb-4 pl-2">
        Available for work
      </div>
      <div className="text-green-400">
        <span className="text-white">guest@whets</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$</span>
        <span className="inline-block w-2 h-3 bg-white ml-2" style={{ animation: 'blink 1s step-end infinite' }} />
      </div>
    </div>
  )
}
