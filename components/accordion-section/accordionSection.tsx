import { Accordion, AccordionDetails } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import { useHistory } from "react-router-dom";
import fileIcon from "../../public/images/svgs/Group.svg";
import photoshop from "../../public/images/svgs/photoshop.svg";
import warn from "../../public/images/svgs/warn.svg";
import AccordionWrapper from "../../common/accordion-wrapper/accordionWrapper";
import DialogWrapper from "../../common/dialog-wrapper/dialogWrapper";
import UserDetailsForm from "../../common/user-details-form/userDetailsForm";
import Button from "../button/button";
import DialogHeader from "../dialog-header/dialogHeader";
import SessionCard from "../session-card/sessionCard";
import SummaryWrapper from "../summary-wrapper/summaryWrapper";
import styles from "./accordionSection.module.scss";
import Image from "next/image";

const AccordionSection: React.FC<{
  selectedData?: any;
  accordionData: ReadonlyArray<any>;
}> = ({ selectedData, accordionData = [] }) => {
  const [expandAccordion, setExpandAccordion] = useState({
    categoryId: "",
    subCategoryId: "",
  });

  const router = useRouter();

  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const onClickOpen = () => {
    setIsFormOpen(true);
    setTimeout(() => {
      const ele = document.getElementById("user-details-form-wrapper");
      if (ele) {
        ele.scrollIntoView();
      }
    });
  };

  // const { push } = useHistory();

  const [selectedCourse, setSelectedCourse] = useState<any>({});
  const updateLink = (courseId: number) => {
    router.push({ search: `?courseId=${courseId}` });
  };

  const handleClickOpen = (course: any) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    if (isFormOpen) {
      setIsFormOpen(false);
    } else {
      setIsDialogOpen(false);
      router.push({ search: "" });
    }
  };

  useEffect(() => {
    if (selectedData && selectedData.subCategoryId) {
      setExpandAccordion({
        categoryId: accordionData.find((element) => {
          const data = element.subCategory;
          return data.find((item: any) => {
            return item.subCategoryId === selectedData.subCategoryId;
          });
        }).categoryId,
        subCategoryId: selectedData.subCategoryId,
      });
    } else if (selectedData && selectedData.categoryId) {
      setExpandAccordion({
        categoryId: selectedData.categoryId,
        subCategoryId: "",
      });
    }
  }, [selectedData, accordionData]);

  return (
    <div data-testid="accordion">
      {accordionData.length > 0 ? (
        <div className={`${styles["accordionSection "]} accordion-wrapper`}>
          <div className={styles.accordionTitle}>
            Browse our curated resource library
          </div>
          <AccordionWrapper
            expandedPanel={
              expandAccordion.categoryId ? [expandAccordion.categoryId] : []
            }
            className={styles.accordionWrapper}
          >
            {({ expanded, onChange }) => (
              <>
                {accordionData.map((item) => {
                  return (
                    <Accordion
                      key={item.categoryId}
                      className={styles.accordion}
                      onChange={(_event, isExpanded) => {
                        onChange({
                          panel: item.categoryId,
                          isExpanded,
                        });
                      }}
                      expanded={expanded.includes(item.categoryId)}
                    >
                      <SummaryWrapper
                        expanded={expanded.includes(item.categoryId)}
                        Summary={() => {
                          return (
                            <div className={styles.accordionHeaderSection}>
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt="content icon"
                                  className={styles.headerIcon}
                                />
                              ) : (
                                <></>
                              )}
                              <span>{item.name}</span>
                              <span className={styles.blue}>
                                {item.subCategory.length}
                              </span>
                            </div>
                          );
                        }}
                      />
                      <AccordionDetails className={styles.accordionDetails}>
                        <AccordionWrapper
                          className={styles.accordionWrapper}
                          expandedPanel={
                            expandAccordion.subCategoryId
                              ? [expandAccordion.subCategoryId]
                              : []
                          }
                        >
                          {({
                            expanded: isChildExpanded,
                            onChange: onChildChange,
                          }) => (
                            <>
                              {item.subCategory.length > 0 ? (
                                item.subCategory.map((child: any) => {
                                  return (
                                    <Accordion
                                      key={child.subCategoryId}
                                      className={styles.accordionChild}
                                      onChange={(_event, isExpanded) => {
                                        onChildChange({
                                          panel: child.subCategoryId,
                                          isExpanded,
                                        });
                                      }}
                                      expanded={isChildExpanded.includes(
                                        child.subCategoryId
                                      )}
                                    >
                                      <SummaryWrapper
                                        expanded={isChildExpanded.includes(
                                          child.subCategoryId
                                        )}
                                        Summary={() => {
                                          return (
                                            <div
                                              className={
                                                styles.accordionHeaderSection
                                              }
                                            >
                                              {child.imageUrl ? (
                                                <Image
                                                  src={child.imageUrl}
                                                  alt="content icon"
                                                  className={styles.headerIcon}
                                                />
                                              ) : (
                                                <Image
                                                  src={photoshop}
                                                  alt="content icon"
                                                  className={styles.headerIcon}
                                                />
                                              )}
                                              <span>{child.name}</span>
                                              <span className={styles.blue}>
                                                {child.course.length}
                                              </span>
                                            </div>
                                          );
                                        }}
                                      />
                                      <AccordionDetails
                                        className={styles.accordionDetails}
                                      >
                                        <div className={styles.sessionSection}>
                                          {child.course.map((ele: any) => {
                                            return (
                                              <React.Fragment
                                                key={ele.courseId}
                                              >
                                                <SessionCard
                                                  timer={ele.duration}
                                                  header={ele.title}
                                                  onCardClick={() => {
                                                    handleClickOpen(ele);
                                                    updateLink(ele.courseId);
                                                  }}
                                                />
                                              </React.Fragment>
                                            );
                                          })}
                                        </div>
                                      </AccordionDetails>
                                    </Accordion>
                                  );
                                })
                              ) : (
                                <div className={styles.sessionSection}>
                                  {item.course.map((eachSession: any) => {
                                    return (
                                      <React.Fragment
                                        key={eachSession.courseId}
                                      >
                                        <SessionCard
                                          timer={eachSession.duration}
                                          header={eachSession.title}
                                          onCardClick={() => {
                                            handleClickOpen(eachSession);
                                            updateLink(eachSession.courseId);
                                          }}
                                        />
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          )}
                        </AccordionWrapper>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </>
            )}
          </AccordionWrapper>

          <DialogWrapper
            Title={(titleProps) => {
              return (
                <DialogHeader
                  {...titleProps}
                  title={isFormOpen ? t("userDetails.title") : ""}
                />
              );
            }}
            open={isDialogOpen}
            onClose={handleClose}
            isfullScreen={false}
          >
            {isFormOpen ? (
              <div id="user-details-form-wrapper">
                <UserDetailsForm
                  btnText={t("sessionDetails.btn-text")}
                  onSubmitSuccess={() => {
                    setIsDialogOpen(false);
                    setIsFormOpen(false);
                  }}
                  metaData={{ course: selectedCourse }}
                  courseFlag={true}
                />
              </div>
            ) : (
              <div>
                <div className={styles.box}>
                  <div className={styles["box-title"]}>
                    {selectedCourse.title}
                  </div>
                  <div className={styles["box-time"]}>
                    {selectedCourse.duration} hours session
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles["box-subheading"]}>
                    <Image
                      src={fileIcon}
                      alt="file icon"
                      className={styles["box-img"]}
                    />
                    <div>{t("sessionDetails.courseOutline")}</div>
                  </div>
                  <div className={styles["box-content"]}>
                    {selectedCourse.outline}
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles["box-subheading"]}>
                    <Image
                      src={fileIcon}
                      alt="file icon"
                      className={styles["box-img"]}
                    />
                    <div>{t("sessionDetails.preRequisiteKnow")}</div>
                  </div>
                  <div className={styles["box-content"]}>
                    {selectedCourse.prerequisite}
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles["box-subheading"]}>
                    <Image
                      src={fileIcon}
                      alt="file icon"
                      className={styles["box-img"]}
                    />
                    <div>{t("sessionDetails.learningOutcomes")}</div>
                  </div>

                  <div className={styles["box-content"]}>
                    {selectedCourse.outcome}
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles["box-subheading"]}>
                    <Image
                      src={fileIcon}
                      alt="file icon"
                      className={styles["box-img"]}
                    />
                    <div>{t("sessionDetails.softwareHardwareReq")}</div>
                  </div>
                  <div className={styles["box-content"]}>
                    {selectedCourse.requirements ? (
                      <div className={styles["box-content"]}>
                        {selectedCourse.requirements}
                      </div>
                    ) : (
                      <div className={styles["box-content"]}>
                        {"No special requirements"}
                      </div>
                    )}
                  </div>

                  <div className={styles["box-btn"]}>
                    <Button
                      onClick={() => {
                        onClickOpen();
                      }}
                      className={styles["btn-color"]}
                      text={t("sessionDetails.btn-text")}
                      ButtonImg={() => {
                        return (
                          <Image
                            src={warn}
                            alt="apply-now"
                            className={styles["btn-img"]}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </DialogWrapper>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AccordionSection;
