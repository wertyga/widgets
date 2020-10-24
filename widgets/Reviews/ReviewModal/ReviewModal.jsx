import { useState } from 'react';
import classnames from 'classnames';
import { common, errors } from 'widgets/config/lang';
import { Input } from 'widgets/components';
import { gfCommon } from '../goldfish';

import { uploadData } from 'widgets/api/reviews';

import { PhotoIcon } from '../../components/Icons';
import { StarsReview } from '../StarsReview/StarsReview';
import { ModalUser } from '../ModalUser/ModalUser';
import { ImageReviewLoader } from '../ImageReviewLoader/ImageReviewLoader';
import { UploadedImages } from '../UploadedImages/UploadedImages';

import { checkPublishData, checkImage } from './helpers';

import './styles.css';

const MAX_IMAGES = 5;

export const ReviewModal = ({ onClose, onSubmit, user: propUser, lang, message }) => {
  const [state, setState] = useState({
    advantages: '',
    disAdvantages: '',
    comments: '',
    images: [],
    user: propUser.get(),
    rating: 0,
    errors: {},
    loading: false,
  });

  const handleEstimate = (rating) => setState({ ...state, rating, errors: {} });
  const handleChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: value, errors: {} })
  };

  const onPublish = async () => {
    const { advantages, disAdvantages, user, rating } = state;
    const { isValid, errors } = checkPublishData({ advantages, disAdvantages, user, rating }, lang);
    if (!isValid) return setState({ ...state, errors });

    const { errors: stateErrors, loading, ...restData } = state;
    const { href, origin } = window.location;

    try {
      setState(prev => ({ ...prev, loading: true, errors: {} }));
      const review = await uploadData({ ...restData, href: href.split('?')[0], origin });

      onSubmit(review);
    } catch (e) {
      setState(prev => ({ ...prev, loading: false, errors: e }));
    }
  }

  const imageHandler = (file) => {
    if (!file) {
      return setState(prev => ({ ...prev, errors: {} }));
    }
    const { isValid, errors: imageErrors } = checkImage(file, lang);
    if (!isValid) return setState({ ...state, errors: { ...state.errors, image: imageErrors  } });

    const images = [...state.images, file];
    if (images.length > MAX_IMAGES) return setState({ ...state, errors: { image: errors.imageLength[lang] } });
    setState({ ...state, images, errors: {} });
  };

  const handleDeleteImage = (size, name) => () => {
    const images = state.images.filter(item => item.size !== size && item.name !== name);
    setState({ ...state, images, errors: {} });
  };

  const handleUserChangeInput = (user) => setState({ ...state, user });
  const dropUser = () => {
    propUser.remove();
    setState({ ...state, user: false });
  };

  const { advantages, disAdvantages, comments, images, errors: stateErrors, user, loading } = state;
  return (
    <div className="w-rv-md">
      <div className={classnames('w-rv-md__c', { 'w-loading': loading })}>

        {stateErrors.global && <span className="error">{stateErrors.global}</span>}
        {message && <p className="w-100 ta-c font-light">{message}</p>}

        <div className="mb-4">
          <p>{common.value[lang]}</p>
          <StarsReview onChange={handleEstimate} error={stateErrors.rating} className="d-i-flex-i" />
        </div>
        <span onClick={onClose} className="w-rv-md-ci">×</span>

        <div className="w-100 relative mb-4 w-rv-md-ints">
          <ImageReviewLoader
            onChange={imageHandler}
            errors={stateErrors.image}
            id="review-images"
            className="w-rv__urm"
          >
            <PhotoIcon />
          </ImageReviewLoader>
          <Input
            className="mb-4"
            value={advantages}
            onChange={handleChange}
            name="advantages"
            placeholder={`${gfCommon.advantages[lang]}...`}
            error={stateErrors.advantages}
          />
          <Input
            className="mb-4"
            value={disAdvantages}
            onChange={handleChange}
            name="disAdvantages"
            placeholder={`${gfCommon.disAdvantages[lang]}...`}
            error={stateErrors.disAdvantages}
          />

          {!!images.length && <UploadedImages images={images} onDelete={handleDeleteImage}/>}

          <Input
            className="mb-4"
            value={comments}
            onChange={handleChange}
            name="comments"
            textarea
            placeholder={`${gfCommon.comments[lang]}...`}
          />
        </div>

        <ModalUser
          onPublish={onPublish}
          user={user}
          propUser={propUser}
          dropUser={dropUser}
          handleUserChangeInput={handleUserChangeInput}
          userError={stateErrors.user}
          lang={lang}
        />
      </div>
    </div>
  );
};
