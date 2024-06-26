import { useState, useEffect } from 'react'

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false)
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return origin
}

// to avoid hydration problems when we use window obj
// it doesn't exist on the server
