import { PillProps } from "@/types";
import { Typography } from "@shared/ui";
import { IconX } from "@tabler/icons-react";
import styles from "./Pill.module.scss";

const { pill, pillLabel, pillIcon } = styles;

const Pill = ({ label, onRemove = () => {} }: PillProps) => {
  return (
    <div className={pill} onClick={onRemove}>
      <IconX className={pillIcon} />
      <Typography as="span" size="xs" truncate className={pillLabel}>
        {label}
      </Typography>
    </div>
  );
};

export default Pill;
