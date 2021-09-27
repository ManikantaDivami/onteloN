import React, { MouseEventHandler } from "react";
import close from "../../public/images/svgs/close.svg";
import maximize from "../../public/images/svgs/maximize.svg";
import styles from "./dialogHeader.module.scss";
import Image from "next/image";

const DialogHeader: React.FC<{
  readonly isfullScreen: boolean;
  readonly title: string;
  readonly handleClose: MouseEventHandler<HTMLImageElement>;
  readonly expand: MouseEventHandler<HTMLImageElement>;
}> = ({ isfullScreen, title, handleClose, expand }) => {
  return (
    <div className={styles["dialog-header__options"]}>
      <Image
        src={close}
        alt="close"
        onClick={handleClose}
        className={styles.close}
      />
      {title ? <div className={styles.title}>{title}</div> : <></>}
      {isfullScreen ? (
        <div className={styles.resize} onClick={expand}>
          new window
          <Image src={maximize} alt="maximize" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DialogHeader;
