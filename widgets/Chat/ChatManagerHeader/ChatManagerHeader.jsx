import { useState, useEffect } from 'react';
import { config } from 'widgets/config/config';

import { chatManager } from '../goldfish';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { getChatMeta } from '../helpers';
import { socket } from '../Socket/socketEvents';

import './styles.css';

export const ChatManagerHeader = ({ lang, admins }) => {
  const [state, setState] = useState({ adminActive: false });

  useEffect(() => {
    socket.on('admin_activity', adminActive => {
      setState(prev => ({ ...prev, adminActive }));
    });
  }, []);

  const {
    supportName,
    supportPosition,
    supportAvatar,
  } = getChatMeta();
  return (
    <div className="w-cht-mh pa-4 d-flex align-center">
      <div className="mr-4 w-cht-mh__ava">
        {!!admins.length && <span className="w-cht-mh__online" />}
        <UserAvatar user={{ avatar: supportAvatar }}/>
      </div>
      <div className="flex-column relative">
        {supportName && <span className="font-bold">{supportName}</span>}
        <span className="w-cht-mh__name font-size-sm">{supportPosition}</span>
        {state.adminActive && <span className="w-cht-mh__tp">{chatManager.typing[lang]}</span>}
      </div>
    </div>
  );
};
