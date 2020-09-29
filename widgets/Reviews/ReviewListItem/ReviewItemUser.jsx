import { UserAvatar } from 'widgets/components';
import { convertedDateToSlash } from '~/utils';
import { StarsReview } from '../StarsReview/StarsReview';

export const ReviewItemUser = ({ createdAt, rating, user = {} }) => {
  return (
    <div className="d-flex mb-4">
      <UserAvatar className="mr-4" user={user} />
      <div>
        <div className="mb-2 w-rv-il__rv-us__cnt">
          <span className="font-bold mr-4 font-size-md user-name">{user.name}</span>
          <span className="font-light comment-date">{convertedDateToSlash(createdAt)}</span>
        </div>
        <StarsReview rating={rating} disabled className="d-i-flex-i" />
      </div>
    </div>
  );
};
