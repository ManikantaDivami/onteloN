import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
// import { useTranslation } from "next-i18next";
import * as yup from "yup";
import PopUPIcon from "../../public/images/svgs/popup-icon.svg";
import RepeatRequest from "../../public/images/svgs/repeatRequest.svg";
import tick from "../../public/images/svgs/tick.svg";
import AlertPopupWrapper from "../../common/alert-popup-wrapper/alertPopupWrapper";
import { UseFetch } from "../../common/https";
import InputWrapper from "../../common/input-wrapper/inputWrapper";
import UsePopupContext from "../../common/use-popup-context";
import ValidateInput from "../../common/validate-fields/validateFields";
import Button from "../button/button";
import styles from "./getInTouch.module.scss";
import Image from "next/image";

const nameSchema = yup.object().shape({
  value: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Name is not valid")
    .required("Name is required")
    .test({
      name: "trim",
      message: "Name is not valid",
      test: (value) => {
        let trimmedValue = value ? value?.trim() : "";
        return trimmedValue ? true : false;
      },
    }),
});

const companyNameSchema = yup.object().shape({
  value: yup
    .string()
    .required("Company is required")
    .test({
      name: "trim",
      message: "Company name is not valid",
      test: (value) => {
        let trimmedValue = value ? value?.trim() : "";
        return trimmedValue ? true : false;
      },
    }),
});

const schemaEmail = yup.object().shape({
  value: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const schema = yup.object().shape({
  value: yup.string().required("Company Location is required"),
});

const GetInTouch = () => {
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [locationData, setLocationData] = useState([]);
  const [value, setValue] = React.useState({
    errmsg: "Company Location is required",
    isValid: true,
    name: "",
    isTouched: false,
    alpha2Code: "",
  });

  useEffect(() => {
    fetchRest({
      method: "GET",
      url: "/phoneCode",
    }).then((res) => {
      if (res?.data?.data) {
        setLocationData(res.data.data);
      } else {
        setLocationData([]);
      }
    });
  }, []);

  // const { t } = useTranslation();
  const { fetchRest } = UseFetch();
  const [data, setData] = useState({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    companyName: { value: "", isValid: false },
    companyLocation: { value: "", isValid: false },
  });
  const { close, setData: setPopupData } = UsePopupContext();

  var headerContent: string = "";
  var content: string = "";
  const openPopup = (success: boolean) => {
    if (success) {
      headerContent = "Request published!";
      content =
        "Thank you! A member of our team will pick up your request and will get back to you asap! Have a good day ahead";
    } else {
      headerContent = "Repeat Request";
      content = "Something went wrong! Could not raise request.";
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

  const handleChange = (e: any, key: string) => {
    const newData = e.value;
    setData((previous) => {
      return {
        ...previous,
        [key]: { value: newData, isValid: e.isValid },
      };
    });
  };

  const submitForm = (e: any) => {
    setIsSubmited(true);
    let validData = ValidateInput(schema, value.name);
    setValue((prev) => {
      return { ...prev, isValid: validData.isValid, isTouched: true };
    });
    setData((prev) => {
      return {
        ...prev,
        companyLocation: { value: value.name, isValid: value.isValid },
      };
    });
    e.preventDefault();
    if (
      data.name.isValid &&
      data.email.isValid &&
      data.companyName.isValid &&
      data.companyLocation.isValid
    ) {
      fetchRest({
        url: "enquiry",
        method: "POST",
        data: {
          name: data.name.value,
          email: data.email.value,
          companyName: data.companyName.value,
          companyLocation: data.companyLocation.value,
        },
      })
        .then((_res) => {
          openPopup(true);
        })
        .catch((err) => {
          openPopup(false);
        });
    }
  };
  return (
    <>
      <form>
        <div className={styles["submit-text"]}>
          <InputWrapper
            isSubmited={isSubmited}
            type={"text"}
            className={styles["submit-text"]}
            placeholder="Your name"
            value={data.name.value}
            onChange={(e) => {
              handleChange(e, "name");
            }}
            schema={nameSchema}
            validateOnChange={true}
          />
        </div>
        <div className={styles["submit-text"]}>
          <InputWrapper
            isSubmited={isSubmited}
            type={"text"}
            className={styles["submit-text"]}
            placeholder="Email"
            value={data.email.value}
            name="email"
            onChange={(e) => {
              handleChange(e, "email");
            }}
            schema={schemaEmail}
            validateOnChange={true}
          />
        </div>
        <div className={styles["submit-text"]}>
          <InputWrapper
            type={"text"}
            isSubmited={isSubmited}
            className={styles["submit-text"]}
            placeholder="Your company name"
            value={data.companyName.value}
            onChange={(e) => {
              handleChange(e, "companyName");
            }}
            schema={companyNameSchema}
            validateOnChange={true}
          />
        </div>
        <div className={styles["form-field2"]}>
          <div className="autocomplete-wrapper location">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                let validData = ValidateInput(schema, newValue?.name);
                if (newValue && newValue.alpha2Code) {
                  setValue((prev) => {
                    return {
                      ...prev,
                      isValid: validData.isValid,
                      name: newValue.name,
                      alpha2Code: newValue.alpha2Code,
                      isTouched: true,
                    };
                  });
                } else {
                  setValue((prev) => {
                    return {
                      ...prev,
                      isValid: validData.isValid,
                      name: "",
                      alpha2Code: "",
                      isTouched: true,
                    };
                  });
                }
              }}
              style={{ width: "100%", height: "48px", outline: "none" }}
              options={locationData}
              getOptionLabel={(option: any) => {
                return option.name;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Your company location"
                />
              )}
            />
            {!value.isValid && value.isTouched ? (
              <div className={styles.error}>{value.errmsg}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles["apply-btns"]}>
          <Button
            text="Send"
            type="button"
            onClick={submitForm}
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
    </>
  );
};

export default GetInTouch;
