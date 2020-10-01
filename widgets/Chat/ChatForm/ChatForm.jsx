import { useState } from 'react';
import { socket } from '../Socket/socketEvents';

export const ChatForm = ({ lang, user }) => {
  const [value, setValue] = useState('');
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };
  const sendValue = () => {
    socket.emit('testValue', value);
  };
  return (
    <div className="w-cht-wr w100">
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button
        onClick={sendValue}
      >
        SEND
      </button>
    </div>
  );
};
