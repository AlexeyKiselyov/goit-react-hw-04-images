import {PropTypes} from 'prop-types';
import s from './ImageGalleryItem.module.css';
// ===========================================

export const ImageGalleryItem = ({ gallery,onModalOpen }) => {
  return (
    <>
      {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className={s.imageGalleryItem} onClick={()=>onModalOpen(largeImageURL,tags)} key={id}>
            <img
              className={s.imageGalleryItemImage}
              src={webformatURL}
              alt={tags}
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes={
  gallery:PropTypes.arrayOf(PropTypes.shape({
    id:PropTypes.number.isRequired,
    webformatURL:PropTypes.string.isRequired,
    tags:PropTypes.string.isRequired,
  })),
  onModalOpen:PropTypes.func.isRequired
}
