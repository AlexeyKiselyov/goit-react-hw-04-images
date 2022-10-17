import s from './ImageGallery.module.css';
// =====================================

export const ImageGallery = ({children}) => {
  return (
    <>
      <ul className={s.imageGallery}>
      {children}
      </ul>
    </>
  );
};
