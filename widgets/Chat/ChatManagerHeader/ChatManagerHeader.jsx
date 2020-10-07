import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { chatManager } from '../goldfish';

import './styles.css';

export const ChatManagerHeader = ({ lang }) => {
  const {
    managerName = 'Jim',
    managerDescription = chatManager.mangerDefaultDescription[lang],
    managerAvatar,
    online,
  } = window.W_widgets.chat || {};
  return (
    <div className="w-cht-mh pa-2 d-flex align-center">
      <div className="mr-4">
        {online && <span className="w-cht-mh__online"/>}
        <UserAvatar user={{ avatar: managerAvatar }}/>
      </div>
      <div className="flex-column">
        {managerName && <span className="font-bold">{managerName}</span>}
        <span className="w-cht-mh__name font-size-sm">{managerDescription}</span>
      </div>
    </div>
  );
};
