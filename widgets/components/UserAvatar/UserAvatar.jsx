import classnames from 'classnames';
import { config } from 'widgets/config/config';

export const UserAvatar = ({ user = {}, className }) => {
  const avatar = user.avatar || `${process.env.SERVER_HOST}/static/anonym.png`;
  return (
    <img className={classnames('avatar', className)} src={avatar} />
  );
};
