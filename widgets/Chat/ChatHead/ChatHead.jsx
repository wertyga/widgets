import { ChatHeadMenu } from '../ChatHeadMenu/ChatHeadMenu';

import './styles.css';

export const ChatHead = ({ onClick }) => {

  return (
    <div className="w-cht-h">
      <ChatHeadMenu />
      <span
        onClick={onClick}
        className="pa-4 c-pointer"
      >
        x
      </span>
    </div>
  );
};
