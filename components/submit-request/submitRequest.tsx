import React, { useState } from "react";
// import { useTranslation } from "next-i18next";
import * as yup from "yup";
import tick from "../../public/images/svgs/tick.svg";
import DialogWrapper from "../../common/dialog-wrapper/dialogWrapper";
import InputWrapper from "../../common/input-wrapper/inputWrapper";
import UserDetailsForm from "../../common/user-details-form/userDetailsForm";
import Button from "../button/button";
import DialogHeader from "../dialog-header/dialogHeader";
import styles from "./submitRequest.module.scss";
import Image from "next/image";

const schema = yup.object().shape({
  value: yup
    .string()
    .required("Question is required")
    .test({
      name: "trim",
      message: "Question is not valid",
      test: (value) => {
        let trimmedValue = value ? value?.trim() : "";
        return trimmedValue ? true : false;
      },
    }),
});

const SubmitRequest: React.FC = () => {
  // const { t } = useTranslation();
  let [categoryValue, setCategoryValue] = useState<{ [key: string]: any }>({});

  let [query, setQuery] = useState<{
    readonly value: string;
    readonly isValid: boolean;
    readonly isTouched: boolean;
    readonly errorMessage: string;
  }>({
    value: "",
    isValid: false,
    errorMessage: "",
    isTouched: false,
  });
  const onChangeQuery = (e: any) => {
    setQuery({
      ...e,
      isTouched: true,
    });
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setQuery((prev) => {
      console.log(prev);
      return {
        ...prev,
        isTouched: true,
      };
    });
    if (query && query.isValid) {
      setIsOpen(true);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <form className={styles["submit-form"]}>
        <InputWrapper
          className={styles["submit-text"]}
          type="text"
          isSubmited={query.isTouched}
          schema={schema}
          onChange={onChangeQuery}
          value={query.value}
          validateOnChange={true}
          placeholder="Formulate your question...Ie, I need help with excel tables..."
        />
        <div className={styles["apply-btn"]}>
          <Button
            text="Submit a request"
            type="button"
            onClick={() => {
              handleClickOpen();
            }}
            ButtonImg={() => {
              return (
                <Image
                  src={tick}
                  alt="apply-now"
                  className={styles["btn-img"]}
                />
              );
            }}
          />
        </div>
      </form>
      <DialogWrapper
        Title={(titleProps) => {
          return (
            <DialogHeader
              {...titleProps}
              title="We need a little more info from you.."
            />
          );
        }}
        open={isOpen}
        onClose={handleClose}
        isfullScreen={false}
        fullHeightDialog={true}
      >
        <UserDetailsForm
          btnText="Submit a request"
          metaData={{
            categoryId: categoryValue.categoryId,
            subCategoryId: categoryValue.subCategoryId,
            description: query.value,
          }}
          courseFlag={false}
          needCategory={true}
          onSubmitSuccess={() => {
            handleClose();
          }}
        />
      </DialogWrapper>
    </>
  );
};

export default SubmitRequest;
