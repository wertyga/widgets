import { useState } from 'react';
import { ReviewSort } from '../ReviewSort/ReviewSort';
import { ReviewListItem } from '../ReviewListItem/ReviewListItem';
import { sort } from './helpers';

export const ReviewList = ({ list, lang, user, onCommentSubmit }) => {
  const [state, setState] = useState({
    itemsOpened: [],
    sort: {
      key: '',
      direction: 1,
    },
  });

  const toggleOpen = id => () => {
    const isExist = state.itemsOpened.find(item => item === id);
    if (!isExist) {
      setState(prev => ({ ...prev, itemsOpened: [...prev.itemsOpened, id] }));
    } else {
      setState(prev => ({ ...prev, itemsOpened: prev.itemsOpened.filter(item => item !== id) }));
    }
  };

  const handleSort = (key) => {
    setState(prev => ({
      ...prev,
      sort: { key, direction: key === prev.sort.key ? -prev.sort.direction : 1 },
    }));
  };

  const sortedReviews = sort(list, state.sort.key, state.sort.direction);
  return (
    <div className="w-rv-lt">
      {!!sortedReviews.length && <ReviewSort lang={lang} handleSort={handleSort} sort={state.sort}/>}

      {sortedReviews.map(item => (
        <ReviewListItem
          key={item._id}
          lang={lang}
          currentUser={user}
          isOpen={state.itemsOpened.includes(item._id)}
          toggleOpen={toggleOpen(item._id)}
          onCommentSubmit={onCommentSubmit}
          {...item}
        />
      ))}
    </div>
  );
};
