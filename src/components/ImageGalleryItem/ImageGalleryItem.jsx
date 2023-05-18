import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({webformatURL, tags, largeImageURL}) => {
  const [showModal, setShowModal] = useState(false);

 const toggleModal = () => {
  setShowModal(prevShowModal => !prevShowModal);
  };

    return (
      <>
        <GalleryItem onClick={toggleModal}>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {showModal && (
          <Modal onClose={toggleModal} large={largeImageURL} alt={tags} />
        )}
      </>
    );
  }


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
