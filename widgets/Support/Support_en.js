import { render } from 'react-dom';
import { SupportForm } from './SupportForm/SupportForm';
import { User } from '../../utils/user';

import '../styles.css';
  
const user = new User('support');
render(
  <SupportForm lang="en" user={user} />, 
  document.querySelector('[w-data="support"]'),
);
