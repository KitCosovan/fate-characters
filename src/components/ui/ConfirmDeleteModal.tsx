// src/components/ui/ConfirmDeleteModal.tsx
import { useTranslation } from 'react-i18next'
import Modal from './Modal'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  name?: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, name }: ConfirmDeleteModalProps) {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modal.delete_title')} confirmLabel={t('common.delete')} onConfirm={onConfirm} confirmVariant="danger">
      <p style={{ margin: 0 }}>
        {name
          ? <>{t('modal.delete_named', { name })} </>
          : t('modal.delete_forever')
        }
      </p>
    </Modal>
  )
}
