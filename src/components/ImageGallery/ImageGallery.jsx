import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { Gallery } from './ImageGallery.styled';

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

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  nextPage: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
