import { useEffect, useState } from "react";

import MainContent from "./components/MainContent";
import Header from "./components/Header";
import styles from "./Main.module.css";
import axiosInstance from "../lib/axios";

interface Track {
  id: number;
  number: number;
  title: string;
  duration: number;
}

export interface Album {
  id: number;
  name: string;
  tracks: Track[];
  year: number;
}

const Main = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/album");
      setData(response.data.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <Header />
      <MainContent data={data} loading={loading} error={error} />
    </div>
  );
};

export default Main;
