import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a className={styles.headerLink}>About</a>
      <a className={`${styles.headerLink} ${styles.active}`}>Projects</a>
      <a className={styles.headerLink}>Testimonials</a>
      <a className={styles.headerLink}>Contact</a>
    </header>
  );
};

export default Header;
