import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Loader } from '../Loader/Loader';
import s from './Modal.module.css';
// =================================

export const Modal = ({ onCloseModal, image, tags }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onEscClose = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onEscClose);
    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  }, [onCloseModal]);

  const handleModal = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  const hendleLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <div className={s.overlay} onClick={handleModal}>
        <div className={s.modal}>
          <img
            className={s.img}
            onLoad={hendleLoaded}
            style={{display: loaded?"block":"none"}}
            src={image}
            alt={tags}
            width="980"
          />
        </div>
      </div>
      {!loaded && <Loader />}
    </>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
