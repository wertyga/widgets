// import { ChatHeadMenu } from '../ChatHeadMenu/ChatHeadMenu';

import './styles.css';

export const ChatHead = ({ onClick }) => {

  return (
    <div className="w-cht-h d-flex justify-end align-center">
      {/*<ChatHeadMenu />*/}
      <span
        onClick={onClick}
        className="pt-4 pb-2 pl-4 pr-4 c-pointer close d-i-flex"
      >
        &times;
      </span>
    </div>
  );
};
