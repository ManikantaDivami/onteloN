import React from "react";
import styles from "./search.module.scss";

interface SearchWrapperProps extends React.HTMLProps<HTMLInputElement> {
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  title: string;
}

const Search: React.FC<SearchWrapperProps> = ({
  type,
  placeholder,
  className,
  onChange,
  title,
  ...rest
}) => {
  return (
    <>
      <div className={styles.search}>
        <div className={styles["search-title"]}>{title}</div>
        <input
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          name="searchHelp"
          {...rest}
          className={
            className
              ? `${styles[className]} ${styles["input-search"]}`
              : styles["input-search"]
          }
        />
      </div>
    </>
  );
};

export default Search;
