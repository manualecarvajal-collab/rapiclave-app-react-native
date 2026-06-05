import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar en la bóveda...',
}: SearchBarProps) {
  return (
    <div className="searchbar">
      <Search size={16} className="searchbar-icon" />
      <input
        className="searchbar-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  )
}
