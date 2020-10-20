import { useState, useEffect } from 'react';
import { Button, Input } from "widgets/components";
import { common } from "widgets/config/lang";
import { Carret } from 'widgets/components/Icons/Carret';

import './styles.css';

export const ChatInputField = ({ lang, onMessage, editValue }) => {
  const [value, setValue] = useState('');

  const onChange = ({ target: { value: message } }) => setValue(message);

  const onSend = () => {
    onMessage(value);
    setValue('');
  };

  useEffect(() => {
    setValue(editValue);
  }, [editValue]);

  return (
    <div className="cht-inf">
      <Input
        value={value}
        onChange={onChange}
        className="mb-4"
        textarea
        style={{
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',
        }}
      />
      <div onClick={onSend} className="cht-inf__btn">
        <Carret

        />
      </div>
    </div>
  );
};
