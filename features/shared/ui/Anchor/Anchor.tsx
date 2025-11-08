import { AnchorProps } from "@/types";
import Link from "next/link";
import Typography from "../Typography/Typography";
import styles from "./Anchor.module.scss";

const { anchor } = styles;

const Anchor = ({
  children,
  weight = "normal",
  size = "md",
  variant = "default",
  ...otherProps
}: AnchorProps) => {
  return (
    <Link {...otherProps} className={anchor}>
      <Typography weight={weight} size={size} variant={variant} as="span">
        {children}
      </Typography>
    </Link>
  );
};

export default Anchor;
