export function LinksApp(): React.JSX.Element {
  const links = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/matt-whetsell-46b40736/?locale=en_US' }, // TODO: replace with your live demo or repo URL
    { label: 'GitHub', url: 'https://github.com/whetspretz' },
    { label: 'Substack', url: 'https://mattwhetsell.substack.com/' },
    { label: 'My Author Site', url: 'https://mattwhetsell.com/' },
    { label: 'Dribbble', url: 'https://dribbble.com/Whets' },
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
    </div>
  )
}
