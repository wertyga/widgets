import classnames from 'classnames';
import { common as commonLang } from 'widgets/config/lang';
import { Carret } from 'widgets/components/Icons';

export const ReviewItemToggleRoll = ({ lang, isOpen, toggleOpen }) => {
  return (
    <div onClick={toggleOpen} className={classnames('font-size-sm w-rv-il__sub-it', { open: isOpen })}>
      <Carret size={11} />
      {/*<span>{isOpen ? commonLang.rollDown[lang] : commonLang.rollUp[lang]}</span>*/}
    </div>
  );
};
