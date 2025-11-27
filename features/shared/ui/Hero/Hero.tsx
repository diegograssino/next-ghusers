import { HeroProps } from "@/types/ui";
import Typography from "../Typography/Typography";
import styles from "./Hero.module.scss";

const { hero } = styles;

const Hero = ({ route }: HeroProps) => {
  const title = route.heroText || route.label;

  return (
    <section className={hero}>
      {/* TODO Add background image */}
      {/* TODO This should came as a children */}
      <Typography weight="bold" size="xl" as="h2" variant="primary">
        {title}
      </Typography>
    </section>
  );
};

export default Hero;
