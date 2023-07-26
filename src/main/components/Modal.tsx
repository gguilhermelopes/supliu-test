import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Modal.module.css";
import { Album } from "../Main";

interface ModalProps {
  modalOn: boolean;
  setModalOn: Dispatch<SetStateAction<boolean>>;
  albumIndex: number;
  data: Album[] | null;
}

const Modal: FC<ModalProps> = ({ setModalOn, albumIndex, data }) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    event.target === event.currentTarget && setModalOn(false);
  };

  return (
    <div className={styles.modalContainer} onClick={handleOutsideClick}>
      <div className={styles.modal}>{data && data[albumIndex].name}</div>
    </div>
  );
};

export default Modal;
