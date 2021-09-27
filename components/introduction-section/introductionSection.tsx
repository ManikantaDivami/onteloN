import React from "react";
import styles from "./introductionSection.module.scss";

const IntroductionSection: React.FC<{
  readonly LeftSection?: React.FC;
  readonly RightSection?: React.FC;
}> = (props) => {
  const { LeftSection, RightSection } = props;
  return (
    <div className={styles["introduction-section"]}>
      <div className={styles.left}>{LeftSection ? <LeftSection /> : <></>}</div>
      <div className={styles.right}>
        {RightSection ? <RightSection /> : <></>}
      </div>
    </div>
  );
};

export default IntroductionSection;
