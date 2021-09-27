import React, { createContext, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./loaderProvider.module.scss";

const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {},
});
export default LoaderContext;

export const LoaderProvider: React.FC = ({ children }) => {
  const [load, setLoad] = useState(false);

  const showLoader = () => {
    setLoad(true);
    document.getElementsByTagName("body")[0].classList.add("show-loader");
  };
  const hideLoader = () => {
    setLoad(false);
    document.getElementsByTagName("body")[0].classList.remove("show-loader");
  };

  const loaderFunctions = {
    showLoader: showLoader,
    hideLoader: hideLoader,
  };

  return (
    <LoaderContext.Provider value={loaderFunctions}>
      {children}
      <div className="backdrop-section">
        <Backdrop open={load} className={styles.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </LoaderContext.Provider>
  );
};
