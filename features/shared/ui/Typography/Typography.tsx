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
        variant && styles[variant as keyof typeof styles],
        weight && styles[weight as keyof typeof styles],
        size && styles[size as keyof typeof styles],
        truncate && ellipsis,
        otherProps.className
      )}
    >
      {children}
    </Tag>
  );
};
export default Typography;
