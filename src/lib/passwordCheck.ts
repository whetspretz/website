const PASSWORD_HASH = '294ffbe98355a6d8d06e616377298f7890cf26fd81295fcc94f092d41d869c27'

export async function verifyPassword(input: string): Promise<boolean> {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex === PASSWORD_HASH
}
