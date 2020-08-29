import { useState } from 'react';
import classnames from 'classnames';
import { UserAvatar } from 'widgets/components';
import { Input, Button } from 'widgets/components';
import { common, errors } from 'widgets/config/lang';
import { fetchSubReview } from 'widgets/api/reviews';
import { _noop, convertedDateToSlash } from '~/utils';
import { gfCommon } from '../goldfish';

export const ReviewListItemComment = ({
                                        lang, isOpen, currentUser, onSubmit = _noop,
                                        toggleOpen = _noop, id, text, completed, ...rest
                                      }) => {
  const [comment, setComment] = useState({ value: text, error: '', pending: false });

  const handleComment = ({ target: { value } }) => setComment(prev => ({ ...prev, value, error: '' }));

  const handleSubmit = async () => {
    if (comment.pending) return;
    if (!comment.value) return setComment(prev => ({ ...prev, error: errors.unFilled[lang] }));
    try {
      setComment(prev => ({ ...prev, pending: true }));
      const { data } = await fetchSubReview(id, comment.value, currentUser);

      setComment({ value: '', error: '', pending: false });
      toggleOpen();
      onSubmit(id, data);
    } catch (e) {
      const error = e.response.data.error;
      setComment(prev => ({ ...prev, error, pending: false }));
    }
  };

  const handleClose = () => {
    setComment({ value: '', error: '' });
    toggleOpen();
  };

  if (!isOpen) return null;
  return (
    <div className={classnames('w-rv-il__cm d-flex mb-4', { pending: comment.pending, new: !completed })}>
      <div className="flex-column align-center mr-8 ml-4 w-rv-il__ua">
        <UserAvatar user={currentUser} />
        <span className="font-bold font-size-md">{(currentUser || {}).name || common.anonym[lang]}</span>
      </div>
      {!completed &&
        <div className="w-100 d-flex w-rv-il__cm_new">
          <Input
            className="w-100 mr-8 w-rv-il__int"
            value={comment.value}
            onChange={handleComment}
            textarea
            placeholder={`${gfCommon.comments[lang]}...`}
            error={comment.error}
          />
          <div>
            <Button className="mb-2" onClick={handleSubmit}>
              {common.publish[lang]}
            </Button>
            <Button onClick={handleClose}>
              {common.cancel[lang]}
            </Button>
          </div>
        </div>
      }
      {completed &&
        <p className="w-rv-il__txt flex-column">
          <span className="mb-2 w-rv-il__cm__cat">{convertedDateToSlash(rest.createdAt)}</span>
          <span>{comment.value}</span>
        </p>
      }
    </div>
  );
};
