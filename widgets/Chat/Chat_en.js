import { render } from 'react-dom';
import { ChatForm } from './ChatForm/ChatForm';
import { User } from '../../utils/user';

import '../styles.css';
  
const user = new User('chat');
render(
  <ChatForm lang="en" user={user} />, 
  document.querySelector('[w-data="chat"]'),
);
