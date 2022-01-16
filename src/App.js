import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import API from './services/api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Loader';
import { AppContainer } from './App.styled';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [currentTags, setcurrentTags] = useState(null);
  const [lagreImageURL, setLagreImageURL] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    if (page === 1) {
      setImages([]);
    }

    setStatus('pending');
    API.fetchImages(query, page)
      .then(newImages => {
        if (newImages.hits.length === 0 && images.length === 0) {
          setStatus('rejected');
          return toast.error(`There is no pictures of "${query}"`, {
            autoClose: 3000,
          });
        }

        if (newImages.hits.length === 0 && images.length !== 0) {
          setStatus('rejected');
          return toast.info(`There are all pictures of "${query}"`, {
            autoClose: 3000,
          });
        }

        setImages(prevImages => [...prevImages, ...newImages.hits]);
        setStatus('resolved');
        if (page > 1) {
          scrollToBottom();
        }
      })
      .catch(error => {
        setStatus('rejected');
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const toNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = event => {
    setShowModal(true);
    setLagreImageURL(event.target.dataset.src);
    setcurrentTags(event.target.dataset.alt);
    setStatus('pending');
  };

  const closeModal = () => {
    setShowModal(false);
    setLagreImageURL(null);
    setcurrentTags(null);
  };

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  const spinnerOverlayColor = showModal ? 'transparent' : 'rgba(0, 0, 0, 0.5)';

  return (
    <AppContainer>
      <Searchbar setQuery={setQuery} setPage={setPage} setImages={setImages} />
      <ImageGallery
        images={images}
        nextPage={toNextPage}
        setStatus={setStatus}
        openModal={openModal}
      />
      {showModal && (
        <Modal
          closeModal={closeModal}
          setStatus={setStatus}
          largeImage={lagreImageURL}
          tags={currentTags}
        />
      )}
      {status === 'pending' && <Spinner bgColor={spinnerOverlayColor} />}
      <ToastContainer />
    </AppContainer>
  );
}

export default App;
