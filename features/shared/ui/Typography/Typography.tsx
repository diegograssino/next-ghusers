import { getStyleClass } from "@/features/shared/lib/utils";
import { TypographyProps } from "@/types";
import clsx from "clsx";
import styles from "./Typography.module.scss";

const { typography, ellipsis, shadow } = styles;

const Typography = ({
  children,
  as: Tag = "p",
  weight = "normal",
  size = "md",
  truncate: isTruncated = false,
  shadow: hasShadow = false,
  variant = "default",
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
        otherProps.className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
