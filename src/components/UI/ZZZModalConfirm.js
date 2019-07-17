import React from 'react';
import ReactFocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';

import Button from './Button';
import styles from './ModalConfirm.module.scss';

const ModalConfirm = ({
  appt,
  modalOnClose,
  buttonRef,
  modalOnClickAway,
  modalRef,
  children,
}) => {
  return (
    <ReactFocusTrap
      focusTrapOptions={{
        onDeactivate: modalOnClose,
        clickOutsideDeactivates: true,
      }}
    >
      <aside
        onClick={modalOnClickAway}
        tabIndex='-1'
        aria-modal='true'
        className={styles.Cover}
      >
        <div ref={modalRef} className={styles.Container}>
          <div className={styles.Message}>{children}</div>
          <div className={styles.Buttons}>
            <Button
              btnName='Нет'
              btnTypes={['Confirm']}
              clickHandler={(e) => modalOnClose(e, 'cancel')}
              selected={false}
              disabled={false}
              buttonRef={buttonRef}
            />
            <Button
              btnName='Да, отменить!'
              btnTypes={['Confirm']}
              clickHandler={(e) => modalOnClose(e, 'confirm')}
              selected={false}
              disabled={false}
            />
          </div>
        </div>
      </aside>
    </ReactFocusTrap>
  );
};

ModalConfirm.propTypes = {
  appt: PropTypes.object,
  buttonRef: PropTypes.func,
  modalOnClose: PropTypes.func,
  buttonRef: PropTypes.func,
  modalOnClickAway: PropTypes.func,
};

export default ModalConfirm;
