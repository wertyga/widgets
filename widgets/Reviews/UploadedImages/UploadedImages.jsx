import './styles.css';

export const UploadedImages = ({ images, onDelete }) => {
  return (
    <div className="w-rv-img-upled d-flex">
      {images.map((file) => {
        const { name, size } = file;
        return   (
          <div key={size} className="w-rv-img-upled__i relative pa-2">
            <span className="w-rv-img-upled__cl-ic" onClick={onDelete(size, name)}>×</span>
            <img className="w-100" src={URL.createObjectURL(file)} />
          </div>
        );
      })}
    </div>
  );
};
