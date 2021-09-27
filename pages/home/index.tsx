import React, { useState } from "react";
import Image from "next/image";
// import { useTranslation } from "next-i18next";
import AccordionSection from "../../components/accordion-section/accordionSection";
import IntroductionSection from "../../components/introduction-section/introductionSection";
import LandingPageTitleSection from "../../components/landing-page-title-section/landingPageTitleSection";
import SearchSection from "../../components/landing-search-section/searchSection";
import ReviewSection from "../../components/review-section/reviewSection";
import SubmitRequest from "../../components/submit-request/submitRequest";
import learnSomethingNew from "../../public/images/pngs/LearnSomethingNew.png";
import styles from "./homeLanding.module.scss";
// import * as DOMPurify from "dompurify";
import { baseUrl } from "../../common/https";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

export const getStaticProps = async ({ locale }: any) => {
  const data = await axios.get(`${baseUrl}courseCatalogue`);
  const data1 = await axios.get(`${baseUrl}requestAndProposalStats`);
  const data2 = await axios.get(`${baseUrl}request`);
  let accordionData = data.data.data;
  let requestCount = data1.data;
  let requestData = data2.data.data;

  return {
    props: {
      accordionData,
      requestCount,
      requestData,
      // ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const HomeLanding: React.FC = ({
  accordionData,
  requestCount,
  requestData,
}: any) => {
  // const { t } = useTranslation();

  const [expandAccordion, setExpandAccordion] = useState({});

  const onClickHandle = (value: any) => {
    setExpandAccordion(value);
  };

  return (
    <div>
      <LandingPageTitleSection>
        <section className={styles["d-flex-center"]}>
          <div className={styles["home-wrapper"]} data-testid="title-section">
            <div className={styles["landing-page__header"]}>
              <div className={styles["landing-page__title"]}>
                <div>
                  The
                  <span className={styles["light-deep-pink"]}> Knowledge </span>
                  Marketplace
                </div>
              </div>
              <div className={styles["landing-page__content"]}>
                Connect with our global community of expert instructors for the
                opportunity to achieve your learning objectives in bitesize live
                online training sessions.
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
                    <div>
                      <span className={styles.purple}>Live </span>
                      training sessions
                    </div>
                    <div>
                      with vetted
                      <span className={styles.purple}> experts</span>.
                    </div>
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
                    <strong>ontelo</strong> connects people from across the
                    globe that have a thirst for knowledge – people like you –
                    with experts in industry, to achieve their learning
                    objectives in a quick and effective way.
                  </p>
                  <p>
                    Our global community of expert instructors are skilled at
                    imparting their extensive industry knowledge in a bite-sized
                    training environment – so you can achieve your learning
                    objectives at a pace that suits you. We can help you harness
                    the power of technology to upskill conveniently and
                    effectively by providing access to live training courses –
                    enabling you to interact with dedicated experts online.
                  </p>
                  <p>
                    All training courses are delivered by verified experts that
                    have been vetted by <strong>ontelo</strong> to ensure you
                    benefit from the highest standard of training possible.
                  </p>
                </div>
              </>
            );
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <IntroductionSection
          LeftSection={() => {
            return (
              <>
                <div>
                  <div className={styles["left-part"]}>
                    <div className={styles.container}>
                      <div className={styles.alignmentCenter}>
                        <div className={styles.bold}>
                          Learn something new in just 1hr, upskill today!
                        </div>
                      </div>
                      <div className={styles.small}>
                        Select from a predefined list of microlearning topics or
                        create your own bespoke learning package. Then simply
                        sit back and wait for experts in your chosen subject to
                        get in touch, before selecting your preferred instructor
                        and agreeing your learning session – and then you’re
                        ready to start upskilling!
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
          RightSection={() => {
            return (
              <>
                <div>
                  <div className={styles["right-part"]}>
                    <Image
                      src={learnSomethingNew}
                      className={styles["img-right"]}
                      alt="learn Something new"
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
      <div className={styles.wrapper} id="accordion-section">
        <AccordionSection
          selectedData={expandAccordion}
          accordionData={accordionData}
        />
      </div>
      <div className={styles["home-landing-margin"]}>
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
              <React.Fragment key="home-landing-right-section">
                <div className={styles["right-form"]}>
                  <SubmitRequest />
                </div>
              </React.Fragment>
            );
          }}
        />
      </div>
      <div data-testid="review-section">
        <ReviewSection count={requestCount} requestData={requestData} />
      </div>
      {/* <div className={styles.wrapper} data-testid="footer-section">
        <Footer />
      </div> */}
    </div>
  );
};

export default HomeLanding;
