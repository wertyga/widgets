import { chatManager } from '../goldfish';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { config } from 'widgets/config/config';

import './styles.css';

const MANAGER_MOCK = (lang) => ({
  managerName: 'Jim',
  managerDescription: chatManager.mangerDefaultDescription[lang],
  managerAvatar: `${config.serverUrl}/static/b4b.jpg`,
});

export const ChatManagerHeader = ({ lang, admins }) => {
  const { managerName, managerDescription, managerAvatar } = MANAGER_MOCK(lang);
  return (
    <div className="w-cht-mh pt-2 pb-4 pl-4 pr-4 d-flex align-center">
      <div className="mr-4 w-cht-mh__ava">
        {!!admins.length && <span className="w-cht-mh__online"/>}
        <UserAvatar user={{ avatar: managerAvatar }}/>
      </div>
      <div className="flex-column">
        {managerName && <span className="font-bold">{managerName}</span>}
        <span className="w-cht-mh__name font-size-sm">{managerDescription}</span>
      </div>
    </div>
  );
};
