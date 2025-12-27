import Image from "next/image";

import clsx from "clsx";

import { genericBlurData } from "@/features/users/ui";
import { HeroProps } from "@/types";

import styles from "./Hero.module.scss";

const { hero, heroBackgroundImage } = styles;

const Hero = ({ backgroundImage, alt, ...otherProps }: HeroProps) => {
  const { children } = otherProps;
  const hasBackgroundImage = backgroundImage !== undefined;

  return (
    <section className={clsx(hero, otherProps.className)} {...otherProps}>
      {hasBackgroundImage && (
        <Image
          src={backgroundImage}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={genericBlurData}
          className={heroBackgroundImage}
        />
      )}
      {children}
    </section>
  );
};

export default Hero;
