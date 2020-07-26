import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { StarIcon, FilledStarIcon, HalfFilledStartIcon } from '../../components/Icons';
import { _noop } from '../../../utils';

import './styles.css';

export const StarsReview = ({ disabled, rating = 0, error, onChange = _noop, size = 16, className }) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [stableRating, setStableRating] = useState(rating);

  const getIcon = (index) => {
    const rating = currentRating || stableRating;
    if ((rating / index < 1 && index - rating >= 1) || rating === 0) return <StarIcon size={size} />;
    if (rating >= index ) return <FilledStarIcon size={size} />;
    return <HalfFilledStartIcon size={size} />;
  };

  const handleRating = rating => () => {
    if (disabled) return;
    setStableRating(rating);
  };

  const handleHover = rating => () => {
    if (disabled) return;
    setCurrentRating(rating);
    setStableRating(0);
  };

  const resetRating = () => {
    if (disabled) return;
    setCurrentRating(0);
  };

  useEffect(() => {
    onChange(stableRating);
  }, [stableRating]);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  return (
    <div className={classnames('w-sr justify-between align-center flex-column relative', className)} onMouseLeave={resetRating}>
      <div className="w-sr-wr d-flex">
        {new Array(5).fill('').map((_, i) => {
          const rating = currentRating || stableRating;
          return (
            <div
              key={`rating-${i}`}
              className={classnames('w-sr-si', { filled: i + 1 <= rating }, { disabled })}
              onClick={handleRating(i + 1)}
              onMouseEnter={handleHover(i + 1)}
            >
              {getIcon(i + 1)}
            </div>
          )
        })}
      </div>
      {error && <span className="w-sr-er">{error}</span>}
    </div>
  );
};
