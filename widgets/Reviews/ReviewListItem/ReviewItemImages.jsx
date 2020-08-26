import { Image } from "widgets/components/Image/Image";

import { config } from "widgets/config/config";

export const ReviewItemImages = ({ images }) => {
  return (
    <div className="d-flex w-100">
      {images.map(path => (
        <Image
          className="w-rv-lti__img pa-2"
          key={path}
          src={path}
          zoom
        />
      ))}
    </div>
  );
};
