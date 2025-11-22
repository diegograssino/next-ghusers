import { TypographyProps } from "@/types";
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
        styles[variant],
        styles[weight],
        styles[size],
        truncate && ellipsis,
        otherProps.className
      )}
    >
      {children}
    </Tag>
  );
};
export default Typography;
