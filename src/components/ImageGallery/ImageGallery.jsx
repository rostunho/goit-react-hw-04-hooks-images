// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// import API from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { Gallery } from './ImageGallery.styled';
// import Modal from '../Modal/Modal';
// import Spinner from 'components/Loader/Loader';

function ImageGallery({ images, nextPage }) {
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
              // openModal={this.openModal}
            />
          );
        })}
      </Gallery>
      {images.length !== 0 && <Button loadMore={nextPage} />}
      {/* {showModal && (
        <Modal
          closeModal={this.closeModal}
          changeStatus={this.changeStatus}
          largeImage={largeImageURL}
          tags={currentTags}
        />
      )}
      {status === 'pending' && <Spinner bgColor={spinnerOverlayColor} />} */}
    </>
  );
}

export default ImageGallery;
