export function LinksApp(): React.JSX.Element {
  const links = [
    { label: 'Simple Browser', url: '#' }, // TODO: replace with your live demo or repo URL
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Twitter / X', url: '#' },
    { label: 'Dribbble', url: '#' },
  ]

  return (
    <div className="font-mono">
      <span className="text-white uppercase block mb-4" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
        Links & Socials
      </span>
      {links.map(link => (
        <a
          key={link.label}
          href={link.url}
          className="flex items-center gap-3 py-3 text-white hover:text-white transition-colors"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.8rem', textDecoration: 'none' }}
        >
          <span className="text-white">&rarr;</span>
          <span>{link.label}</span>
        </a>
      ))}
      <div className="mt-4 text-white" style={{ fontSize: '0.6rem' }}>
        placeholder — update links later
      </div>
    </div>
  )
}
