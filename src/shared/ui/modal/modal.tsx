import { ReactNode } from 'react';
import classNames from 'classnames';

import cls from './modal.module.scss';

interface ModalProps {
  children: ReactNode;
  className?: string;
}

function Modal({ children, className }: ModalProps) {
  return (
    <div className={classNames(cls.modalWrapper, className)}>{children}</div>
  );
}

export default Modal;
