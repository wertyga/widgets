import { useState } from 'react';
import { _isEmpty } from 'utils/lodash';

import { socket } from '../Socket/socketEvents';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { common } from '../../config/lang/common';

export const ChatMainField = ({ lang }) => {
  const [value, setValue] = useState('');

  const onChange = ({ target: { value } }) => setValue(value);

  const handleSendMessage = () => {
    if (_isEmpty(window.W_widgets)) return;

    const { token: domainToken, user } = window.W_widgets;

    socket.emit('user_message', { domainToken, message: value, user });
  };

  return (
    <div className="pl-2 pr-2 mb-2">
      <Input
        value={value}
        onChange={onChange}
      />
      <Button onClick={handleSendMessage}>
        {common.sendOut[lang]}
      </Button>
    </div>
  );
};
