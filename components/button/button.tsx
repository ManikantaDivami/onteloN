import React from "react";
import styles from "./button.module.scss";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  readonly text: string;
  readonly ButtonImg?: React.FC;
  readonly type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  ButtonImg,
  onClick,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={
        className
          ? `${styles["common-btn-style"]} ${className}`
          : styles["common-btn-style"]
      }
      onClick={onClick}
      data-testid="btn"
    >
      {ButtonImg ? <ButtonImg /> : <></>}
      <div className={styles["button-text"]}>{text}</div>
    </button>
  );
};

export default Button;
