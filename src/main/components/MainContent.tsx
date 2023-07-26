import { FC, useState } from "react";

import styles from "./MainContent.module.css";
import { Album } from "../Main";
import { formatDuration } from "../../utils/formatDuration";
import Loader from "./UI/Loader";
import Modal from "./Modal";

interface MainContentProps {
  data: Album[] | null;
  loading: boolean;
  error: boolean;
}

const MainContent: FC<MainContentProps> = ({ data, loading }) => {
  const [input, setInput] = useState("");
  const [modalOn, setModalOn] = useState(true);
  const [albumIndex, setAlbumIndex] = useState(1);

  const handleAlbumClick = (index: number) => {
    setModalOn(true);
    setAlbumIndex(index);
  };

  return (
    <>
      {modalOn && (
        <Modal
          modalOn={modalOn}
          setModalOn={setModalOn}
          albumIndex={albumIndex}
          data={data}
        />
      )}
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
          </div>
        </form>

        <div className={styles.content}>
          {loading && !data && <Loader />}

          {data &&
            data.map((album, index) => (
              <div key={album.id} className={styles.album}>
                <h2 onClick={() => handleAlbumClick(index)}>
                  Album: {album.name}, {album.year}
                </h2>
                <table>
                  <thead>
                    <tr>
                      <th>Nº</th>
                      <th>Faixa</th>
                      <th>Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    {album.tracks
                      .filter((music) =>
                        music.title.toLowerCase().includes(input.toLowerCase())
                      )
                      .map((track) => (
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
        </div>
      </main>
    </>
  );
};

export default MainContent;
