import { useState, useEffect } from 'react';

import { socket } from '../Socket/socketEvents';
import { ChatClosed } from '../ChatClosed/ChatClosed';
import { ChatOpened } from '../ChatOpened/ChatOpened';

import './styles.css';

export const ChatForm = ({ lang }) => {
  const [state, setState] = useState({
    isOpen: false,
    adminsConnected: [],
  });

  const handleToggleOpen = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  useEffect(() => {
    const { origin, user } = window.W_widgets;
    socket.on('connect', () => {
      socket.emit('user_connect', { userID: user, origin });
      socket.emit('get_admin_connected', { userID: user, origin });
      //
      socket.on(`admin_connected_${origin}`, adminSocketID => {
        setState(prev => ({ ...prev, adminsConnected: adminSocketID }));
      });
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }, []);

  useEffect(() => {
    if (state.isOpen) {
      socket.open();
    } else {
      socket.close();
    }
  }, [state.isOpen]);

  return (
    <div className="w-cht-wr">
      {state.isOpen &&
        <ChatOpened
          handleToggleOpen={handleToggleOpen}
          lang={lang}
          admins={state.adminsConnected}
        />
      }
      {!state.isOpen && <ChatClosed lang={lang} handleToggleOpen={handleToggleOpen} />}
    </div>
  );
};
