import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import {Overlay,ModalStyled, } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { large, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <div>
          <ModalStyled src={large} alt={tags} />
        </div>
      </Overlay>,
      modalRoot
    );
  }
}
export default Modal;

Modal.propTypes = {
  large: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};

