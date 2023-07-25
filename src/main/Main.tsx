import MainContent from "./components/MainContent";
import Header from "./components/Header";

import styles from "./Main.module.css";
import { useEffect } from "react";

const Main = () => {
  useEffect(() => {}, []);

  return (
    <div className={styles.main}>
      <Header />
      <MainContent />
    </div>
  );
};

export default Main;
