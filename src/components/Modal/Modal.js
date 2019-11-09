import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useOutsideClick from 'hooks/useOutsideClick';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import Button from 'components/Button';
import classes from './Modal.module.css';
import './Modal.css';

const Modal = ({ clickOutside, children }) => {
  const ref = useRef();
  useOutsideClick(ref, clickOutside);

  return ReactDOM.createPortal(
    <div className={classes.modal} ref={ref}>
      <Card>{children}</Card>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default Modal;

export const ConfirmModal = ({
  closeModal,
  children,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  isDelete = false,
}) => (
  <Modal clickOutside={closeModal}>
    <Spacer spacing="m">
      {children}
      <FormButtonHolder>
        <Button appearance="secondary" onClick={closeModal}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          appearance={isDelete ? 'warning' : 'primary'}
        >
          {confirmText}
        </Button>
      </FormButtonHolder>
    </Spacer>
  </Modal>
);
