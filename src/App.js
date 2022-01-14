import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import API from './services/api';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';

function App() {
  const [images, setImages] = useState(() => []);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(() => '');

  useEffect(() => {
    if (!query) {
      return;
    }

    if (page === 1) {
      setImages([]);
    }

    API.fetchImages(query, page).then(newImages => {
      // console.log(newImages.hits);
      setImages(prevImages => [...prevImages, ...newImages.hits]);
      if (page > 1) {
        scrollToBottom();
      }
    });
  }, [page, query]);

  const toNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  return (
    <AppContainer>
      <Searchbar setQuery={setQuery} setPage={setPage} />
      <ImageGallery images={images} nextPage={toNextPage} />
      <ToastContainer />
    </AppContainer>
  );
}

export default App;
