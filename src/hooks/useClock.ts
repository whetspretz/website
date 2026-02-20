import { useState, useEffect } from 'react'

function formatTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/New_York',
  })
}

export function useClock(): string {
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime())
    }, 10_000)
    return () => clearInterval(interval)
  }, [])

  return time
}

export function useBattery(): number {
  const [percent, setPercent] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => (prev > 1 ? prev - 1 : 1))
    }, 3_000)
    return () => clearInterval(interval)
  }, [])

  return percent
}
