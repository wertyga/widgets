import { getStorage } from 'utils';
import axios from 'axios';
import { config } from '../config/config';

export const uploadData = async ({ images, ...rest }) => {
  const formData = new FormData();
  const { token } = getStorage();

  images.forEach((file, i) => {
    formData.append(`file-${i}`, file);
  });

  formData.append('reviewsData', JSON.stringify(rest));

  try {
    const { data } = await axios({
      url: `${process.env.API_GATEWAY}/reviews/post`,
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: formData,
    });

    return data;
  } catch (e) {
    throw e.response.data;
  }
};
