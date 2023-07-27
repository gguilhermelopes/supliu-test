import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="./assets/logo.png" alt="Logo" />
      </div>
      <h1 className={styles.title}>Discografia</h1>
    </header>
  );
};

export default Header;
