import { Dispatch, FC, SetStateAction, useState } from "react";
import { IoTrash, IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";

import styles from "./AlbumModal.module.css";
import { Album } from "../Main";
import { formatDuration, minutesToSeconds } from "../../utils/formatDuration";
import axiosInstance from "../../lib/axios";
import DeleteModal from "./DeleteModal";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [isAlbum, setIsAlbum] = useState(false);
  const [id, setId] = useState(0);

  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    event.target === event.currentTarget && setAlbumModal(false);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleAddTrack = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/track", {
        album_id: albumId,
        number,
        title,
        duration: minutesToSeconds(duration),
      });
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

  const handleDeleteTrackClick = (id: number) => {
    setDeleteModal(true);
    setId(id);
    setIsAlbum(false);
  };

  const handleDeleteAlbumClick = (id: number) => {
    setDeleteModal(true);
    setId(id);
    setIsAlbum(true);
  };

  if (data)
    return (
      <>
        {deleteModal && (
          <DeleteModal
            id={id}
            setDeleteModal={setDeleteModal}
            isAlbum={isAlbum}
          />
        )}

        <div className={styles.modalContainer} onClick={handleOutsideClick}>
          <div className={styles.modal}>
            <h1 className={styles.title}>
              {data[albumIndex].name} ({data[albumIndex].year})
            </h1>
            <ul className={styles.tracks}>
              {data[albumIndex].tracks.map((track) => (
                <li key={track.id}>
                  {track.number} - {track.title} (
                  {formatDuration(track.duration)})
                  <button onClick={() => handleDeleteTrackClick(track.id)}>
                    <IoTrash size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.dropdown}>
              <h2 onClick={handleDropdownClick}>
                Adicionar músicas ao álbum{" "}
                {isDropdownOpen ? (
                  <IoArrowUpCircle size={20} />
                ) : (
                  <IoArrowDownCircle size={20} />
                )}
              </h2>
              {isDropdownOpen && (
                <form
                  className={styles.form}
                  onSubmit={(event) => event.preventDefault()}
                >
                  <label>Número da música</label>
                  <input
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    type="number"
                    name="number"
                    id="number"
                    placeholder="1"
                  />
                  <label>Título</label>
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Alma de Boêmio"
                  />
                  <label>Duração</label>
                  <input
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    name="duration"
                    id="duration"
                    placeholder="03:15"
                  />
                  <button disabled={loading} onClick={handleAddTrack}>
                    Adicionar música
                  </button>
                  {error && (
                    <p className={styles.error}>
                      Erro ao adicionar música. Verifique suas informações.
                    </p>
                  )}
                  {success && (
                    <p className={styles.success}>
                      Música adicionada com sucesso!
                    </p>
                  )}
                </form>
              )}
            </div>
            <button
              onClick={() => handleDeleteAlbumClick(data[albumIndex].id)}
              className={styles.deleteAlbumButton}
            >
              Excluir álbum <IoTrash size={20} />
            </button>
          </div>
        </div>
      </>
    );
};

export default AlbumModal;
