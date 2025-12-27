"use client";

import { Suspense } from "react";

import { SearchWidgetProps } from "@/types";

import { useModalContext } from "@shared/contexts";
import { Button, Drawer, Typography } from "@shared/ui";
import { IconSearch } from "@tabler/icons-react";
import { useFiltersContext } from "@users/contexts";

import SearchInput from "./SearchInput/SearchInput";
import styles from "./SearchWidget.module.scss";

const {
  searchWidgetMobileButton,
  searchWidgetMobileButtonContainer,
  searchWidgetMobileButtonIcon,
  searchWidgetDesktop,
} = styles;

const SearchWidget = ({ variant = "header" }: SearchWidgetProps) => {
  const { openModal, closeAllModals } = useModalContext();
  const { loginInputValue } = useFiltersContext();

  const handleSearchButtonClick = () => {
    openModal(
      <Drawer>
        <Suspense fallback={<div style={{ fontSize: "16px" }}>Loading...</div>}>
          <SearchInput
            style={{ fontSize: "16px" }}
            onEnterPress={closeAllModals}
          />
        </Suspense>
      </Drawer>,
      {
        ariaLabel: "Search drawer",
      }
    );
  };

  // DOC If variant is drawer, render SearchInput with 16px inline style to prevent mobile zoom
  if (variant === "drawer") {
    return (
      <Suspense fallback={<div style={{ fontSize: "16px" }}>Loading...</div>}>
        <SearchInput
          style={{ fontSize: "16px" }}
          onEnterPress={closeAllModals}
        />
      </Suspense>
    );
  }

  // DOC Render both versions, CSS will handle visibility based on breakpoint
  return (
    <>
      <Button
        variant="unstyled"
        onClick={handleSearchButtonClick}
        className={searchWidgetMobileButton}
        aria-label="Open search"
      >
        <div className={searchWidgetMobileButtonContainer}>
          <Typography
            as="span"
            size="xs"
            variant={loginInputValue ? undefined : "muted"}
          >
            {loginInputValue || "Search users ..."}
          </Typography>
          <IconSearch className={searchWidgetMobileButtonIcon} />
        </div>
      </Button>
      <div className={searchWidgetDesktop}>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchInput />
        </Suspense>
      </div>
    </>
  );
};

export default SearchWidget;
