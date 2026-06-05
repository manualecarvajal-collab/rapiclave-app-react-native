import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#242424',
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" alt="Vite logo" style={{ height: '6em' }} />
        </a>
      </div>
      <h1 style={{ fontSize: '3.2em', lineHeight: 1.1 }}>Vite + React</h1>
      <div style={{ padding: '2em' }}>
        <button onClick={() => setCount((c) => c + 1)} style={{
          borderRadius: 8,
          border: '1px solid transparent',
          padding: '0.6em 1.2em',
          fontSize: '1em',
          fontWeight: 500,
          backgroundColor: '#1a1a1a',
          color: '#fff',
          cursor: 'pointer',
        }}>
          count is {count}
        </button>
      </div>
      <p style={{ color: '#888' }}>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  )
}

export default App
