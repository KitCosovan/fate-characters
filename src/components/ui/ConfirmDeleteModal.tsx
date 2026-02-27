import Modal from './Modal'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  name?: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, name }: ConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить персонажа?"
      confirmLabel="Удалить"
      onConfirm={onConfirm}
      confirmVariant="danger"
    >
      <p style={{ margin: 0 }}>
        {name
          ? <>Персонаж <strong style={{ color: 'var(--text)' }}>{name}</strong> будет удалён навсегда.</>
          : 'Это действие нельзя отменить.'
        }
      </p>
    </Modal>
  )
}