import axios from 'axios';
import { config } from '../config/config';

export const fetchReviews = ({ href, page, offset }) => {
  return (
    axios({
      method: 'get',
      url: `${config.apiGateway}/reviews/get`,
      params: {
        href,
        page,
        offset,
      },
    })
  );
};

export const fetchSubReview = (commentId, text, user) => (
  axios({
    method: 'post',
    url: `${config.apiGateway}/reviews/subreview`,
    data: {
      commentId,
      text,
      user,
    },
  })
);

export const fetchLike = (_id, type) => (
  axios({
    method: 'post',
    url: `${config.apiGateway}/reviews/like`,
    data: {
      _id,
      type,
    },
  })
);

export const uploadData = async ({ images, ...rest }) => {
  const formData = new FormData();

  images.forEach((file, i) => {
    formData.append(`file-${i}`, file);
  });

  formData.append('reviewsData', JSON.stringify(rest));

  try {
    const { data } = await axios({
      url: `${config.apiGateway}/reviews/post`,
      method: 'post',
      data: formData,
    });

    return data;
  } catch (e) {
    throw e.response.data;
  }
};
