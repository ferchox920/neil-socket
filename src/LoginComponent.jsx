import { useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

export default function LoginComponent() {
  const socket = useSocket();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logins, setLogins] = useState([]); // Para mostrar quién se ha logueado (según eventos)

  // Escuchamos el evento que avisa del login de un usuario
  useEffect(() => {
    if (!socket) return;

    socket.on('user-logged', (userData) => {
      // userData podría ser { id, name, email, etc. }
      setLogins((prev) => [
        ...prev,
        `Se ha logueado: ${userData.name} (ID: ${userData.id})`,
      ]);
    });

    return () => {
      socket.off('user-logged');
    };
  }, [socket]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Ajusta la ruta según tu backend
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Login exitoso. Bienvenido, ${data.data.name}`);
      } else {
        // Manejo de errores desde el servidor
        alert(`Error al iniciar sesión: ${data.message}`);
      }
    } catch (error) {
      console.error('Error en petición de login:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Demostración de Login + Socket.io</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: '10px' }}>
          Iniciar Sesión
        </button>
      </form>

      {/* Mostramos la lista de logins que se han producido (según el evento recibido) */}
      <div style={{ marginTop: '20px' }}>
        <h3>Usuarios Logueados (vía evento)</h3>
        <ul>
          {logins.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
