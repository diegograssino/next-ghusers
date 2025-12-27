import clsx from "clsx";

import { getStyleClass } from "@/features/shared/lib/utils";
import { TypographyProps } from "@/types";

import styles from "./Typography.module.scss";

const { typography, ellipsis, shadow, disabled } = styles;
// TODO We should be able to accept all the colors available, is a problem to add every color to the props
// TODO Check why we should use undefined to apply foreground color
// TODO Work in responsive measures, maybe should start bigger
const Typography = ({
  children,
  as: Tag = "p",
  weight = "normal",
  size = "md",
  truncate: isTruncated = false,
  shadow: hasShadow = false,
  variant = "default",
  disabled: isDisabled = false,
  ...otherProps
}: TypographyProps) => {
  return (
    <Tag
      {...otherProps}
      className={clsx(
        typography,
        getStyleClass(styles, variant),
        getStyleClass(styles, weight),
        getStyleClass(styles, size),
        isTruncated && ellipsis,
        hasShadow && shadow,
        isDisabled && disabled,
        otherProps.className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
