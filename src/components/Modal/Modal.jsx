import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow, Button, Image } from './Modal.styled';
import Loader from '../Loader';

const modalRoot = document.querySelector('#root-modal');

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleESC = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleESC);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleESC);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow className="modal">
        <Loader />
        <Button type="button" aria-label="Close" onClick={() => onClose()}>
          <AiOutlineCloseSquare size={35} />
        </Button>
        <Image src={largeImageURL} alt="full size images" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handleESC);
//     document.body.style.overflow = 'hidden';
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleESC);
//     document.body.style.overflow = 'auto';
//   }

//   handleESC = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   onCloseModal = () => {
//     this.props.onClose();
//   };

//   render() {
//     const { largeImageURL } = this.props;

//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalWindow className="modal">
//           <Loader />
//           <Button type="button" aria-label="Close" onClick={this.onCloseModal}>
//             <AiOutlineCloseSquare size={35} />
//           </Button>
//           <Image src={largeImageURL} alt="full size images" />
//         </ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
