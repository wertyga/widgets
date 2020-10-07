import { ChatManagerHeader } from '../ChatManagerHeader/ChatManagerHeader';
import { ChatHead } from '../ChatHead/ChatHead';
import { ChatMainField } from '../ChatMainField/ChatMainField';

import './styles.css';

export const ChatOpened = ({ handleToggleOpen, lang }) => {
  return (
    <div className="w-cht-op">
      <ChatHead onClick={handleToggleOpen} />
      <ChatManagerHeader lang={lang} />
      <ChatMainField lang={lang} />
    </div>
  );
};
