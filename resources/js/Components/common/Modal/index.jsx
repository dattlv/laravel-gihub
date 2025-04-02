import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDialogTitle, StyledDialogContent } from './Modal.styles';

export function Modal({
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose,
  children,
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  const maxWidthMap = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': 'lg',
  };

  return (
    <Dialog
      open={show}
      maxWidth={maxWidthMap[maxWidth] || 'lg'}
      fullWidth
      onClose={close}
      aria-labelledby="modal-title"
    >
      {closeable && (
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {children}
    </Dialog>
  );
}

Modal.Title = function ModalTitle({ children }) {
  return <StyledDialogTitle id="modal-title">{children}</StyledDialogTitle>;
};

Modal.Content = function ModalContent({ children }) {
  return <StyledDialogContent>{children}</StyledDialogContent>;
};

Modal.propTypes = {
  show: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  closeable: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.Title.propTypes = {
  children: PropTypes.node.isRequired,
};

Modal.Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
