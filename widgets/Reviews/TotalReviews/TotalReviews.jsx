import { StarsReview } from '../StarsReview/StarsReview';
import { gfTotalReviews } from '../../config/lang';

import './styles.css';

export const TotalReviews = ({ lang, totalRating, totalCount, commonRating }) => {
  return (
    <div className="w-rv-tr align-start">
      <div className="w-rv-tr__ls flex-column mr-4">
        <p className="w-rv-tr__cr ma-0 mr-4">{commonRating}</p>
        <StarsReview disabled rating={commonRating} />
        <p className="ma-0">{gfTotalReviews.totalCount[lang](totalCount)}</p>
      </div>

      {!!totalCount &&
        <div className="w-rv-tr__tr">
          {Object.entries(totalRating).map(([key, value]) => (
            <div className="d-flex align-center" key={key}>
              <StarsReview disabled rating={key} size={10} className="mr-2" />
              <span>{gfTotalReviews.totalRating[lang](value)}</span>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
