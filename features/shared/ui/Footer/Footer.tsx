import Container from "../Container/Container";
import Typography from "../Typography/Typography";
import styles from "./Footer.module.scss";

const { footer, footerContainer, footerHighlighted } = styles;

const Footer = () => {
  return (
    <footer className={footer} data-testid="footer">
      <Container>
        <div className={footerContainer}>
          <Typography as="h2" size="lg" weight="bold" variant="primary">
            Github <span className={footerHighlighted}>Users</span>
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
