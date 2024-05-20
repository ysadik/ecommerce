'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '../ui/modal'

export const StoreModal = () => {
  const storeModal = useStoreModal()

  return (
    <Modal
      title="Store Modal"
      description="Create your store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create store
    </Modal>
  )
}
