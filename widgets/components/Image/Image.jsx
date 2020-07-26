import { useState } from 'react';
import classnames from 'classnames';

import './styles.css';

export const Image = ({ src, alt, zoom, className }) => {
  const [open, setOpen] = useState(false);

  const toggleZoom = () => {
    if (!zoom) return;
    setOpen(!open)
  };
  return (
    <div
      className={classnames({ zoom }, className)}
      role="presentation"
      onClick={toggleZoom}
    >
      <img src={src} alt={alt} />

      {open &&
        <div className="zi">
          <div className="zi__c">
            <span
              className="zi__ci"
              onClick={toggleZoom}
              role="presentation"
            >
              <span>×</span>
            </span>
            <img src={src} alt={alt} />
          </div>
        </div>
      }
    </div>
  );
};
