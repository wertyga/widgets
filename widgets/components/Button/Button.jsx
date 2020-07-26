import './styles.css';

export const Button = ({ onClick, children, className, disabled }) => {
  const handleLoad = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <div className={className}>
      <button
        onClick={handleLoad}
        className="w-btn"
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
