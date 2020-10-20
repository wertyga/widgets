import { chatManager } from '../goldfish';
import { MessageIcon } from 'widgets/components/Icons';

import './styles.css';

export const ChatClosed = ({ lang, handleToggleOpen }) => {
  const { closeTitle = chatManager.haveQuestions[lang] } = window.W_widgets.chat || {};
  return (
    <div className="w-cht-cl c-pointer" onClick={handleToggleOpen}>
      <MessageIcon size={30} />
    </div>
  );
};
