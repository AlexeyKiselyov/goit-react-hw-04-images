import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    gallery: [],
    image: null,
    tags: null,
    page: 1,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page,error } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchGallery();
    }
    
    if(error){
      toast.warn(error);
    }    
  } 

  fetchGallery=()=>{
    const { query, page } = this.state;

    this.setState({
      isLoading: true,
      error:null
    });

    requestGallery(query, page).then(response => {        
        if (response.data.hits.length === 0) {
          toast.info('Nothing was find');
          return;
        }
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...response.data.hits],
        }))
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });        
      });    
  }

  onSubmit = queryUpdate => {
    if(this.state.query===queryUpdate){
      toast.info('Try to write something new :)');
      return;
    }
    this.setState({
      query: queryUpdate,
      gallery: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onModalOpen = (imageLarge, tags) => {
    this.setState({
      image: imageLarge,
      tags,
    });
  };

  onCloseModal = () => {
    this.setState({
      image: null,
      tags: null,
    });
  };

  render() {
    const { gallery, image, tags, isLoading } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {gallery.length > 0 && (
          <>
            <ImageGallery>
              <ImageGalleryItem
                gallery={gallery}
                onModalOpen={this.onModalOpen}
              />
            </ImageGallery>
            <Button loadMore={this.loadMore} />
          </>
        )}
        {image && (
          <Modal image={image} tags={tags} onCloseModal={this.onCloseModal} />
        )}
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }
}










// fetchGallery= ()=>{
//   const { query, page } = this.state;
//   try {
//     this.setState({
//       isLoading:true,
//       error: null,
//     });
//     console.log("try");

//     requestGallery(query, page).then(response => {
//       console.log(response);
//       if (response.data.hits.length === 0) {
//         toast.info('Nothing was found');
//         return;
//       }
//       this.setState(prevState => ({
//         gallery: [...prevState.gallery, ...response.data.hits],
//       }));
//     });
//   } catch (error) {
//     console.log('Error');
//     this.setState({ error: error.message });
//   } finally {
//     console.log('Finaly');
//     this.setState({
//       isLoading: false,        
//     });
//   }
// }