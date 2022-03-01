import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./styles.module.css";

const LoadingComponent = () => {
  return (
    <div className={styles["loader-root"]}>
      <Loader type="Grid" color="#f5f5f5" height={80} width={80} />
    </div>
  );
};

export default LoadingComponent;
