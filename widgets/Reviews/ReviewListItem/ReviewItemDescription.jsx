import { gfCommon } from '../goldfish';

export const ReviewItemDescription = ({ lang, advantages, disAdvantages, comments }) => {
  return (
    <div className="mb-4">
      <div>
        <span className="font-bold font-size-sm mr-2">{gfCommon.advantages[lang]}:</span>
        <span className="font-size-sm">{advantages}</span>
      </div>
      <div>
        <span className="font-bold font-size-sm mr-2">{gfCommon.disAdvantages[lang]}:</span>
        <span className="font-size-sm">{disAdvantages}</span>
      </div>
      {comments &&
        <div>
          <span className="font-bold font-size-sm mr-2">{gfCommon.comments[lang]}</span>
          <span className="font-size-sm">{comments}</span>
        </div>
      }
    </div>
  );
};
