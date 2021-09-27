import React from "react";
import star from "../../public/images/svgs/star.svg";
import timeIcon from "../../public/images/svgs/time-icon.svg";
import Image from "next/image";
import styles from "./reviewCard.module.scss";

const ReviewCard: React.FC<{
  readonly expire: string;
  readonly subject: string;
  readonly review: string;
  readonly UserImg?: React.FC;
  readonly username: string;
  readonly starRating: number;
}> = ({ expire, starRating, subject, review, UserImg, username }) => {
  const elem = Array.from({ length: starRating }, (_, index) => index + 1);

  return (
    <div className={styles["review-card"]}>
      <div className={styles["review-card__time"]}>
        <div className={styles["review-card__align-items"]}>
          <Image
            src={timeIcon}
            alt="time icon"
            className={styles["review-card__time-icon"]}
          />
          <div className={styles["review-card__time-subject"]}>{expire}</div>
        </div>
      </div>
      <div className={styles["review-card__subject"]}>{subject}</div>
      <div className={styles["review-card__review"]}>{review}</div>
      <div className={styles["review-card__profile"]}>
        {UserImg ? <UserImg /> : <></>}
        <div className={styles["review-card__star-rating"]}>
          <div className={styles["review-card__username"]}>{username}</div>
          <div className={styles["review-card__rating"]}>
            {elem.map((item) => {
              return (
                <Image
                  src={star}
                  alt="star icons"
                  key={"star" + item}
                  className={styles["review-card__rating-icons"]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
