// import DOMPurify from "dompurify";
import React, { useState } from "react";
// import { useTranslation } from "next-i18next";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ahmed from "../../public/images/pngs/ahmed.png";
import gautam from "../../public/images/pngs/gautam.png";
import steve from "../../public/images/pngs/steve.png";
import applyBtn from "../../public/images/svgs/apply-arrow.svg";
import DialogWrapper from "../../common/dialog-wrapper/dialogWrapper";
import UserDetailsForm from "../../common/user-details-form/userDetailsForm";
import Button from "../../components/button/button";
import DialogHeader from "../../components/dialog-header/dialogHeader";
import IntroductionSection from "../../components/introduction-section/introductionSection";
import JoinSection from "../../components/join-section/joinSection";
import LandingPageTitleSection from "../../components/landing-page-title-section/landingPageTitleSection";
import ReviewSection from "../../components/review-section/reviewSection";
import classes from "./teachersLanding.module.scss";
import Image from "next/image";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { baseUrl } from "../../common/https";
import axios from "axios";

export const getStaticProps = async ({ locale }: any) => {
  const data1 = await axios.get(`${baseUrl}requestAndProposalStats`);
  const data2 = await axios.get(`${baseUrl}request`);
  let requestCount = data1.data;
  let requestData = data2.data.data;

  return {
    props: {
      requestCount,
      requestData,
      // ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const TeachersLanding: React.FC = ({ requestCount, requestData }: any) => {
  // const { t } = useTranslation();
  // const { sanitize } = DOMPurify;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  SwiperCore.use([Pagination, Autoplay]);
  const pagination = {
    clickable: true,
  };

  const colleagueContent = [
    {
      title: "Steve",
      content:
        "Lives in the countryside nr. Exeter, UK and draws upon his experience working in London, Dubai and Bermuda to deliver Management training and Coaching sessions to knowledge seekers accross EMEA",
      image: steve,
    },
    {
      title: "Gautam",
      content:
        "A passionate innovator, specializing in leading digital transformation projects and building technology solutions to solve business problems. He is quick to accept that data is his first love and he thrives on data driven insights. Gautam is an avid cricket fan and loves to play sports with his 3 year old boy when not working",
      image: gautam,
    },
    {
      title: "Ahmed",
      content:
        "Fuelled by Turkish coffee, Ahmed sees the beauty in technology and nicely painted(implemented) systems that look, operate and make our lives pretty. He finds it amazing to show others how to do the same",
      image: ahmed,
    },
  ];

  return (
    <div>
      <LandingPageTitleSection>
        <section className={classes["d-flex-center"]}>
          <div
            className={classes["teachers__title-wrapper"]}
            data-testid="title-section"
          >
            <div className={classes["landing-page__header"]}>
              <div className={classes["landing-page__title"]}>
                <div>
                  Your Career
                  <span className={classes["light-deep-green"]}> take-off</span>
                </div>
              </div>
              <div className={classes["landing-page__content"]}>
                Joining <strong>ontelo</strong>’s community of expert knowledge
                providers gives you the platform to further your career online
                by helping people across the globe achieve their goals.
              </div>
              <div className={classes["apply-btn"]}>
                <Button
                  text="Apply Now"
                  onClick={() => {
                    handleClickOpen();
                  }}
                  ButtonImg={() => {
                    return (
                      <Image
                        src={applyBtn}
                        alt="apply-now"
                        className={classes["btn-img"]}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </LandingPageTitleSection>
      <div className={classes.wrapper} data-testid="introduction-section">
        <IntroductionSection
          LeftSection={() => {
            return (
              <>
                <div className={classes["left-content"]}>
                  <div className={classes["align-Introduction"]}>
                    <div>
                      Take
                      <span className={classes.pink}> control.</span>
                    </div>
                    <div>
                      <span className={classes.pink}>Teach </span>
                      others and
                    </div>
                    <div>
                      earn on your
                      <span className={classes.pink}> terms.</span>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
          RightSection={() => {
            return (
              <>
                <div className={classes["right-content"]}>
                  <div>
                    <strong>ontelo</strong> can provide you with the autonomy
                    you crave – so you can take control of your work schedule
                    and achieve your goals
                  </div>
                  <p>
                    Our live microlearning events typically last between 1-4
                    hours, allowing you to arrange your work schedule around
                    your circumstances.
                  </p>
                  <div>
                    This provides you with the flexibility to work and earn on
                    your terms at a time and place that’s convenient to you.
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
      <div className={classes.wrapper} data-testid="meet-colleagues">
        <div className={classes["works-wrapper"]}>
          <div className={classes["outer-wrap"]}>
            <div className={classes["left-part"]}>
              <div className={classes["left-title"]}>Meet Your Colleagues</div>
              <Swiper
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                speed={1500}
                loop={true}
                pagination={pagination}
                className="dotted-carousel"
              >
                {colleagueContent.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <SwiperSlide>
                        <div className={classes["left-col"]}>
                          <div
                            className={classes["name-col"]}
                            key={`slide-${index}`}
                          >
                            {item.title}
                          </div>
                          {item.content}
                        </div>
                        <Image
                          src={item.image}
                          className={classes["carousel-img"]}
                          alt=""
                        />
                      </SwiperSlide>
                    </React.Fragment>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className={classes["lower-border"]}></div>
        </div>
      </div>
      <div className={classes.alignment} data-testid="how-it-works">
        <div className={classes["how-it-works-wrapper"]}>
          <div
            className={`${classes.part_wrapper} ${classes["how-it-works-sec-1"]}`}
          >
            <div className={classes["left-teachers-landing"]}>
              <div className={classes["teachers-landing-title"]}>
                How it works:
              </div>
              <div className={classes["teachers-landing-content"]}>
                No obligations. No fees. Joining <strong>ontelo</strong>’s
                community of knowledge providers is simple: create your profile,
                promote your expertise, and connect with potential clients.
              </div>
              <div className={classes["teachers-landing-content"]}>
                Once you are part of the community, your skills and knowledge
                will be matched against live learning enquiries submitted by
                knowledge seekers from across the globe.
              </div>
              <div className={classes["teachers-landing-content"]}>
                You receive alerts via the <strong>ontelo</strong> platform
                whenever there is an enquiry about your services, allowing you
                to view the opportunity and submit a proposal – if it matches
                your requirements of course!
              </div>
              <div className={classes["teachers-landing-content"]}>
                If your proposal is accepted, all that is left to do is agree on
                a date and a time to connect and you are ready to do what you do
                best: help your clients to achieve their learning objectives.
              </div>
            </div>
          </div>
          <div className={classes.part_wrapper}>
            <div className={classes["right-teachers-landing"]}>
              <div className={classes["teachers-landing-title"]}>
                Getting paid:
              </div>
              <div className={classes["teachers-landing-content"]}>
                You set your hourly rate and we’ll do the rest, holding your fee
                in escrow until the learning event is concluded. Payment is made
                directly to your bank account
              </div>
              <div className={classes["teachers-landing-content"]}>
                Once the training course is completed, both parties – you and
                your client – can rate your experience. This helps to build your
                profile and reputation across the <strong>ontelo </strong>
                community.
              </div>
              <div className={classes["teachers-landing-content"]}>
                Build your reputation and continue to work with existing and new
                learners from across the globe, expanding your experience and
                growing your wallet
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-testid="join-section">
        <JoinSection />
      </div>
      <div data-testid="review-section">
        <ReviewSection count={requestCount} requestData={requestData} />
      </div>
      {/* <div className={classes.wrapper} data-testid="footer-section">
        <Footer />
      </div> */}
      <DialogWrapper
        Title={DialogHeader}
        open={isOpen}
        onClose={handleClose}
        isfullScreen={false}
        fullHeightDialog={true}
      >
        <UserDetailsForm
          btnText="Apply Now"
          teachers={true}
          applyNow={true}
          courseFlag={false}
          onSubmitSuccess={() => {
            handleClose();
          }}
        />
      </DialogWrapper>
    </div>
  );
};

export default TeachersLanding;
