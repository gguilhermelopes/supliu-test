import { Dispatch, FC, SetStateAction } from "react";
import styles from "./AlbumModal.module.css";
import { Album } from "../Main";

interface AlbumModalProps {
  albumModal: boolean;
  setAlbumModal: Dispatch<SetStateAction<boolean>>;
  albumIndex: number;
  albumId: number;
  data: Album[] | null;
}

const AlbumModal: FC<AlbumModalProps> = ({
  setAlbumModal,
  albumIndex,
  albumId,
  data,
}) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    event.target === event.currentTarget && setAlbumModal(false);
  };

  if (data)
    return (
      <div className={styles.modalContainer} onClick={handleOutsideClick}>
        <div className={styles.modal}>
          <h1>
            {data[albumIndex].name} ({data[albumIndex].year}){albumId}
          </h1>
        </div>
      </div>
    );
};

export default AlbumModal;
