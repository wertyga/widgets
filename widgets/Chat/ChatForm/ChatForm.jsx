import { useState, useEffect } from 'react';

import { socket } from '../Socket/socketEvents';
import { ChatClosed } from '../ChatClosed/ChatClosed';
import { ChatOpened } from '../ChatOpened/ChatOpened';

import './styles.css';

export const ChatForm = ({ lang }) => {
  const [state, setState] = useState({ isOpen: false, isConnected: false });

  const handleToggleOpen = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  useEffect(() => {
    if (state.isOpen) {
      socket.on('connect', () => {
        setState(prev => ({ ...prev, isConnected: true }));
      });
      socket.open();
    } else {
      socket.on('disconnect', () => {
        setState(prev => ({ ...prev, isConnected: false }));
      });
      socket.close();
    }
  }, [state.isOpen]);

  return (
    <div className="w-cht-wr w-100">
      {state.isOpen && <ChatOpened handleToggleOpen={handleToggleOpen} lang={lang} />}
      {!state.isOpen && <ChatClosed lang={lang} handleToggleOpen={handleToggleOpen} />}
    </div>
  );
};
