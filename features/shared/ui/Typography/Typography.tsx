import { TypographyProps } from "@/types";
import { getStyleClass } from "@/features/shared/lib/utils";
import clsx from "clsx";
import styles from "./Typography.module.scss";

const { typography, ellipsis } = styles;

const Typography = ({
  children,
  as: Tag = "p",
  weight = "normal",
  size = "md",
  truncate = false,
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
        truncate && ellipsis,
        otherProps.className
      )}
    >
      {children}
    </Tag>
  );
};
export default Typography;
