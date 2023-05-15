import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {  showModal } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props;
  

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {showModal && (
          <Modal onClose={this.toggleModal} large={largeImageURL} alt={tags} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
