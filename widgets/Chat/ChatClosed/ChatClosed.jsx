import { chatManager } from '../goldfish';
import {ChatHead} from "../ChatHead/ChatHead";

import './styles.css';

export const ChatClosed = ({ lang, handleToggleOpen }) => {
  const { closeTitle = chatManager.haveQuestions[lang] } = window.W_widgets.chat || {};
  return (
    <div className="w-cht-cl c-pointer pa-4" onClick={handleToggleOpen}>
      <span>{closeTitle}</span>
    </div>
  );
};
