import styles from './ProjectsPage.module.css';
import background from '/image.jpg';
import Header from '../../components/Header/Header';
import CommentForm from '../../components/Comments/CommentForm';

const ProjectsPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className={styles.main}>
        <section className={styles.sectionDesc}>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={background} alt="computer" />
          </div>
          <h2 className={styles.subtitle}>
            A small selection of <span>recent projects</span>
          </h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            ligula quis lacus fermentum, vitae vulputate sem tristique. Nunc
            justo orci, porta in luctus eget, ultrices vitae justo. Mauris
            dignissim laoreet mi, a commodo libero volutpat non. Maecenas
            aliquam sed leo eu blandit. Nam vehicula rhoncus libero ut
            porttitor. Proin urna tortor, bibendum at faucibus auctor, cursus
            sit amet odio. In hac habitasse platea dictumst. Proin ac tortor vel
            tortor auctor pellentesque eget nec nisl. Phasellus pulvinar varius
            tortor sed sagittis. Etiam aliquam consectetur purus fringilla
            varius. Maecenas nec dolor dolor. Cras faucibus malesuada luctus.
            Nam auctor vel tortor eget congue. Fusce porta imperdiet ante
            scelerisque ullamcorper. Pellentesque luctus ullamcorper lectus
            faucibus fringilla. Aenean tristique efficitur iaculis. Aliquam eu
            egestas mi, quis tristique justo. Donec eu ante at tellus eleifend
            pellentesque. Curabitur fermentum lectus eu erat porta, id sagittis
            sem aliquet. Integer aliquet vehicula lectus, nec finibus nibh
            tincidunt eu. Vestibulum quis dui nisi. In a pharetra enim, id
            blandit quam. Sed lobortis ligula enim, egestas aliquam purus
            facilisis et. Phasellus vitae leo a ligula commodo ultrices sed non
            elit.
          </p>
        </section>
        <CommentForm />
      </main>
    </div>
  );
};

export default ProjectsPage;
