import React, { useState } from "react";
// import { useTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom";
import person from "../../public/images/svgs/personIcon.svg";
import Header from "../../components/header/header";
import ReviewSection from "../../components/review-section/reviewSection";
import TabItem from "../../components/tab-item/tabItem";
import TabsWrapper from "../../components/tabs-wrapper/tabsWrapper";
import styles from "./signUp.module.scss";
import axios from "axios";
import { baseUrl } from "../../common/https";

export const getStaticProps = async ({ locale }: any) => {
  const data1 = await axios.get(`${baseUrl}requestAndProposalStats`);
  const data2 = await axios.get(`${baseUrl}request`);
  let requestCount = data1.data;
  let requestData = data2.data.data;

  return {
    props: {
      requestCount,
      requestData,
    },
  };
};

const SignUp: React.FC = ({ requestCount, requestData }: any) => {
  // const { t } = useTranslation()
  const { push } = useHistory();
  const [defaultState, setDefaultState] = useState<number>(0);
  const [tabLink, setTabLink] = useState<string>("");
  const changeLink = (index: number) => {
    let link = "";
    switch (index) {
      case 0:
        link = "/signUp?tab=student";
        break;
      case 1:
        link = "/signUp?tab=teacher";
    }
    setTabLink(link);
  };
  const tabHeaders: ReadonlyArray<{
    key: string;
    TabItemWrapper: React.FC<{ isActive: boolean }>;
  }> = [
    {
      key: "For students",
      TabItemWrapper: ({ isActive }) => {
        return (
          <TabItem
            isActive={isActive}
            text="Im a student"
            isSignUp={true}
            className={styles.tabColor}
          />
        );
      },
    },
    {
      key: "For teachers",
      TabItemWrapper: ({ isActive }) => {
        return (
          <TabItem
            isActive={isActive}
            text="Im a teacher"
            isSignUp={true}
            className={styles.tabColor}
          />
        );
      },
    },
  ];
  const onTabChange = (activeTab: number) => {
    switch (activeTab) {
      case 0:
        push("/signUp?tab=student");
        changeLink(0);
        break;
      case 1:
        push("/signUp?tab=teacher");
        changeLink(1);
        break;
      default:
        push("/signUp?tab=student");
        changeLink(1);
        break;
    }
  };
  return (
    <>
      <div className={styles.wrapperSignup}>
        <div className={styles.section}>
          <Header isSignUp={true} />
          <div className={styles.leftWrapper}>
            <div className={styles.heading}>Sign Up</div>
            <div className={styles.tabWrapper} data-testid="tabWraper">
              <TabsWrapper
                tabHeaders={tabHeaders}
                activeTabValue={defaultState}
                onTabChange={onTabChange}
              />
            </div>
            <div className={styles.column} data-testid="col">
              <div>
                <img src={person} alt="signin" className={styles.image} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section} data-testid="review">
          <div>
            <ReviewSection
              isSignUp={true}
              count={requestCount}
              requestData={requestData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
