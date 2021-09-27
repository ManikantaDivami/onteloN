import React from "react";
import styles from "./tabItem.module.scss";

const TabItem: React.FC<{
  readonly text?: string;
  readonly isActive: boolean;
  readonly isSignUp?: boolean;
  readonly className?: string;
}> = (props) => {
  const { text, isActive, isSignUp = false, className } = props;

  return (
    <div>
      <div
        className={`${isActive ? "" : styles.tabItem} ${
          className ? className : ""
        }`}
        data-testid="text"
      >
        {text}
      </div>
    </div>
  );
};

export default TabItem;
