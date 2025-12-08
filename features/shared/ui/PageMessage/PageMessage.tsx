import { PageMessageProps } from "@/types";

import Typography from "../Typography/Typography";
import { pageMessages } from "./PageMessage.constants";
import styles from "./PageMessage.module.scss";

const { pageMessage } = styles;

const PageMessage = ({ message }: PageMessageProps) => {
  return (
    <div className={pageMessage}>
      <Typography weight="bold" size="xl" as="h2">
        {pageMessages[message]}
      </Typography>
    </div>
  );
};

export default PageMessage;
