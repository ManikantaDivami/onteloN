import React from "react";
import styles from "./alertPopupWrapper.module.scss";

const AlertPopupWrapper: React.FC<{
  Img?: React.FC;
  title: string;
  Content: React.FC;
  Buttons?: React.FC;
  onClick?: () => void;
}> = ({ Img, title, Content, Buttons }) => {
  return (
    <div className={styles["popup-alert__container"]}>
      <div>{Img ? <Img /> : ""}</div>
      <div className={styles["popup-alert__title"]}>{title}</div>
      <div className={styles["popup-alert__content"]}>
        <Content />
      </div>
      {Buttons ? <Buttons /> : ""}
    </div>
  );
};

export default AlertPopupWrapper;
