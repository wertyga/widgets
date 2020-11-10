import { MessageIcon } from 'widgets/components/Icons';

import './styles.css';

export const ChatClosed = ({ handleToggleOpen }) => {
  return (
    <div className="w-cht-cl c-pointer" onClick={handleToggleOpen}>
      <MessageIcon size={30} />
    </div>
  );
};
