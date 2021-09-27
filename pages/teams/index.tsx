// import DOMPurify from "dompurify";
import React from "react";
// import { useTranslation } from "next-i18next";
import engineers from "../../public/images/pngs/team_pic.png";
import applyBtn from "../../public/images/svgs/apply-arrow.svg";
import Button from "../../components/button/button";
import GetInTouch from "../../components/get-in-touch/getInTouch";
import IntroductionSection from "../../components/introduction-section/introductionSection";
import JoinSection from "../../components/join-section/joinSection";
import LandingPageTitleSection from "../../components/landing-page-title-section/landingPageTitleSection";
import styles from "./enterpriseLanding.module.scss";
import Image from "next/image";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

const EnterpriseLanding: React.FC = () => {
  // const { sanitize } = DOMPurify;

  // const { t } = useTranslation();
  const onClickHandler = () => {
    const titleElement = document.getElementById("get-in-touch");
    if (titleElement && titleElement.scrollIntoView) {
      titleElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <LandingPageTitleSection>
        <section className={styles["d-flex-center"]}>
          <div
            className={styles["enterprise__title-wrapper"]}
            data-testid="title-section"
          >
            <div className={styles["landing-page__header"]}>
              <div className={styles["landing-page__title"]}>
                <div>
                  Empower your
                  <span className={styles["light-deep-green"]}> people</span>
                </div>
              </div>
              <div className={styles["landing-page__content"]}>
                Your people are your business’s most valuable asset. To harness
                their true potential you must nurture the skills they need for
                the future by investing in their development now.
                <strong>ontelo</strong> can underpin this by helping you empower
                them with new skills and knowledge that can drive your business
                forward.
              </div>
              <div className={styles["apply-btn"]}>
                <Button
                  text="Get in Touch"
                  onClick={onClickHandler}
                  ButtonImg={() => {
                    return (
                      <Image
                        src={applyBtn}
                        alt="get in touch"
                        className={styles["btn-img"]}
                      />
                    );
                  }}
                />
              </div>
            </div>
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
                    <div>Are you neglecting</div>
                    <div>your employee’s</div>
                    <div>
                      <span className={styles.green}>development </span>
                      goals?
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
                  <div>
                    Do you worry that allowing your employees time away from the
                    office for training will have a detrimental impact on your
                    business’s productivity? Think again. Investing in their
                    development will help your business to grow in the long-term
                    – if done properly.
                  </div>
                  <p>
                    Typically, just 5-15% of content learned during traditional
                    training is retained and put into practice.
                  </p>
                  <p>
                    You can overcome this hurdle by using
                    <strong> ontelo</strong> to embrace focused online training
                    that teaches your people precisely what they need to know to
                    work more efficiently – and increase productivity.
                  </p>
                  <p>
                    Wave goodbye to red tape and procurement overheads by giving
                    your employees the autonomy to make their own decisions
                    about what they want to learn and when they want to learn it
                  </p>
                </div>
              </>
            );
          }}
        />
      </div>
      <div className={styles.wrapper} data-testid="info-block">
        <IntroductionSection
          LeftSection={() => {
            return (
              <>
                <div>
                  <div className={styles["left-part"]}>
                    <div className={styles.container}>
                      <div className={styles.alignmentCenter}>
                        <div className={styles.bold}>
                          Enhance your teams skills by undertaking focused
                          micro-learning sessions
                        </div>
                      </div>
                      <div className={styles.small}>
                        Build a bespoke learning pathway for your team to follow
                        or allow them to embark on their own development journey
                        using our intuitive platform.
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
                      src={engineers}
                      className={styles["img-right"]}
                      alt="engineers"
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
      <div className={styles.wrapper} data-testid="how-it-works">
        <div className={styles["how-it-works"]}>
          <div className={styles["new-section"]}>
            <div className={styles["section-title"]}>How it works</div>
            <div className={styles["section-content"]}>
              <div>Streamline your entire team’s learning process in three</div>
              <div>simple steps</div>
            </div>
          </div>
          <div className={styles.steps}>
            <div className={styles.parts}>
              <div className={styles.number}>1</div>
              <div>
                <div className={styles.heading}>Join ontelo</div>
                <div className={styles["step-content"]}>
                  Create an account quickly and easily
                </div>
              </div>
            </div>
            <div className={styles.parts}>
              <div className={styles.number}>2</div>
              <div>
                <div className={styles.heading}>Create a Team</div>
                <div className={styles["step-content"]}>
                  Invite your team members
                </div>
              </div>
            </div>
            <div className={styles.parts}>
              <div className={styles.number}>3</div>
              <div>
                <div className={styles.heading}>Empower learning!</div>
                <div className={styles["step-content"]}>
                  Approve learning events, monitor progress, control budgets.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper} id="get-in-touch">
        <IntroductionSection
          LeftSection={() => {
            return (
              <>
                <div>
                  <div className={styles["left-form"]}>
                    <div className={styles["title-form"]}>
                      Contact the team at ontelo to understand how you can start
                      to empower your teams learning
                    </div>
                  </div>
                </div>
              </>
            );
          }}
          RightSection={() => {
            return (
              <>
                <div className={styles["alignment-form"]}>
                  <div className={styles["right-form"]}>
                    <div className={styles["submit-form"]}>
                      <GetInTouch />
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>

      <div data-testid="join-section">
        <JoinSection />
      </div>
      {/* <div className={styles.footer_wrapper} data-testid="footer-section">
        <Footer />
      </div> */}
    </div>
  );
};

export default EnterpriseLanding;
