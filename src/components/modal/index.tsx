import CloseIcon from "../assets/icons/CloseIcon";
import styles from "./style.module.css";

interface ModalProps {
  readonly setModal: (open: boolean) => void;
  readonly title: string | undefined;
  readonly children: React.ReactNode;
}

const Modal = ({ setModal, title, children }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__wrapper}>
        <div className={styles.modal__header}>
          <h4>{title}</h4>
          <span onClick={() => setModal(false)}>
            <CloseIcon />
          </span>
        </div>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
