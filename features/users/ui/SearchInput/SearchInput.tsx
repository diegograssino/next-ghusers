"use client";
import { SharedContext } from "@/features/shared/contexts/SharedContext";
import { SearchInputProps } from "@/types";
import { IconRotate, IconSearch } from "@tabler/icons-react";
import clsx from "clsx";
import { useContext } from "react";
import styles from "./SearchInput.module.scss";

const {
  searchInputContainer,
  searchInput,
  searchInputIcon,
  searchInputLoading,
} = styles;

const SearchInput = ({
  value,
  onChange = () => {},
  ...otherProps
}: SearchInputProps) => {
  // TODO Should be smaller on mobile
  // TODO make the search bar sticky on top when scrolling
  const { isLoading } = useContext(SharedContext);

  return (
    <div className={searchInputContainer}>
      <input
        value={value}
        onChange={onChange}
        type="text"
        {...otherProps}
        className={searchInput}
        disabled={isLoading}
      />
      <div className={clsx(searchInputIcon, isLoading && searchInputLoading)}>
        {!isLoading ? <IconSearch stroke={2} /> : <IconRotate stroke={2} />}
      </div>
    </div>
  );
};

export default SearchInput;
