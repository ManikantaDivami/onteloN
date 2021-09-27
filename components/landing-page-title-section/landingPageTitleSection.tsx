import React from "react";
import styles from "./landingPageTitleSection.module.scss";

const LandingPageTitleSection: React.FC = ({ children }) => {
  return <section className={styles["landing-page"]}>{children}</section>;
};

export default LandingPageTitleSection;
