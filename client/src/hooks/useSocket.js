import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

export const useSocket = () => {
  const socketRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only initialize socket if user is authenticated
    if (user ) {        
      // Initialize socket connection
      socketRef.current = io(import.meta.env.VITE_API || 'http://localhost:3000', {
        auth: {
          userId: user.user._id,
          userName: user.user.name
        },
        transports: ['websocket', 'polling'],
      });

      // Connection event handlers
      socketRef.current.on('connect', () => {
        console.log('Connected to server');
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

      // Cleanup function
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [user]);

  return socketRef.current;
};