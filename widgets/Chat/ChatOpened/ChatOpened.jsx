import { ChatManagerHeader } from '../ChatManagerHeader/ChatManagerHeader';
import { ChatHead } from '../ChatHead/ChatHead';
import { ChatMainField } from '../ChatMainField/ChatMainField';

import './styles.css';

export const ChatOpened = ({ handleToggleOpen, lang, admins }) => {
  return (
    <div className="w-cht-op">
      <div className="w-cht-op__h">
        <ChatHead onClick={handleToggleOpen} />
        <ChatManagerHeader lang={lang} admins={admins} />
      </div>
      <ChatMainField lang={lang} />
    </div>
  );
};
