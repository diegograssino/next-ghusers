"use client";
import { SharedContext } from "@/features/shared/contexts/SharedContext";
import { SearchInputProps } from "@/types";
import { IconRotate, IconSearch } from "@tabler/icons-react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./SearchInput.module.scss";

const {
  searchInputContainer,
  searchInputInnerContainer,
  searchInput,
  searchInputIcon,
  searchInputLoading,
} = styles;

const SearchInput = ({
  value,
  totalCount,
  onChange = () => {},
}: SearchInputProps) => {
  const { isLoading } = useContext(SharedContext);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const initialCursorPosition = value.length > 0 ? value.length : 0;
  const cursorPositionRef = useRef<number>(initialCursorPosition);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    cursorPositionRef.current = e.target.selectionStart || 0;
    onChange(e);
  };

  const handleFocusAndCursorPosition = () => {
    if (inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const savedPosition = cursorPositionRef.current;
          inputRef.current.setSelectionRange(savedPosition, savedPosition);
        }
      }, 0);
    }
  };

  useEffect(() => {
    handleFocusAndCursorPosition();
  }, [queryParam]);

  useEffect(() => {
    // Restore focus when loading finishes, helps on firt search
    if (!isLoading) {
      handleFocusAndCursorPosition();
    }
  }, [isLoading]);

  return (
    <div className={searchInputContainer}>
      <div className={searchInputInnerContainer}>
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          name="search"
          autoFocus={true}
          className={searchInput}
          disabled={isLoading}
          placeholder="Search users ..."
        />
        <div className={clsx(searchInputIcon, isLoading && searchInputLoading)}>
          {!isLoading ? <IconSearch stroke={2} /> : <IconRotate stroke={2} />}
        </div>
      </div>
      <SearchResults totalCount={totalCount} />
    </div>
  );
};

export default SearchInput;
