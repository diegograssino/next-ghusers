import Image from "next/image";
import Link from "next/link";
import { genericBlurData } from "../../lib/constants";
import styles from "./SearchPromoSection.module.scss";

const { searchPromoSection, searchPromoSectionImage } = styles;

const SearchPromoSection = () => {
  return (
    <div className={searchPromoSection}>
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Image
          src="/gh-promo.webp"
          alt="GitHub Users Banner"
          fill
          sizes="(max-width: 28.75rem) 100vw, 28.75rem"
          placeholder="blur"
          blurDataURL={genericBlurData}
          className={searchPromoSectionImage}
        />
      </Link>
    </div>
  );
};

export default SearchPromoSection;
