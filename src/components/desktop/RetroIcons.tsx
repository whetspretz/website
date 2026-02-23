interface IconProps {
  size?: number
}

export function FolderIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Folder tab */}
      <rect x="4" y="10" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Folder body */}
      <rect x="4" y="14" width="40" height="26" rx="1" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Folder crease line */}
      <line x1="4" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function AboutIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monitor body */}
      <rect x="6" y="4" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Screen inner */}
      <rect x="10" y="8" width="28" height="20" stroke="currentColor" strokeWidth="1" className="icon-fill" fill="white" />
      {/* Stand */}
      <line x1="18" y1="32" x2="18" y2="40" stroke="currentColor" strokeWidth="2.5" />
      <line x1="30" y1="32" x2="30" y2="40" stroke="currentColor" strokeWidth="2.5" />
      {/* Base */}
      <line x1="12" y1="40" x2="36" y2="40" stroke="currentColor" strokeWidth="2.5" />
      {/* Dots on screen - command prompt style */}
      <text x="14" y="20" fill="currentColor" fontFamily="monospace" fontSize="8" fontWeight="bold">&gt;_</text>
    </svg>
  )
}

export function TerminalIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Terminal window */}
      <rect x="4" y="6" width="40" height="36" rx="1" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Title bar */}
      <line x1="4" y1="14" x2="44" y2="14" stroke="currentColor" strokeWidth="2" />
      {/* Title bar dots */}
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="16" cy="10" r="2" fill="currentColor" />
      {/* Prompt arrow */}
      <polyline points="12,22 18,26 12,30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cursor line */}
      <line x1="22" y1="26" x2="34" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function GlobeIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Vertical ellipse */}
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Horizontal lines */}
      <line x1="6" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="1.5" />
      {/* Equator */}
      <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  )
}

export function PaperIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paper body with folded corner */}
      <path d="M10 4 H32 L38 10 V44 H10 Z" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Corner fold */}
      <path d="M32 4 V10 H38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
      {/* Text lines */}
      <line x1="16" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function CatIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cat head */}
      <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Left ear */}
      <path d="M14 16 L10 4 L18 12" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Right ear */}
      <path d="M34 16 L38 4 L30 12" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="19" cy="24" r="2" fill="currentColor" />
      <circle cx="29" cy="24" r="2" fill="currentColor" />
      {/* Nose */}
      <path d="M24 29 L22 31 L26 31 Z" fill="currentColor" />
      {/* Whiskers */}
      <line x1="10" y1="28" x2="18" y2="29" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="32" x2="18" y2="31" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="29" x2="38" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="31" x2="38" y2="32" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function MusicIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Note stem */}
      <line x1="32" y1="8" x2="32" y2="34" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="12" x2="16" y2="38" stroke="currentColor" strokeWidth="2.5" />
      {/* Beam connecting stems */}
      <line x1="16" y1="12" x2="32" y2="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="18" x2="32" y2="14" stroke="currentColor" strokeWidth="2.5" />
      {/* Left note head */}
      <ellipse cx="12" cy="38" rx="5" ry="4" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" transform="rotate(-20 12 38)" />
      {/* Right note head */}
      <ellipse cx="28" cy="34" rx="5" ry="4" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" transform="rotate(-20 28 34)" />
    </svg>
  )
}

export function PaintIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Palette body */}
      <path d="M24 6 C12 6 4 14 4 24 C4 34 12 42 22 42 C24 42 26 40 26 38 C26 36 24 34 24 32 C24 28 28 26 32 26 C34 26 36 26 38 24 C42 18 38 6 24 6 Z" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Paint blobs */}
      <circle cx="16" cy="18" r="3" fill="currentColor" />
      <circle cx="24" cy="14" r="2.5" fill="currentColor" />
      <circle cx="32" cy="18" r="2.5" fill="currentColor" />
      <circle cx="14" cy="28" r="2.5" fill="currentColor" />
    </svg>
  )
}

export function WritingIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pencil body */}
      <path d="M8 40 L6 42 L10 42 L38 14 L34 10 Z" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Pencil tip divide */}
      <line x1="12" y1="36" x2="14" y2="34" stroke="currentColor" strokeWidth="1.5" />
      {/* Eraser band */}
      <line x1="34" y1="10" x2="38" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pencil top / eraser */}
      <path d="M34 10 L38 6 L42 10 L38 14" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Writing lines */}
      <line x1="18" y1="42" x2="42" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="38" x2="42" y2="38" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function HeartIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 42 C20 38 4 28 4 18 C4 11 9 6 16 6 C20 6 23 8 24 10 C25 8 28 6 32 6 C39 6 44 11 44 18 C44 28 28 38 24 42 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        className="icon-fill"
        fill="white"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ResumeIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paper body with folded corner */}
      <path d="M10 4 H32 L38 10 V44 H10 Z" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Corner fold */}
      <path d="M32 4 V10 H38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
      {/* Download arrow */}
      <line x1="24" y1="18" x2="24" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="18,29 24,35 30,29" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Base line */}
      <line x1="16" y1="38" x2="32" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function TrashIcon({ size = 48 }: IconProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lid */}
      <rect x="8" y="8" width="32" height="4" rx="1" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" />
      {/* Handle on lid */}
      <rect x="18" y="4" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="2" className="icon-fill" fill="white" />
      {/* Can body */}
      <path d="M10 12 L12 42 H36 L38 12" stroke="currentColor" strokeWidth="2.5" className="icon-fill" fill="white" strokeLinejoin="round" />
      {/* Vertical lines on can */}
      <line x1="18" y1="18" x2="18" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="18" x2="24" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="30" y1="18" x2="30" y2="36" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
