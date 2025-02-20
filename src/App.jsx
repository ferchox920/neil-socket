import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { SocketProvider } from './SocketContext';
import LoginComponent from './LoginComponent';


function App() {
  return (
    <SocketProvider>
      <div className="app-container">
        <header>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <h1>Vite + React con Socket.io</h1>
        </header>

        {/* Formulario de Login + Recepción de eventos */}
        <LoginComponent />

        <footer>
          <p>Demostración académica de Login + Socket.io</p>
        </footer>
      </div>
    </SocketProvider>
  );
}

export default App;
