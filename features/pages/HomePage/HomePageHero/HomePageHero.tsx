import Link from "next/link";

import heroImage from "@/public/assets/hero.png";

import { ROUTES } from "@shared/constants";
import { Button, Hero, Typography } from "@shared/ui";

import styles from "./HomePageHero.module.scss";

const { homePageHeroContent } = styles;

const HomePageHero = () => {
  return (
    <Hero alt="Discover GitHub Users" backgroundImage={heroImage}>
      <div className={homePageHeroContent}>
        <Typography weight="bold" size="xl" as="h2" variant="primary" shadow>
          Discover GitHub Users
        </Typography>
        <Button
          as={Link}
          href={ROUTES.FAVORITES.href}
          variant="accent"
          size="lg"
        >
          <Typography variant="primary" size="md">
            Go to Favorites
          </Typography>
        </Button>
      </div>
    </Hero>
  );
};

export default HomePageHero;
