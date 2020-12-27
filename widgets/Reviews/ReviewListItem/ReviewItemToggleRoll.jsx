import classnames from 'classnames';
import { Carret } from 'widgets/components/Icons';

export const ReviewItemToggleRoll = ({ isOpen, toggleOpen, className }) => {
  return (
    <div
      onClick={toggleOpen}
      className={classnames('font-size-sm w-rv-il__sub-it', { open: isOpen }, className)}
    >
      <Carret size={11} />
    </div>
  );
};
