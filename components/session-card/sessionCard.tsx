import React from "react";
import { useTranslation } from "next-i18next";
import styles from "./sessionCard.module.scss";

const SessionCard: React.FC<{
  readonly header: string;
  readonly timer: string;
  onCardClick(): void;
}> = ({ header, timer, onCardClick }) => {
  const { t } = useTranslation();
  return (
    <div
      data-testid="card"
      onClick={() => {
        onCardClick();
      }}
      className={styles.sessionCard}
    >
      <div className={styles.sessionCardImg}>
        <div data-testid="header">{header}</div>
      </div>
      <div className={styles.sessionCardTimer} data-testid="timer">
        {timer}
        {t("sessionCard.duration")}
      </div>
    </div>
  );
};

export default SessionCard;
