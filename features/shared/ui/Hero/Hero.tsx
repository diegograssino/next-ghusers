import { genericBlurData } from "@/features/users/ui";
import { HeroProps } from "@/types";
import clsx from "clsx";
import Image from "next/image";
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
          //  TODO Check sizes
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
