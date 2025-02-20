import { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

// Creamos el contexto
const SocketContext = createContext(null);

// Hook para consumir el contexto
export const useSocket = () => useContext(SocketContext);

// Proveedor que maneja la conexión al Socket
// eslint-disable-next-line react/prop-types
export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Ajusta según tu backend
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
