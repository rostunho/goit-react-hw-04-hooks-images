import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

function Modal({ closeModal, setStatus, largeImage, tags }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const stoppingElement = imageRef.current;

    window.addEventListener('keydown', onPressEsc);
    stoppingElement.addEventListener('load', onLoadImage);

    return () => {
      window.removeEventListener('keydown', onPressEsc);
      stoppingElement.removeEventListener('load', onLoadImage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const onPressEsc = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const onLoadImage = () => {
    setStatus('resolved');
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalBox>
        <img ref={imageRef} src={largeImage} alt={tags} />
      </ModalBox>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

export default Modal;
