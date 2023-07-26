import { Dispatch, FC, SetStateAction, useState } from "react";

import styles from "./AddModal.module.css";
import axiosInstance from "../../lib/axios";

interface AddModalProps {
  setAddModal: Dispatch<SetStateAction<boolean>>;
}

const AddModal: FC<AddModalProps> = ({ setAddModal }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    event.target === event.currentTarget && setAddModal(false);
  };

  const handleAddAlbumClick = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/album", {
        name,
        year,
      });
      setLoading(false);
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(true);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <div className={styles.modalContainer} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Adicionar novo álbum</h2>
        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="name">Nome do álbum</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="name"
            name="name"
            placeholder="Rei do Gado"
          />
          <label htmlFor="year">Ano</label>
          <input
            onChange={(event) => setYear(event.target.value)}
            value={year}
            type="number"
            id="year"
            name="year"
            placeholder="1961"
          />
          <button onClick={handleAddAlbumClick} disabled={loading}>
            Adicionar
          </button>
          {error && (
            <p className={styles.error}>
              Erro ao adicionar álbum. Verifique suas informações.
            </p>
          )}
          {success && (
            <p className={styles.success}>Álbum adicionado com sucesso!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddModal;
