import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { UseFetch } from "../../common/https";
import Image from "next/image";
import ReviewCard from "../review-card/reviewCard";
import styles from "./reviewSection.module.scss";

const ReviewSection: React.FC<{
  readonly isSignUp?: boolean;
  count: any;
  requestData: any;
}> = ({
  count = { proposalCount: 0, requestCount: 0 },
  requestData = [],
  isSignUp = false,
}) => {
  const [reviewData, setReviewData] = useState<ReadonlyArray<any>>(requestData);
  const [proposalCount, setProposalCount] = useState(count.proposalCount);
  const [requestCount, setRequestCount] = useState(count.requestCount);
  const sliderPerViewCount = isSignUp ? 3 : 4;

  SwiperCore.use([Navigation]);
  // const { fetchRest } = UseFetch();

  // useEffect(() => {
  //   fetchRest({
  //     url: "requestAndProposalStats",
  //     method: "GET",
  //   }).then(
  //     (res) => {
  //       const data = res.data;
  //       setProposalCount(data.proposalCount);
  //       setRequestCount(data.requestCount);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   fetchRest({
  //     url: "request",
  //     method: "GET",
  //   }).then(
  //     (res) => {
  //       const data = res.data.data;
  //       setReviewData(data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, []);

  return (
    <section
      className={`${styles.reviews} ${
        isSignUp ? styles.signUpHeight : styles.reviewHeight
      }`}
    >
      {isSignUp ? (
        <>
          <div
            className={`${styles.reviewsHeader} ${styles.signUpHeaderWidth} ${styles.margin}`}
          >
            Register with Ontelo and gain access to a global network of experts
            who can help you, in real time
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        className={
          isSignUp
            ? styles.signUpHead
            : `${styles.reviewsHeader} ${styles.reviewHeaderWidth}`
        }
      >
        Today, ontelo users generated {requestCount} learning requests and
        received {proposalCount} answers from experts
      </div>
      <Swiper
        className="review-swiper"
        slidesPerView={sliderPerViewCount}
        loop={true}
        breakpoints={{
          "1280": {
            slidesPerView: sliderPerViewCount,
          },
          "1920": {
            slidesPerView: 5,
          },
        }}
        navigation={true}
      >
        {reviewData.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ReviewCard
                expire={`Exp in ${item.expiresIn} hours`}
                starRating={item?.user?.rating ? item.user.rating : 0}
                subject={item.subCategory.name}
                review={item.description}
                UserImg={() => {
                  return item.user.picture ? (
                    <Image
                      width="40px"
                      height="40px"
                      src={item.user.picture}
                      className={styles["review-card__username-img"]}
                      alt="user"
                    />
                  ) : (
                    <></>
                  );
                }}
                username={
                  item.user
                    ? `${item?.user?.firstName ? item.user.firstName : ""} ${
                        item?.user?.lastName ? item.user.lastName : ""
                      }`
                    : ""
                }
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ReviewSection;
