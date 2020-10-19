import { useState, useEffect } from 'react';
import { Button, Input } from "widgets/components";
import { common } from "widgets/config/lang";


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
      />
      <Button onClick={onSend}>
        {common.sendOut[lang]}
      </Button>
    </div>
  );
};
