import { Accordion, AccordionDetails, debounce } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccordionWrapper from "../../common/accordion-wrapper/accordionWrapper";
import { UseFetch } from "../../common/https";
import Search from "../../common/search/search";
import SummaryWrapper from "../../components/summary-wrapper/summaryWrapper";
import TabItem from "../../components/tab-item/tabItem";
import TabsWrapper from "../../components/tabs-wrapper/tabsWrapper";
import styles from "./helpCenter.module.scss";
import { useRouter } from "next/router";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

const HelpCenter: React.FC = () => {
  const [defaultState, setDefaultState] = useState<number>(0);

  const [accordionData, setAccordionData] = useState<ReadonlyArray<any>>([]);
  const { fetchRest } = UseFetch();
  const [enquiryLink, setEnquiryLink] = useState<string>("");

  const updateLink = (indexTab: number) => {
    let localLink = "";
    switch (indexTab) {
      case 0:
        localLink = "/help-center?tab=learners";
        break;
      case 1:
        localLink = "/help-center?tab=teachers";
        break;
      case 2:
        localLink = "/help-center?tab=teams";
        break;
    }
    setEnquiryLink(localLink);
  };

  const fetchData = (searchValue?: string) => {
    let url = "";
    if (enquiryLink === "/help-center?tab=learners") {
      url = "/query/1";
    } else if (enquiryLink === "/help-center?tab=teachers") {
      url = "/query/2";
    } else if (enquiryLink === "/help-center?tab=teams") {
      url = "/query/3";
    }
    fetchRest({
      url,
      method: "GET",
      queryParams: searchValue ? { search: searchValue } : undefined,
    }).then((res) => {
      if (res && res.data && res.data.data) {
        setAccordionData(res.data.data);
      } else {
        setAccordionData([]);
      }
    });
  };
  const [value, setValue] = useState("");

  const debouncedSave = useCallback(
    debounce((nextValue: string) => {
      fetchData(nextValue);
    }, 1000),
    [enquiryLink]
  );

  const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = e.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };

  const { push } = useHistory();
  const router = useRouter();
  useEffect(() => {
    let searchParams = new URLSearchParams(router.pathname);
    let defaultTab: number;
    let searchTab = searchParams.get("tab");
    if (searchTab === "teachers") {
      defaultTab = 1;
    } else if (searchTab === "teams") {
      defaultTab = 2;
    } else {
      defaultTab = 0;
    }
    setDefaultState(defaultTab);
    updateLink(defaultTab);
  }, [router.pathname]);

  useEffect(() => {
    fetchData();
  });
  const onTabChange = (activeTab: number) => {
    setValue("");
    switch (activeTab) {
      case 1:
        router.push("/help-center?tab=teachers");
        updateLink(1);
        break;
      case 2:
        router.push("/help-center?tab=teams");
        updateLink(2);
        break;
      default:
        router.push("/help-center?tab=learners");
        updateLink(0);
    }
  };
  const tabHeaders: ReadonlyArray<{
    key: string;
    TabItemWrapper: React.FC<{ isActive: boolean }>;
  }> = [
    {
      key: "For learners",
      TabItemWrapper: ({ isActive }) => {
        return <TabItem isActive={isActive} text="Learners" />;
      },
    },
    {
      key: "For teachers",
      TabItemWrapper: ({ isActive }) => {
        return <TabItem isActive={isActive} text="Teachers" />;
      },
    },
    {
      key: "Teams",
      TabItemWrapper: ({ isActive }) => {
        return <TabItem isActive={isActive} text="Teams" />;
      },
    },
  ];
  return (
    <div className={`${styles.help_center} accordion-wrapper`}>
      <div className={styles.tab_container}>
        <TabsWrapper
          tabHeaders={tabHeaders}
          activeTabValue={defaultState}
          onTabChange={onTabChange}
        />
      </div>
      <div className={styles.wrapper}>
        <Search
          type="text"
          title="Help center"
          placeholder="Search requests..."
          onChange={onchangeText}
          value={value}
          autoFocus
          autoComplete="off"
        />
        <div className={styles.accordionSection}>
          <AccordionWrapper expandedPanel={[]}>
            {({ expanded, onChange }) => (
              <>
                {accordionData.map((item) => {
                  return (
                    <Accordion
                      key={item.queryId}
                      className={styles.accordion}
                      onChange={(_event, isExpanded) => {
                        onChange({
                          panel: item.queryId,
                          isExpanded,
                        });
                      }}
                      expanded={expanded.includes(item.queryId) ? true : false}
                    >
                      <SummaryWrapper
                        expanded={
                          expanded.includes(item.queryId) ? true : false
                        }
                        Summary={() => {
                          return (
                            <div className={styles.accordionHeaderSection}>
                              <span>{item.query}</span>
                            </div>
                          );
                        }}
                      />
                      <AccordionDetails className={styles.accordionDetails}>
                        <div className={styles.para}>{item.answer}</div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </>
            )}
          </AccordionWrapper>
        </div>
      </div>
      {/* <div data-testid="footer-section">
        <Footer />
      </div> */}
    </div>
  );
};

export default HelpCenter;
