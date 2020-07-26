import { useState } from 'react';
import classnames from 'classnames';
import { gfReviewSort } from '../goldfish';

import './styles.css';

export const ReviewSort = ({ lang, handleSort, sort }) => {

  return (
    <div className="w-rv-rs mb-4">
      {gfReviewSort.sortList.map(item => (
        <span
          key={item.key}
          onClick={handleSort.bind(null, item.key)}
          className={classnames('w-rv-rs__it mr-4', { active: sort.key === item.key })}
        >
          {item[lang]}
        </span>
      ))}
    </div>
  );
};
