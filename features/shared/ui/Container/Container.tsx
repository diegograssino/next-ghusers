import { ContainerProps } from "@/types";
import { forwardRef } from "react";
import styles from "./Container.module.scss";

const { container } = styles;

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, as: Tag = "div", ...otherProps }, ref) => {
    return (
      <Tag ref={ref} {...otherProps} className={container}>
        {children}
      </Tag>
    );
  }
);

Container.displayName = "Container";

export default Container;
