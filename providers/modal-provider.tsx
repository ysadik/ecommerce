'use client'

import { useState, useEffect } from 'react'

import { StoreModal } from '@/components/modals/store-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
    </>
  )
}

// this code is to avoid hydration error (client rendering doesn't match server rendering)
// while on ssr return null
