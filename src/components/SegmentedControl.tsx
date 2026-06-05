interface Segment {
  key: string
  label: string
}

const SEGMENTS: Segment[] = [
  { key: 'all', label: 'Todas' },
  { key: 'passkeys', label: 'Passkeys' },
  { key: 'passwords', label: 'Contraseñas' },
]

interface SegmentedControlProps {
  selected: string
  onSelect: (key: string) => void
}

export default function SegmentedControl({
  selected,
  onSelect,
}: SegmentedControlProps) {
  return (
    <div className="segmented">
      {SEGMENTS.map((seg) => {
        const isActive = seg.key === selected
        return (
          <button
            key={seg.key}
            className={`segmented-item${isActive ? ' active' : ''}`}
            onClick={() => onSelect(seg.key)}
          >
            {seg.label}
          </button>
        )
      })}
    </div>
  )
}
