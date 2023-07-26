import { FC, useState, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

import styles from "./MainContent.module.css";
import { Album } from "../Main";
import { formatDuration } from "../../utils/formatDuration";
import Loader from "./UI/Loader";
import AlbumModal from "./AlbumModal";
import AddModal from "./AddModal";

interface MainContentProps {
  data: Album[] | null;
  loading: boolean;
  error: boolean;
}

const MainContent: FC<MainContentProps> = ({ data, loading }) => {
  const [input, setInput] = useState("");
  const [albums, setAlbums] = useState(data);
  const [albumModal, setAlbumModal] = useState(false);
  const [albumIndex, setAlbumIndex] = useState(1);
  const [albumId, setAlbumId] = useState(0);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    setAlbums(data);
  }, [data]);

  const handleAlbumClick = (index: number, id: number) => {
    setAlbumModal(true);
    setAlbumIndex(index);
    setAlbumId(id);
  };

  const handleSearchClick = () => {
    const filteredAlbums = data
      ?.map((album) => ({
        ...album,
        tracks: album.tracks.filter((track) =>
          track.title.toLowerCase().includes(input.toLowerCase())
        ),
      }))
      .filter((album) => album.tracks.length > 0);

    if (filteredAlbums) setAlbums(filteredAlbums);
  };

  return (
    <>
      {albumModal && (
        <AlbumModal
          albumModal={albumModal}
          setAlbumModal={setAlbumModal}
          albumIndex={albumIndex}
          albumId={albumId}
          data={data}
        />
      )}

      {addModal && <AddModal setAddModal={setAddModal} />}

      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
          <label>Digite uma palavra chave</label>
          <div className={styles.inputContainer}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              type="text"
              name="search"
              id="search"
              placeholder="Digite o nome de uma música 🎵"
            />
            <button onClick={handleSearchClick}>Procurar</button>
          </div>
        </form>

        <div className={styles.content}>
          {loading && !data && <Loader />}

          {albums &&
            albums.map((album, index) => (
              <div key={album.id} className={styles.album}>
                <div onClick={() => handleAlbumClick(index, album.id)}>
                  <h2>
                    Album: {album.name}, {album.year}
                  </h2>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Nº</th>
                      <th>Faixa</th>
                      <th>Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    {album.tracks.map((track) => (
                      <tr key={track.id}>
                        <td>{track.number}</td>
                        <td>{track.title}</td>
                        <td>{formatDuration(track.duration)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

          {albums?.length === 0 && (
            <p className={styles.fallbackText}>
              Sem resultados encontrados, tente outros termos.
            </p>
          )}
        </div>
        <button
          onClick={() => setAddModal(true)}
          className={styles.addAlbumButton}
        >
          Adicionar novo álbum <IoAddCircle size={20} />
        </button>
      </main>
    </>
  );
};

export default MainContent;
