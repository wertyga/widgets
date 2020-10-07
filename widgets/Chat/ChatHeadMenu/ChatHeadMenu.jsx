import { useState } from 'react';

export const ChatHeadMenu = () => {
  const [opened, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!opened);

  return (
    <div className="w-cht-h__mn pa-4">
      <span
        onClick={toggleOpen}
        className="c-pointer"
      >
        • • •
      </span>
    </div>
  );
};
