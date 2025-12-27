"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import clsx from "clsx";

import { SearchInputProps } from "@/types";

import { useSharedContext } from "@shared/contexts";
import { IconRotate, IconSearch } from "@tabler/icons-react";
import { useFiltersContext } from "@users/contexts";

import styles from "./SearchInput.module.scss";

const {
  searchInputContainer,
  searchInput,
  searchInputInput,
  searchInputIcon,
  searchInputLoading,
} = styles;

const SearchInput = ({ style, onEnterPress }: SearchInputProps) => {
  const { isLoadingUsers, isMobile } = useSharedContext();
  const { loginInputValue, updateFilters } = useFiltersContext();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("login") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const initialCursorPosition =
    loginInputValue.length > 0 ? loginInputValue.length : 0;
  const cursorPositionRef = useRef<number>(initialCursorPosition);

  // DOC On mobile, use local state to prevent search on every keystroke, on desktop, use context value directly (debounced search)
  const [localValue, setLocalValue] = useState(loginInputValue);
  const previousLoginInputValueRef = useRef(loginInputValue);
  const valueOnFocusRef = useRef<string>("");

  useEffect(() => {
    if (isMobile && previousLoginInputValueRef.current !== loginInputValue) {
      setLocalValue(loginInputValue);
      previousLoginInputValueRef.current = loginInputValue;
    }
  }, [loginInputValue, isMobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    cursorPositionRef.current = e.target.selectionStart || 0;

    if (isMobile) {
      setLocalValue(value);
    } else {
      updateFilters({ param: "login", value });
    }
  };

  const handleFocus = () => {
    if (isMobile) {
      // DOC Store the value when input is focused to detect changes on blur
      valueOnFocusRef.current = localValue;
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      // DOC On mobile, trigger search on blur (Done button) if value changed
      const valueChanged = localValue !== valueOnFocusRef.current;
      const valueDifferentFromSearched = localValue !== loginInputValue;

      if (valueChanged && valueDifferentFromSearched) {
        updateFilters({ param: "login", value: localValue });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isMobile) {
        updateFilters({ param: "login", value: localValue });
        inputRef.current?.blur();
      }
      // DOC If onEnterPress callback is provided (e.g., when inside a modal), call it to close the modal
      if (onEnterPress) {
        onEnterPress();
      }
    }
  };

  const hasSearchedRef = useRef(false);
  const previousQueryParamRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  const handleFocusAndCursorPosition = useCallback(
    (shouldFocus = true) => {
      if (inputRef.current) {
        setTimeout(() => {
          if (inputRef.current) {
            const savedPosition = cursorPositionRef.current;

            // DOC On mobile, only restore cursor position to avoid zoom, on desktop, restore focus and cursor position
            if (shouldFocus && !isMobile) {
              inputRef.current.focus();
            }

            // DOC Always restore cursor position if input is already focused
            if (document.activeElement === inputRef.current) {
              inputRef.current.setSelectionRange(savedPosition, savedPosition);
            }
          }
        }, 0);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }
    previousQueryParamRef.current = queryParam;
    isInitializedRef.current = true;
  }, [queryParam]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      return;
    }

    // DOC Track if query param changed (indicating a search was performed)
    const queryParamChanged = previousQueryParamRef.current !== queryParam;
    previousQueryParamRef.current = queryParam;

    // DOC Skip focus on initial page load to prevent mobile zoom or keyboard opening
    if (!hasSearchedRef.current) {
      if (queryParamChanged && queryParam) {
        hasSearchedRef.current = true;
      } else {
        return;
      }
    }

    // DOC Restore focus when query param changes (after search), on mobile, skip focus to prevent zoom (user can tap to focus)
    if (queryParamChanged) {
      handleFocusAndCursorPosition(true);
    }
  }, [queryParam, handleFocusAndCursorPosition]);

  return (
    <div className={searchInput}>
      <div className={searchInputContainer}>
        {/* TODO on focus the input on ios simulator, the page make a little jump to the top */}
        <input
          type="text"
          name="search"
          className={searchInputInput}
          disabled={isLoadingUsers}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={isMobile ? localValue : loginInputValue}
          autoComplete="off"
          placeholder="Search users..."
          aria-label="Search GitHub users by username"
          style={style}
        />
        <div
          className={clsx(
            searchInputIcon,
            isLoadingUsers && searchInputLoading
          )}
        >
          {!isLoadingUsers ? (
            <IconSearch stroke={2} />
          ) : (
            <IconRotate stroke={2} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
