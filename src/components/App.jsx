import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestGallery } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import s from './App.module.css';
// =====================================

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchGallery = () => {
      setIsLoading(true);
      setError(null);
  
      requestGallery(query, page)
        .then(response => {
          if (response.data.hits.length === 0) {
            toast.info('Nothing was find');
            return;
          }
          setGallery(pGallery => [...pGallery, ...response.data.hits]);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    
    fetchGallery();
  }, [query, page]);

  useEffect(() => {
    toast.warn(error);
  }, [error]);

  const onSubmit = queryUpdate => {
    if (query === queryUpdate) {
      toast.info('Try to write something new :)');
      return;
    }
    setQuery(queryUpdate);
    setGallery([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(pPage => pPage + 1);
  };

  const onModalOpen = (imageLarge, tags) => {
    setImage(imageLarge);
    setTags(tags);
  };

  const onCloseModal = () => {
    setImage(null);
    setTags(null);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {gallery.length > 0 && (
        <>
          <ImageGallery>
            <ImageGalleryItem gallery={gallery} onModalOpen={onModalOpen} />
          </ImageGallery>
          <Button loadMore={loadMore} />
        </>
      )}
      {image && <Modal image={image} tags={tags} onCloseModal={onCloseModal} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
