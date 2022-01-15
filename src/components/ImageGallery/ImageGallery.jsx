// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// import API from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { Gallery } from './ImageGallery.styled';
// import Modal from '../Modal/Modal';
// import Spinner from 'components/Loader/Loader';

function ImageGallery({ images, nextPage, openModal }) {
  return (
    <>
      <Gallery>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              openModal={openModal}
            />
          );
        })}
      </Gallery>
      {images.length !== 0 && <Button loadMore={nextPage} />}
    </>
  );
}

export default ImageGallery;
