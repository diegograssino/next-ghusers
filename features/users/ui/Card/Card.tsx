import { Typography } from "@/features/shared/ui";
import { CardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import FavsWidget from "../FavsWidget/FavsWidget";
import styles from "./Card.module.scss";

const { card, cardContent, cardOptions } = styles;

const Card = ({ user }: CardProps) => {
  // TODO Add more info to the card
  // TODO Improve card design
  // TODO The image should have a placeholder and a better loading strategy
  // TODO The cards are shuffling on hover, more noticeable on safari, seems to be the border

  return (
    <Link href={`/${user.id}`} data-testid="card">
      <article className={card}>
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={150}
          height={150}
          priority
        />
        <div className={cardContent}>
          <Typography as="h3" weight="bold" size="lg" truncate>
            {user.login}
          </Typography>
        </div>
        <div className={cardOptions}>
          <FavsWidget id={user.id} />
        </div>
      </article>
    </Link>
  );
};

export default Card;
