import { useState, useEffect, useRef } from 'react';
import { getStorage } from 'utils';
import classnames from 'classnames';
import { _isEmpty } from "utils/lodash";
import { getChatMeta } from 'widgets/Chat/helpers';
import { common } from 'widgets/config/lang/common';
import { PencilIcon } from 'widgets/components/Icons/pencil';
import { TrashIcon } from 'widgets/components/Icons/TrashIcon';

import { socket } from '../Socket/socketEvents';
import { ChatInputField } from '../ChatInputField/ChatInputField';
import { ChatSeparator } from '../ChatSeparator/ChatSeparator';

import './styles.css';

export const ChatMainField = ({ lang }) => {
  const messagesRef = useRef();
  const {
    settings: { chat: { supportGreeting } = {} },
    origin, userId
  } = getStorage();

  const [messages, setMessages] = useState([]);
  const [editValue, setEditValue] = useState({ message: '', index: undefined });

  const sendNewMessage = (message) => {
    setMessages(prev => ([ ...prev, { message, user: true }]));
    socket.emit('user_message', { origin, message, userID: userId });
  };

  const handleSendEditedMessage = (message) => {
    socket.emit('message_edit', { origin, value: message, userID: userId, index: editValue.index });
    setEditValue({ message: '', index: undefined });
  };

  const handleSendMessage = (message) => {
    if (!message) {
      setEditValue({ message: '', index: undefined });
      return;
    }
    const handler = editValue.message ? handleSendEditedMessage : sendNewMessage;
    handler(message);
  };

  const handleEdit = index => () => {
    setEditValue({ message: messages[index].message, index });
  };

  const handleDelete = index => () => {
    socket.emit('message_delete', { origin, userID: userId, index });
    setEditValue({ message: '', index: undefined });
  };

  useEffect(() => {
    socket.on('admin_message', (message, index) => {
      if (index || index === 0) {
        setMessages(prev => (
          prev.map((m, i) => i === index ? { message } : m)
        ));
      } else {
        setMessages(prev => ([...prev, { message }]));
      }
    });
    socket.on('user_messages', ({ messages }) => {
      setMessages(messages || []);
    });
    socket.emit('get_user_messages', { origin, userID: userId })
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages.length]);

  const { supportName } = getChatMeta();
  return (
    <div className="cht__op">
      <div className="cht-mf-in pa-4" ref={messagesRef}>
        <div
          className={classnames('cht-msg d-flex mb-2')}
        >
          <div className="flex-column">
            <span className="font-light mb-2 cht-msg__name">{supportName}</span>
            <span className="cht-msg__msg">{supportGreeting}</span>
          </div>
        </div>

        {messages.map(({ message, user }, i) => {
          const name = user ? common.you[lang] : supportName;
          return (
            <div
              key={`message-${i}`}
              className={classnames('cht-msg d-flex mb-2', { 'cht-msg__user': user })}
            >
              {user &&
                <div className="cht-msg__icns mr-4 align-center">
                  <span onClick={handleEdit(i)}>
                    <PencilIcon className="c-pointer mr-2" size={20} />
                  </span>
                  <span onClick={handleDelete(i)}>
                    <TrashIcon className="c-pointer" size={20} />
                  </span>
                </div>
              }
              <div className="flex-column">
                <span className={classnames('font-light mb-2 cht-msg__name', { 'justify-end': user })}>{`${name}`}</span>
                <span className={classnames('cht-msg__msg', { 'justify-end user': user })}>{message}</span>
              </div>
            </div>
          )
        })}
      </div>
  
      <ChatSeparator />
      <ChatInputField lang={lang} onMessage={handleSendMessage} editValue={editValue.message} />
    </div>
  );
};
