"use client";
import { SharedContext } from "@/features/shared/contexts/SharedContext";
import { useFiltersContext } from "@/features/users/contexts/FiltersContext";
import { IconRotate, IconSearch } from "@tabler/icons-react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import styles from "./SearchInput.module.scss";

const {
  searchInputContainer,
  searchInputInnerContainer,
  searchInput,
  searchInputIcon,
  searchInputLoading,
} = styles;

const SearchInput = () => {
  const { isLoading } = useContext(SharedContext);
  const { loginInputValue, updateFilters } = useFiltersContext();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("login") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const initialCursorPosition =
    loginInputValue.length > 0 ? loginInputValue.length : 0;
  const cursorPositionRef = useRef<number>(initialCursorPosition);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    cursorPositionRef.current = e.target.selectionStart || 0;
    updateFilters({ param: "login", value: e.target.value });
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
          type="text"
          name="search"
          className={searchInput}
          disabled={isLoading}
          onChange={handleChange}
          ref={inputRef}
          value={loginInputValue}
          autoComplete="off"
          autoFocus={true}
          placeholder="Search users..."
        />
        <div className={clsx(searchInputIcon, isLoading && searchInputLoading)}>
          {!isLoading ? <IconSearch stroke={2} /> : <IconRotate stroke={2} />}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
