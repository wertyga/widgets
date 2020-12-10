import { useState } from 'react';

import {fetchLike} from 'widgets/api/reviews';

import { ReviewItemUser } from './ReviewItemUser';
import { ReviewItemDescription } from './ReviewItemDescription';
import { ReviewItemImages } from './ReviewItemImages';
import { ReviewItemFooter } from './ReviewItemFooter';
import { ReviewListItemComment } from './ReviewListItemComment';
import { ReviewItemToggleRoll } from './ReviewItemToggleRoll';

import './styles.css';

export const ReviewListItem = ({
                                 lang, currentUser, onCommentSubmit,
                                 toggleOpen, isOpen, subComment,
                               ...props }) => {
  const [state, setState] = useState({
    ...props,
    subOpen: !!subComment && !!subComment.length,
    pending: false,
  });

  const handleLike = async (type) => {
    if (state.pending) return;
    try {
      setState(prev => ({ ...prev, pending: true }));
      const { data: { like, dislike } } = await fetchLike(state._id, type);

      setState(prev => ({ ...prev, like, dislike, pending: false }));
    } catch (e) {
      setState(prev => ({ ...prev, pending: false }));
    }
  };

  const toggleOpenSubComment = () => setState(prev => ({ ...prev, subOpen: !state.subOpen }));

  return (
    <div className="mb-6">
      <div className="w-rv-lti mb-2" id={props._id}>
        <ReviewItemUser lang={lang} {...state} />
        <ReviewItemDescription lang={lang} {...state} />
        <ReviewItemImages lang={lang} {...state} />
        <ReviewItemFooter
          handleLike={handleLike}
          pending={state.pending}
          handleOpenComment={toggleOpen}
          lang={lang}
          {...state}
        />
        {!!subComment.length &&
          <ReviewItemToggleRoll
            lang={lang}
            isOpen={state.subOpen}
            toggleOpen={toggleOpenSubComment}
          />
        }
      </div>

      <ReviewListItemComment
        lang={lang}
        currentUser={currentUser.get()}
        isOpen={isOpen}
        onSubmit={onCommentSubmit}
        toggleOpen={toggleOpen}
        id={props._id}
      />

      {state.subOpen && subComment.map((item) => (
        <ReviewListItemComment
          key={item._id}
          lang={lang}
          currentUser={item.user}
          isOpen
          completed
          {...item}
        />
      ))}
    </div>
  );
};
