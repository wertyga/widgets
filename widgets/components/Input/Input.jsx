import classnames from 'classnames';

import './styles.css';

export const Input = ({ type = 'text', textarea, value, onChange, error, className, ...rest }) => {
  const Element = textarea ?
    <textarea
      value={value}
      onChange={onChange}
      className="w-inp"
      {...rest}
    /> :
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-inp"
      {...rest}
    />;
  return (
    <div className={classnames('flex-column relative', className)}>
      {Element}
      {error && <span className="w-inp-er">{error}</span>}
    </div>
  );
};
