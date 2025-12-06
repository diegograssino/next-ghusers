import { CardProps } from "@/types";
import { Typography } from "@shared/ui";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { genericBlurData } from "../../lib/constants";
import FavsWidget from "../FavsWidget/FavsWidget";
import styles from "./Card.module.scss";

const {
  card,
  cardContent,
  cardOptions,
  cardSkeleton,
  cardImage,
  cardImageContainer,
  cardContentatSymbol,
} = styles;

const Card = ({ user }: CardProps) => {
  // TODO The cards are shuffling on hover, more noticeable on safari, seems to be the border

  return (
    <Link href={`/${user.id}`} data-testid="card">
      <article className={card}>
        <div className={cardImageContainer}>
          <Image
            src={user.avatarUrl}
            alt={user.login}
            fill
            priority
            sizes="(min-width: 48rem) 9.375rem, 19.4375rem"
            placeholder="blur"
            blurDataURL={genericBlurData}
            className={cardImage}
          />
        </div>
        <div className={cardContent}>
          <Typography as="h3" weight="bold" size="md" truncate>
            <span className={cardContentatSymbol}>@</span>
            {user.login}
          </Typography>
        </div>
        <div className={cardOptions}>
          <FavsWidget id={user.id} user={user} />
        </div>
      </article>
    </Link>
  );
};

export default Card;

export const CardSkeleton = () => {
  return (
    <article className={clsx(card, cardSkeleton)} data-testid="card-skeleton">
      <div className={cardImageContainer}>
        <div className={cardImage} />
      </div>
      <div className={cardContent} />
      <div className={cardOptions} />
    </article>
  );
};
