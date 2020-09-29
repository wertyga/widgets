import { gfCommon } from '../goldfish';

export const ReviewItemDescription = ({ lang, advantages, disAdvantages, comments }) => {
  return (
    <div className="mb-4 description">
      <div>
        <span className="font-bold font-size-sm mr-2 w-rv-dsc-title">{gfCommon.advantages[lang]}:</span>
        <span className="font-size-sm w-rv-dsc-text">{advantages}</span>
      </div>
      <div>
        <span className="font-bold font-size-sm mr-2 w-rv-dsc-title">{gfCommon.disAdvantages[lang]}:</span>
        <span className="font-size-sm w-rv-dsc-text">{disAdvantages}</span>
      </div>
      {comments &&
        <div>
          <span className="font-bold font-size-sm mr-2 w-rv-dsc-title">{gfCommon.comments[lang]}</span>
          <span className="font-size-sm w-rv-dsc-text">{comments}</span>
        </div>
      }
    </div>
  );
};
