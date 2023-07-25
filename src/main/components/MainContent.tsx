import { useState } from "react";
import styles from "./MainContent.module.css";

const MainContent = () => {
  const [input, setInput] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {};

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <button onClick={handleClick} type="submit">
            Procurar
          </button>
        </div>
      </form>

      <div className={styles.content}>
        <div className={styles.album}>
          <h2>Album: Rei do Gado, 1961</h2>
          <table>
            <tr>
              <th>Nº</th>
              <th>Faixa</th>
              <th>Duração</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Música A</td>
              <td>3:45</td>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
