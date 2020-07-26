import { common } from '../../config/lang';
import { Button } from 'widgets/components/Button/Button';

export const ReviewLoadMore = ({ lang, onLoad }) => {
  return (
    <Button
      className="w-100"
      onClick={onLoad}
    >
      {common.loadMore[lang]}
    </Button>
  );
};
