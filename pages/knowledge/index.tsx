// import DOMPurify from "dompurify";
import React, { useState } from "react";
// import { useTranslation } from "next-i18next";
import Image from "next/image";
import registerBanner from "../../public/images/pngs/register-banner.png";
import applyBtn from "../../public/images/svgs/apply-arrow.svg";
import DialogWrapper from "../../common/dialog-wrapper/dialogWrapper";
import UserDetailsForm from "../../common/user-details-form/userDetailsForm";
import AccordionSection from "../../components/accordion-section/accordionSection";
import Button from "../../components/button/button";
import DialogHeader from "../../components/dialog-header/dialogHeader";
import IntroductionSection from "../../components/introduction-section/introductionSection";
import LandingPageTitleSection from "../../components/landing-page-title-section/landingPageTitleSection";
import SearchSection from "../../components/landing-search-section/searchSection";
import SubmitRequest from "../../components/submit-request/submitRequest";
import styles from "./learnersLanding.module.scss";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { baseUrl } from "../../common/https";

export const getStaticProps = async ({ locale }: any) => {
  const data = await axios.get(`${baseUrl}courseCatalogue`);
  let accordionData = data.data.data;

  return {
    props: {
      accordionData,
      // ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const LearnersLanding: React.FC = ({ accordionData }: any) => {
  // const { t } = useTranslation();
  const [expandAccordion, setExpandAccordion] = useState({});
  // const sanitize = (html: string): string => DOMPurify.sanitize(html);
  const onClickHandle = (value: any) => {
    setExpandAccordion(value);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <LandingPageTitleSection>
        <section className={styles["d-flex-center"]}>
          <div
            className={styles["learners__title-wrapper"]}
            data-testid="title-section"
          >
            <div className={styles["landing-page__header"]}>
              <div className={styles["landing-page__title"]}>
                <div>
                  Aspire.
                  <span className={styles["light-deep-pink"]}> Connect</span>
                  <div>Improve.</div>
                </div>
              </div>
              <div className={styles["landing-page__content"]}>
                You have a desire to improve, and you know exactly what you need
                to learn. Now it is time to make it happen. Tap into our
                community of expert instructors to upskill yourself conveniently
                and effectively online
              </div>
            </div>
            <SearchSection onClickHandle={onClickHandle} />
          </div>
        </section>
      </LandingPageTitleSection>
      <div className={styles.wrapper} data-testid="introduction-section">
        <IntroductionSection
          LeftSection={() => {
            return (
              <>
                <div className={styles["left-content"]}>
                  <div className={styles["align-Introduction"]}>
                    <div>Learning</div>
                    <span className={styles.purple}>Reinvented.</span>
                  </div>
                </div>
              </>
            );
          }}
          RightSection={() => {
            return (
              <>
                <div className={styles["right-content"]}>
                  <p>
                    Do you find it difficult to achieve your learning objectives
                    from pre-recorded content?
                  </p>
                  <p>
                    Do you postpone training because you don’t have the time to
                    attend multi-day training courses?
                  </p>

                  <div className={styles["second-part"]}>
                    <p
                    // dangerouslySetInnerHTML={{
                    //   __html: sanitize(
                    //     t("learnersLanding.introductionContent4")
                    //   ),
                    // }}
                    >
                      <strong>ontelo</strong> is reshaping the training
                      landscape, so you can benefit from focused online
                      microlearning that teaches you precisely what you need to
                      know – at a time that suits you.
                    </p>
                    <p>The benefits of microlearning are compelling:</p>

                    <li>Flexibility to fit training around your working day</li>
                    <li>Focuses on your learning objectives</li>
                    <li>Improves your learning engagement</li>
                    <li>Improves your knowledge retention and recall</li>
                    <li>Reduces development time and cost</li>
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
      <div
        className={styles["learners-landing_join"]}
        data-testid="join-section"
      >
        <div className={styles["learners-landing_join-left"]}>
          <div className={styles.alignment}>
            <div
              className={styles["learners-landing_join-left-title"]}
              // dangerouslySetInnerHTML={{
              //   __html: sanitize(t("learnersLanding.joinOntelo.title")),
              // }}
            >
              Connect with a global network of dedicated experts who can help
              you improve in real-time
            </div>
            <div className={styles["learners-landing_join-left-content"]}>
              <p>
                Do you have a gap in your knowledge that is holding you back?
              </p>
              <p>
                Are you struggling to find a course that is focused on your
                specific requirement?
              </p>
              <p
              // dangerouslySetInnerHTML={{
              //   __html: sanitize(t("learnersLanding.joinOntelo.content.3")),
              // }}
              >
                Learn how <strong>ontelo</strong>’s forward-thinking approach to
                training delivery could enhance your skillset.
              </p>
            </div>
            <div className={styles["learners-landing_join-left-btn"]}>
              <Button
                text="Join ontelo!"
                onClick={() => {
                  handleClickOpen();
                }}
                ButtonImg={() => {
                  return (
                    <Image
                      src={applyBtn}
                      alt="join-ontelo"
                      className={styles["btn-img"]}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles["learners-landing_join-right"]}>
          <Image
            src={registerBanner}
            alt="register banner"
            className={styles["register-banner"]}
          />
        </div>
      </div>
      <div className={styles.wrapper} id="accordion-section">
        <AccordionSection
          selectedData={expandAccordion}
          accordionData={accordionData}
        />
      </div>
      <div
        className={styles["learners-landing-margins"]}
        data-testid="submit-form"
      >
        <IntroductionSection
          LeftSection={() => {
            return (
              <>
                <div className={styles["left-form"]}>
                  <div className={styles["title-form"]}>
                    Connect with experts today and learn the specific skills you
                    need in bitesize live online microlearning sessions – at a
                    time that suits you.
                  </div>
                </div>
              </>
            );
          }}
          RightSection={() => {
            return (
              <>
                <div className={styles["right-form"]}>
                  <SubmitRequest />
                </div>
              </>
            );
          }}
        />
      </div>
      {/* <div className={styles.wrapper} data-testid="footer-section">
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
          teachers={false}
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

export default LearnersLanding;
