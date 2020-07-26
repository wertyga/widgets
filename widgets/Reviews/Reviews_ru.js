import { render } from 'react-dom';
import { ReviewsForm } from './ReviewsForm/ReviewsForm';
import { User } from '../../utils/user';

import '../styles.css';
  
const user = new User('reviews');
render(
  <ReviewsForm lang="ru" user={user} />, 
  document.querySelector('[w-data="reviews"]'),
);
