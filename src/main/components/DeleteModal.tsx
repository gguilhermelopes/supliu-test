import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./DeleteModal.module.css";
import axiosInstance from "../../lib/axios";

interface DeleteModalProps {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  id?: number;
  isAlbum?: boolean;
}

const DeleteModal: FC<DeleteModalProps> = ({ setDeleteModal, id, isAlbum }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    event.target === event.currentTarget && setDeleteModal(false);
  };

  const endpoint = isAlbum ? `/album/${id}` : `/track/${id}`;

  const handleYesClick = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(endpoint);
      setLoading(false);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalContainer} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        {!success && !error && (
          <div className={styles.deleteContainer}>
            <h2>Tem certeza disso?</h2>
            <p>A ação não poderá ser desfeita.</p>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.deleteAlbumButton}
                disabled={loading}
                onClick={handleYesClick}
              >
                Sim
              </button>
              <button onClick={() => setDeleteModal(false)}>Não</button>
            </div>
          </div>
        )}
        {error && (
          <p className={styles.error}>
            Um erro ocorreu, por favor, tente novamente mais tarde.
          </p>
        )}
        {success && !error && (
          <p className={styles.success}>
            {isAlbum ? "Álbum" : "Música"} deletad{isAlbum ? "o" : "a"} com
            sucesso.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
