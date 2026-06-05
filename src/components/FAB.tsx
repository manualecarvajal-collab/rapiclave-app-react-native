import { Plus } from 'lucide-react'

interface FABProps {
  onPress: () => void
}

export default function FAB({ onPress }: FABProps) {
  return (
    <button className="fab" onClick={onPress}>
      <Plus size={26} />
    </button>
  )
}
