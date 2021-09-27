import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
import PopUPIcon from "../../public/images/svgs/popup-icon.svg";
import RepeatRequest from "../../public/images/svgs/repeatRequest.svg";
import warn from "../../public/images/svgs/warn.svg";
import Button from "../../components/button/button";
import AlertPopupWrapper from "../alert-popup-wrapper/alertPopupWrapper";
import { UseFetch } from "../https";
import InputWrapper from "../input-wrapper/inputWrapper";
import UsePopupContext from "../use-popup-context";
import styles from "./userDetailsForm.module.scss";
import Image from "next/image";

interface CountryType {
  name: string | null;
  dialCode: string;
  codeId: string;
  countryCode: string;
  isValid: boolean;
  errmsg: string;
  isTouched: boolean;
}
interface CategoryType {
  id: string;
  name: string;
  categoryId?: string;
  subCategoryId?: string;
  isValid: boolean;
  errmsg: string;
  isTouched: boolean;
}
const firstNameSchema = yup.object().shape({
  value: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "First Name is not valid")
    .required("First Name is required")
    .max(40, "Maximum allowed characters is 40")
    .test({
      name: "trim",
      message: "First Name is not valid",
      test: (value) => {
        let trimmedValue = value ? value?.trim() : "";
        return trimmedValue ? true : false;
      },
    }),
});
const lastNameSchema = yup.object().shape({
  value: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Last Name is not valid")
    .required("Last Name is required")
    .max(40, "Maximum allowed characters is 40")
    .test({
      name: "trim",
      message: "Last Name is not valid",
      test: (value) => {
        let trimmedValue = value ? value?.trim() : "";
        return trimmedValue ? true : false;
      },
    }),
});
const phoneNumberSchema = yup.object().shape({
  value: yup
    .string()
    .required("Phone Number is required")
    .min(10, "Invalid Phone Number")
    .max(10, "Invalid Phone Number"),
});
const countryCodeSchema = yup.object().shape({
  value: yup.string().required("Please select Code"),
});
const categorySchema = yup.object().shape({
  value: yup.string().required("Please select a Category/Sub Category"),
});
const schemaEmail = yup.object().shape({
  value: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
});
const UserDetailsForm: React.FC<{
  readonly metaData?: { [key: string]: any };
  readonly courseFlag?: boolean;
  readonly needCategory?: boolean;
  readonly teachers?: boolean;
  readonly applyNow?: boolean;
  readonly btnText: string;
  onSubmitSuccess(): void;
}> = ({
  metaData,
  courseFlag = false,
  needCategory = false,
  onSubmitSuccess,
  teachers = false,
  applyNow = false,
  btnText,
}) => {
  const { t } = useTranslation();
  const { fetchRest } = UseFetch();
  // @TODO : this needs to be clubed with data object
  const [value, setValue] = React.useState<CategoryType>({
    errmsg: "Please select the category",
    isValid: false,
    id: "",
    name: "",
    isTouched: false,
  });
  const [valuePh, setValuePh] = React.useState<CountryType>({
    name: null,
    dialCode: "",
    codeId: "",
    countryCode: "",
    isValid: false,
    errmsg: "Please select the code",
    isTouched: false,
  });
  const [optionData, setOptionData] = useState<Array<CategoryType>>([]);
  const [phoneData, setPhoneData] = useState<ReadonlyArray<any>>([]);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [data, setData] = useState({
    fname: { value: "", isValid: false },
    lname: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phno: { value: "", isValid: false },
    course: { value: metaData?.course?.title, isValid: true },
    address: { value: "", isValid: true },
    interest: { value: "", isValid: true },
    skills: { value: "", isValid: true },
    other: { value: metaData?.description, isValid: true },
  });
  const { close, setData: setPopupData } = UsePopupContext();

  var headerContent: string = "";
  var content: string = "";

  const openPopup = (success: boolean) => {
    if (success) {
      if (applyNow) {
        if (teachers) {
          headerContent = t("userDetails.headerContent-teacher");
          content = t("userDetails.content-teacher");
        } else {
          headerContent = t("userDetails.headerContent-student");
          content = t("userDetails.content-student");
        }
      } else {
        headerContent = t("userDetails.headerContent-request");
        content = t("userDetails.content-request");
      }
    } else {
      headerContent = t("userDetails.error-header");
      content = t("userDetails.content-error");
    }
    setPopupData(
      <AlertPopupWrapper
        Img={() => {
          return (
            <Image src={success ? PopUPIcon : RepeatRequest} alt="popup icon" />
          );
        }}
        title={headerContent}
        Buttons={() => {
          return (
            <>
              {success ? (
                <>
                  <Button text={"Got It"} onClick={close}></Button>
                </>
              ) : (
                <>
                  <Button
                    text={"Repeat Request"}
                    onClick={(e) => {
                      submitForm(e);
                      close();
                    }}
                    className={styles.white}
                  ></Button>
                  <Button
                    text={"Cancel"}
                    className={styles["cancel-btn"]}
                    onClick={close}
                  ></Button>
                </>
              )}
            </>
          );
        }}
        Content={() => {
          return (
            <div>
              <p>{content}</p>
            </div>
          );
        }}
      />
    );
  };
  // TODO: make the  validation function common
  const validateAutoComplete = (schema: yup.AnySchema, e?: any) => {
    try {
      schema.validateSyncAt("value", { value: e });
      return { errorMsg: "", isValid: true };
    } catch (error) {
      const localerror = error as any;
      return { errorMsg: localerror.errors[0] as string, isValid: false };
    }
  };
  const autoCompleteOnChange = (newValue: any, key: string) => {
    if (key === "valuePh") {
      let valid = validateAutoComplete(countryCodeSchema, newValue?.codeId);
      if (newValue?.codeId) {
        setValuePh({
          ...newValue,
          isValid: valid.isValid,
          errmsg: valid.errorMsg,
          isTouched: true,
        });
      } else {
        setValuePh({
          dialCode: "",
          codeId: "",
          countryCode: "",
          name: "",
          isValid: valid.isValid,
          errmsg: valid.errorMsg,
          isTouched: true,
        });
      }
    } else if (key === "value") {
      let valid = validateAutoComplete(categorySchema, newValue?.id);
      if (newValue?.id) {
        setValue({
          ...newValue,
          isValid: valid.isValid,
          errmsg: valid.errorMsg,
        });
      } else {
        setValue({
          id: "",
          name: "",
          isValid: valid.isValid,
          errmsg: valid.errorMsg,
          isTouched: true,
        });
      }
    }
  };

  const handleChange = (e: any, key: string) => {
    const ndata = e.value;
    setData((prev) => {
      return {
        ...prev,
        [key]: { value: ndata, isValid: e.isValid ? e.isValid : false },
      };
    });
  };
  const submitForm = (e: any) => {
    setValue((prev) => {
      return { ...prev, isTouched: true };
    });
    setValuePh((prev) => {
      return { ...prev, isTouched: true };
    });
    setIsSubmited(true);
    if (
      data.fname.isValid &&
      data.lname.isValid &&
      data.phno.isValid &&
      data.email.isValid &&
      ((needCategory && value.isValid) || !needCategory) &&
      valuePh.isValid
    ) {
      fetchRest({
        url: "submitRequest",
        method: "POST",
        data: {
          firstName: data.fname.value,
          lastName: data.lname.value,
          email: data.email.value,
          phoneCodeId: valuePh?.codeId,
          phone: data.phno.value,
          address: data.address ? data.address.value : undefined,
          categoryId: value?.categoryId,
          subCategoryId: value?.subCategoryId,
          courseId: metaData?.course?.courseId,
          details: data.other ? data.other.value : undefined,
          skills: data.skills ? data.skills.value : undefined,
          interest: data.interest ? data.interest.value : undefined,
          type: applyNow ? "REGISTER" : "REQUEST",
          registerType: applyNow
            ? teachers
              ? "TEACHER"
              : "STUDENT"
            : undefined,
        },
      })
        .then((res) => {
          openPopup(true);
        })
        .catch((err) => {
          openPopup(false);
        });
    }
  };

  useEffect(() => {
    fetchRest({
      url: "/requestCategoryAndSubCategory",
      method: "GET",
    }).then((res) => {
      if (res && res.data && res.data.data) {
        setOptionData(
          res.data.data.map((each: any) => {
            return {
              id: each.subCategoryId ? each.subCategoryId : each.categoryId,
              ...each,
            };
          })
        );
      } else {
        setOptionData([]);
      }
    });
    fetchRest({
      url: "/phoneCode",
      method: "GET",
    }).then((res) => {
      if (res && res.data && res.data.data) {
        setPhoneData(res.data.data);
        console.log(phoneData);
      } else {
        setPhoneData([]);
      }
    });
  }, []);

  return (
    <>
      <div>
        <div className={styles.box}>
          <form data-testid="userData">
            <div className={styles.input}>
              <div className={styles.block}>
                <div className={styles.label}>
                  {t("userDetails.fname")}{" "}
                  <span className={styles.error}>*</span>
                </div>
                <div>
                  <InputWrapper
                    isSubmited={isSubmited}
                    type={"text"}
                    className={styles["input-styles"]}
                    value={data.fname.value}
                    onChange={(e) => {
                      handleChange(e, "fname");
                    }}
                    schema={firstNameSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    data-testid="fname"
                  />
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles.label}>
                  {t("userDetails.lname")}
                  <span className={styles.error}>*</span>
                </div>
                <div>
                  <InputWrapper
                    isSubmited={isSubmited}
                    type={"text"}
                    className={styles["input-styles"]}
                    value={data.lname.value}
                    onChange={(e) => {
                      handleChange(e, "lname");
                    }}
                    schema={lastNameSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    data-testid="lname"
                  />
                </div>
              </div>
            </div>
            <div className={styles.input}>
              <div className={styles.block}>
                <div className={styles.label}>
                  {t("userDetails.email")}{" "}
                  <span className={styles.error}>*</span>
                </div>
                <div>
                  <InputWrapper
                    isSubmited={isSubmited}
                    type="email"
                    className={styles["input-styles"]}
                    value={data.email.value}
                    onChange={(e) => {
                      handleChange(e, "email");
                    }}
                    schema={schemaEmail}
                    validateOnChange={true}
                    data-testid="email"
                  />
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles.label}>
                  {t("userDetails.phno")}{" "}
                  <span className={styles.error}>*</span>
                </div>
                <div className={styles.ph}>
                  <div className="autocomplete-wrapper phone">
                    <Autocomplete
                      value={valuePh}
                      onChange={(event, newValue) => {
                        autoCompleteOnChange(newValue, "valuePh");
                      }}
                      style={{
                        maxWidth: "192px",
                        width: "100%",
                        height: "48px",
                        outline: "none",
                      }}
                      options={phoneData as CountryType[]}
                      getOptionLabel={(option) =>
                        option.dialCode && option.countryCode
                          ? `${option.dialCode}  (${option.countryCode})`
                          : ``
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {valuePh.isTouched && !valuePh.isValid ? (
                      <div className={styles.error}>{valuePh.errmsg}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <InputWrapper
                      isSubmited={isSubmited}
                      type="text"
                      className={styles["input-styles"]}
                      value={data.phno.value}
                      onChange={(e) => {
                        handleChange(e, "phno");
                      }}
                      schema={phoneNumberSchema}
                      validateOnChange={true}
                      validateOnBlur={true}
                      data-testid="phno"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.label}>{t("userDetails.address")}</div>
            <div>
              <InputWrapper
                type="text"
                className={styles["input-styles"]}
                value={data.address.value}
                onChange={(e) => {
                  handleChange(e, "address");
                }}
                data-testid="address"
              />
            </div>
            <div className={styles.margins}>
              {needCategory ? (
                <>
                  <div className={styles.label}>
                    {t("userDetails.category")}{" "}
                    <span className={styles.error}>*</span>
                  </div>
                  <div className="autocomplete-wrapper">
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        autoCompleteOnChange(newValue, "value");
                      }}
                      handleHomeEndKeys
                      options={optionData}
                      getOptionLabel={(option) => {
                        return option.name;
                      }}
                      style={{ maxWidth: "711px", width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </div>
                  {value.isTouched && !value.isValid ? (
                    <div className={styles.error}>{value.errmsg}</div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <></>
              )}
            </div>

            {courseFlag ? (
              <>
                <div className={styles.label}>
                  {t("userDetails.course")}
                  <span className={styles.error}>*</span>
                </div>
                <div>
                  <InputWrapper
                    disabled
                    type="text"
                    className={styles["input-styles"]}
                    value={data.course.value}
                    onChange={(e) => {
                      handleChange(e, "course");
                    }}
                    data-testid="course"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {applyNow ? (
              <>
                <div className={styles.label}>{t("userDetails.interest")}</div>
                <div>
                  <InputWrapper
                    type="text"
                    className={styles["input-styles"]}
                    value={data.interest.value}
                    onChange={(e) => {
                      handleChange(e, "interest");
                    }}
                    data-testid="interest"
                  />
                </div>
                {teachers ? (
                  <>
                    <div className={styles.label}>
                      {t("userDetails.skills")}
                    </div>
                    <div>
                      <InputWrapper
                        type="text"
                        className={styles["input-styles"]}
                        value={data.skills.value}
                        onChange={(e) => {
                          handleChange(e, "skills");
                        }}
                        data-testid="skills"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <div className={styles.label}>{t("userDetails.other")}</div>
            <textarea
              className={styles["textarea-styles"]}
              value={data.other.value}
              onChange={(e) => {
                handleChange(e.target, "other");
              }}
              data-testid="other"
            ></textarea>
          </form>
          <div className={styles["box-btn"]}>
            <Button
              onClick={submitForm}
              ButtonImg={() => {
                return (
                  <Image
                    src={warn}
                    alt="apply-now"
                    className={styles["btn-img"]}
                  />
                );
              }}
              type="button"
              className={styles["btn-color"]}
              text={btnText}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsForm;
