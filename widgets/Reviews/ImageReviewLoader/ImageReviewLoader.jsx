import { PhotoIcon } from '../../components/Icons';
import { _isEmpty } from '../../../utils';

import './styles.css';

export const ImageReviewLoader = ({ onChange, errors = {} }) => {
  const imageHandle = ({ target: { files } }) => {
    onChange(files[0]);
  };

  return (
    <div className="w-rv-img-upl">
      {!_isEmpty(errors) &&
        <div className="w-rv-img-upl__er-wr flex-column">
          {Object.values(errors).map(value => <span key={value} className="w-rv-img-upl__er">{value}</span>)}
        </div>
      }
      <label htmlFor="w-rv-img">
        <PhotoIcon />
      </label>
      <input
        type="file"
        id="w-rv-img"
        onChange={imageHandle}
      />
    </div>
  );
};
