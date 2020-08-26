import axios from 'axios';
import { useEffect, useState, memo } from 'react';
import classnames from 'classnames';

import { fetchReviews } from 'widgets/api/reviews';

import { ReviewModal } from '../ReviewModal/ReviewModal';
import { TotalReviews } from '../TotalReviews/TotalReviews';
import { ReviewList } from '../ReviewList/ReviewList';
import { ReviewLoadMore } from '../ReviewLoadMore/ReviewLoadMore';
import { Button } from '../../components';
import { PencilIcon } from '../../components/Icons';

import {btn, gfTotalReviews } from '../../config/lang';
import { getAfterSaveMessage, closeModalTime } from './helpers';

import './styles.css';

const MOBILE_WIDTH = 600;

if (typeof window !== 'undefined') {
  const widgetConfig = window.W_widgets || {};
  axios.defaults.headers['Authorization'] = `Bearer ${widgetConfig.token}`;
}

export const ReviewsForm = memo(({ lang, user }) => {
  const [modalOpened, setModal] = useState(false);
  const [state, setState] = useState({
    reviews: [],
    commonRating: false,
    totalCount: Infinity,
    totalRating: {},
    pending: false,
    error: '',
    mobile: document.querySelector('[w-data="reviews"]').offsetWidth <= MOBILE_WIDTH,
    message: '',
  });

  const modalOpen = () => setModal(true);
  const modalClose = () => setModal(false);

  const onSubmit = ({ review, totalCount, totalRating }) => {
    const afterLoadMessage = getAfterSaveMessage(review, lang);
    setState(prev => ({
      ...prev,
      reviews: !review.allowed ? prev.reviews : [review, ...prev.reviews],
      commonRating: review.commonRating,
      totalCount: totalCount,
      totalRating: { ...prev.totalRating, ...totalRating },
      message: afterLoadMessage,
    }));
    setTimeout(() => {
      modalClose();
    }, closeModalTime(afterLoadMessage));
  };

  const getReviews = async () => {
    try {
      setState(prev => ({ ...prev, pending: true }));
      const href = window.location.href.split('?')[0];
      const offset = state.reviews.length;
      const { data: { commonRating, reviews, totalCount, totalRating } } =
        await fetchReviews({ href, offset });

      setState(prev => ({
        ...prev,
        reviews: [...prev.reviews, ...reviews],
        commonRating,
        totalCount,
        totalRating,
        pending: false,
      }));
    } catch (e) {
      setState(prev => ({ ...prev, pending: false, error: e.response.data.global }));
    }
  };

  const onCommentSubmit = async (commentId, data) => {
    const updatedList = state.reviews.map(item => {
      if(item._id === commentId) {
        return { ...item, subComment: [...item.subComment, data] }
      }
      return item;
    });
    setState(prev => ({ ...prev, reviews: updatedList }));
  };

  useEffect(() => {
    getReviews();
  }, []);

  if (state.commonRating === false) return null;
  return (
    <div className={classnames('w-rf-wr w-100', { mobile: state.mobile })}>
      <div className="w-rf-h w-100 justify-between align-start mb-8">
        <TotalReviews
          commonRating={state.commonRating}
          totalRating={state.totalRating}
          totalCount={state.totalCount}
          lang={lang}
        />

        <Button
          onClick={modalOpen}
          className="w-rf__lay-rv-btn"
        >
          <div className="w-rf-ly-btn align-center justify-center">
            <PencilIcon className="mr-2" />
            <span>{btn.layReview[lang]}</span>
          </div>
        </Button>
      </div>

      {state.error && <span className="error">{state.error}</span>}
      {!state.totalCount && <p className="ma-0 w-100 ta-c">{gfTotalReviews.empty[lang]}</p>}

      {modalOpened &&
        <ReviewModal
          onClose={modalClose}
          onSubmit={onSubmit}
          message={state.message}
          user={user}
          lang={lang}
        />
      }

      <ReviewList
        list={state.reviews}
        sort={state.sort}
        onCommentSubmit={onCommentSubmit}
        user={user}
        lang={lang}
      />

      {state.reviews.length < state.totalCount &&
        <ReviewLoadMore
          lang={lang}
          onLoad={getReviews}
        />
      }
    </div>
  );
});
