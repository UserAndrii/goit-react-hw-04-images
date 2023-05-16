import { useState } from 'react';
import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';
import Modal from '../Modal';

const ImageGalleryItem = ({ imageURL, alt, largeImage }) => {
  const [largeImageURL, serLargeImageURL] = useState('');

  const handleImageClick = ({ target: { dataset } }) => {
    serLargeImageURL(dataset.largeimg);
  };

  const onCloseModal = () => serLargeImageURL('');

  return (
    <>
      <Item>
        <Image
          onClick={handleImageClick}
          src={imageURL}
          alt={alt}
          data-largeimg={largeImage}
          lazyLoad
        />
      </Item>

      {largeImageURL && (
        <Modal onClose={onCloseModal} largeImageURL={largeImageURL} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageGalleryItem;
