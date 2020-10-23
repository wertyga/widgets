import { useState, useEffect } from 'react';

import { chatManager } from '../goldfish';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { config } from 'widgets/config/config';

import { socket } from '../Socket/socketEvents';

import './styles.css';

const MANAGER_MOCK = (lang) => ({
  managerName: 'Jim',
  managerDescription: chatManager.mangerDefaultDescription[lang],
  managerAvatar: `${config.serverUrl}/static/b4b.jpg`,
});

export const ChatManagerHeader = ({ lang, admins }) => {
  const [state, setState] = useState({ adminActive: false });

  const { managerName, managerDescription, managerAvatar } = MANAGER_MOCK(lang);

  useEffect(() => {
    socket.on('admin_activity', adminActive => {
      setState(prev => ({ ...prev, adminActive }));
    });
  }, []);

  return (
    <div className="w-cht-mh pb-4 pl-4 pr-4 d-flex align-center">
      <div className="mr-4 w-cht-mh__ava">
        {!!admins.length && <span className="w-cht-mh__online"/>}
        <UserAvatar user={{ avatar: managerAvatar }}/>
      </div>
      <div className="flex-column relative">
        {managerName && <span className="font-bold">{managerName}</span>}
        <span className="w-cht-mh__name font-size-sm">{managerDescription}</span>
        {state.adminActive && <span className="w-cht-mh__tp">{chatManager.typing[lang]}</span>}
      </div>
    </div>
  );
};
