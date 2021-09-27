import { debounce } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import timeIcon from "../../public/images/svgs/time-icon.svg";
import Image from "next/image";
import { UseFetch } from "../../common/https";
import styles from "./searchSection.module.scss";

interface FilterDataInterface {
  description: string;
  imageUrl: string;
  name: string;
  subCategoryId: string;
}

const SearchSection: React.FC<{
  onClickHandle: Function;
}> = ({ onClickHandle }) => {
  let [filterData, setFilterData] = useState<
    ReadonlyArray<FilterDataInterface>
  >([]);
  let [searchValue, setSearchValue] = useState("");
  const { fetchRest } = UseFetch();

  const onChangeHandler = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSave(value);
  };

  const debouncedSave = useCallback(
    debounce((nextValue: React.SetStateAction<string>) => {
      fetchRest({
        url: "searchCatalogue",
        method: "GET",
        queryParams: { search: nextValue },
      }).then((res) => {
        const data = res.data.data;
        setFilterData(data);
      });
    }, 1000),
    []
  );

  const onClickHandler = (item: FilterDataInterface) => {
    const value = item.name;
    setSearchValue(value);
    setFilterData([]);
    const titleElement = document.getElementById("accordion-section");
    if (titleElement && titleElement.scrollIntoView) {
      titleElement.scrollIntoView({ behavior: "smooth" });
    }
    onClickHandle(item);
  };

  return (
    <div className={styles["landing-page__search"]}>
      <input
        type="text"
        name="searchLearn"
        id={styles.searchLearn}
        placeholder="I want to learn..."
        value={searchValue}
        onChange={onChangeHandler}
        autoFocus
        autoComplete="off"
      />
      {searchValue.length > 0 && filterData.length > 0 ? (
        <ul className={styles.list}>
          {filterData.map((item) => (
            <li key={item.name} onClick={() => onClickHandler(item)}>
              <Image src={timeIcon} alt="time-icon" />
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default SearchSection;
