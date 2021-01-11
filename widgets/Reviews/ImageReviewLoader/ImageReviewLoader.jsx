// import classnames from 'classnames';
import PropTypes from 'prop-types';
import { _isEmpty } from '../../../utils';

import './styles.css';

export const ImageReviewLoader = ({ onChange, children, className, errors = {}, id }) => {
  const imageHandle = ({ target: { files } }) => {
    onChange(files[0]);
  };

  return (
    <div className={`w-rv-img-upl ${className || ''}`}>
      {!_isEmpty(errors) &&
        <div className="w-rv-img-upl__er-wr flex-column">
          {Object.values(errors).map(value => <span key={value} className="w-rv-img-upl__er">{value}</span>)}
        </div>
      }
      <label htmlFor={id}>
        {children}
      </label>
      <input
        type="file"
        id={id}
        onChange={imageHandle}
      />
    </div>
  );
};

ImageReviewLoader.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  errors: PropTypes.object,
};
