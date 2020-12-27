import classnames from 'classnames';
import {Like, Dislike, Comment} from 'widgets/components/Icons';
import { gfCommon } from '../goldfish';
import {ReviewItemToggleRoll} from "./ReviewItemToggleRoll";

export const ReviewItemFooter = ({
                                   like = 0,
                                   dislike = 0,
                                   handleLike,
                                   pending,
                                   lang,
                                   handleOpenComment,
                                   handleOpenSubComment,
                                   isShowSubComments,
                                   isSubCommentsOpen,
                                 }) => {
  return (
    <div>
      <div className={classnames('align-center w-rv-it__f justify-between', { pending })}>
        <div>
        <span
          className="w-rv-itf__lk d-i-flex-i align-center mr-4"
          role="presentation"
          onClick={handleLike.bind(null, 'like')}
        >
          <Like className="mr-2" />
          <span>{like}</span>
        </span>
          <span
            className="w-rv-itf__lk w-rv-itf__dlk d-i-flex-i align-center"
            role="presentation"
            onClick={handleLike.bind(null, 'dislike')}
          >
            <Dislike className="mr-2" />
            <span>{dislike}</span>
          </span>
        </div>

        <div className="align-center">
          <div onClick={handleOpenComment} className="w-rv-it__cm align-center">
            <Comment className="mr-4" />
            <span>{gfCommon.comments[lang]}</span>
          </div>
          {isShowSubComments &&
            <ReviewItemToggleRoll
              lang={lang}
              isOpen={isSubCommentsOpen}
              toggleOpen={handleOpenSubComment}
              className="ml-4"
            />
          }
        </div>
      </div>
    </div>
  );
};
