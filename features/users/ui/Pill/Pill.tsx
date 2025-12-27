import { PillProps } from "@/types";

import { Typography } from "@shared/ui";
import { IconX } from "@tabler/icons-react";

import styles from "./Pill.module.scss";

const { pill, pillLabel, pillIcon } = styles;

const Pill = ({ label, onRemove = () => {} }: PillProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRemove();
    }
  };

  return (
    <button
      type="button"
      className={pill}
      onClick={onRemove}
      onKeyDown={handleKeyDown}
      aria-label={`Remove ${label} filter`}
    >
      <IconX className={pillIcon} />
      <Typography as="span" size="xs" truncate className={pillLabel}>
        {label}
      </Typography>
    </button>
  );
};

export default Pill;
