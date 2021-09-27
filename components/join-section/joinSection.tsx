import React, { useState } from "react";
import Button from "../button/button";
import applyBtn from "../../public/images/svgs/apply-arrow.svg";
import styles from "./joinSection.module.scss";
// import { useTranslation } from "next-i18next";
import DialogWrapper from "../../common/dialog-wrapper/dialogWrapper";
import UserDetailsForm from "../../common/user-details-form/userDetailsForm";
import DialogHeader from "../dialog-header/dialogHeader";
import { useLocation } from "react-router-dom";
import Image from "next/image";

const JoinSection: React.FC = () => {
  const [isTeachers, setIsTeachers] = useState<boolean>(false);
  // const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsDialogOpen(true);
    if (pathname === "/expert") {
      setIsTeachers(true);
    } else {
      setIsTeachers(false);
    }
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const { pathname } = useLocation();

  return (
    <>
      <div className={styles["join-section"]}>
        <div className={styles["join-section__title"]}>
          Join the ontelo community{" "}
          <span className={styles["purple-color"]}>today</span>.
        </div>
        <div className={styles["join-section__btn"]}>
          <Button
            text="Apply Now"
            onClick={() => {
              handleOpen();
            }}
            ButtonImg={() => {
              return (
                <Image
                  src={applyBtn}
                  alt="apply-now"
                  className={styles["btn-img"]}
                />
              );
            }}
          />
        </div>
      </div>
      <DialogWrapper
        Title={DialogHeader}
        open={isDialogOpen}
        onClose={handleClose}
        isfullScreen={false}
        fullHeightDialog={true}
      >
        <UserDetailsForm
          btnText="Apply Now"
          teachers={isTeachers}
          applyNow={true}
          courseFlag={false}
          onSubmitSuccess={() => {
            handleClose();
          }}
        />
      </DialogWrapper>
    </>
  );
};

export default JoinSection;
