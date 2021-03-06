import { Image } from "widgets/components/Image/Image";

export const ReviewItemImages = ({ images }) => {
  return (
    <div className="d-flex w-100">
      {images.map(path => (
        <Image
          className="w-rv-lti__img pr-2 pt-2 pb-2"
          key={path}
          src={path}
          zoom
        />
      ))}
    </div>
  );
};
