import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

type ServerResponse = {
  message: string;
}

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api')
      .then<ServerResponse>((value) => value.json())
      .then(response => setMessage(response.message))
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Server response:
        </p>
        <p>
          {message}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
