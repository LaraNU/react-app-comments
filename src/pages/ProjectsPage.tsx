import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  return (
    <>
      <header className={styles.header}>
        <a className={styles.headerLink}>About</a>
        <a className={`${styles.headerLink} ${styles.active}`}>Projects</a>
        <a className={styles.headerLink}>Testimonials</a>
        <a className={styles.headerLink}>Contact</a>
      </header>
      <main className={styles.main}></main>
    </>
  );
};

export default ProjectsPage;
