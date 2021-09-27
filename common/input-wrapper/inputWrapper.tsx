import { debounce } from "@material-ui/core";
import React, {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import ValidateInput from "../validate-fields/validateFields";
import styles from "./inputWrapper.module.scss";
import Image from "next/image";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  readonly validateOnBlur?: boolean;
  readonly validateOnChange?: boolean;
  readonly inputIcon?: string;
  readonly onChange: FormEventHandler<HTMLInputElement>;
  readonly schema?: any;
  readonly onBlur?: any;
  readonly isSubmited?: any;
  readonly iconClick?: MouseEventHandler<HTMLImageElement> | undefined;
}

const InputWrapper: React.FC<InputProps> = ({
  onChange,
  onBlur,
  value,
  className,
  validateOnBlur,
  validateOnChange,
  inputIcon,
  iconClick = () => {},
  isSubmited,
  schema,
  ...rest
}) => {
  const [localValue, setlocalValue] = useState({
    value: value,
    errorMsg: "",
    isValid: true,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let inputState: { errorMsg: string; isValid: boolean } = {
      errorMsg: "",
      isValid: true,
    };
    if (validateOnChange) {
      inputState = ValidateInput(schema, input);
    }
    setlocalValue({ value: input, ...inputState });
    debouncedOnChange({ value: input, ...inputState });
  };
  useEffect(() => {
    let inputState: { errorMsg: string; isValid: boolean } = {
      errorMsg: "",
      isValid: true,
    };
    if (isSubmited) {
      inputState = ValidateInput(schema, localValue.value);
    }
    setlocalValue((prev) => {
      return { ...prev, ...inputState };
    });
  }, [isSubmited]);

  const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let inputState: { errorMsg: string; isValid: boolean } = {
      errorMsg: "",
      isValid: true,
    };
    if (validateOnBlur) {
      inputState = ValidateInput(schema, input);
    }
    if (onBlur) {
      onBlur({ value: input, ...inputState });
    }
    // debouncedOnChange({ value: input, ...inputState })
  };

  const debouncedOnChange = useCallback(
    debounce((inputData) => {
      onChange(inputData);
    }, 1500),
    []
  );

  return (
    <div className={styles["input-wrapper"]}>
      <input
        onChange={onChangeHandler}
        value={localValue.value}
        onBlur={onBlurHandler}
        {...rest}
        className={
          className
            ? `${styles["common-input-style"]} ${className}`
            : styles["common-input-style"]
        }
      />
      {inputIcon ? (
        <Image
          src={inputIcon}
          alt="input icon"
          onClick={iconClick}
          className={styles["input-icon"]}
        />
      ) : (
        ""
      )}
      {!localValue.isValid ? (
        <div className={styles["error-msg"]}>{localValue.errorMsg}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputWrapper;
