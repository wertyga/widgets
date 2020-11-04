import { useState, useEffect } from 'react';

import { chatManager } from '../goldfish';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { config } from 'widgets/config/config';

import { socket } from '../Socket/socketEvents';

import './styles.css';

export const ChatManagerHeader = ({ lang, admins }) => {
  const [state, setState] = useState({ adminActive: false });

  const {
    settings: {
      chat: { support_name, support_position, support_avatar = `${config.serverUrl}/static/support_avatar.png` } = {} },
  } = window.W_widgets;

  useEffect(() => {
    socket.on('admin_activity', adminActive => {
      setState(prev => ({ ...prev, adminActive }));
    });
  }, []);

  return (
    <div className="w-cht-mh pa-4 d-flex align-center">
      <div className="mr-4 w-cht-mh__ava">
        {!!admins.length && <span className="w-cht-mh__online" />}
        <UserAvatar user={{ avatar: support_avatar }}/>
      </div>
      <div className="flex-column relative">
        {support_name && <span className="font-bold">{support_name}</span>}
        <span className="w-cht-mh__name font-size-sm">{support_position}</span>
        {state.adminActive && <span className="w-cht-mh__tp">{chatManager.typing[lang]}</span>}
      </div>
    </div>
  );
};
