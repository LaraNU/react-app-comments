import styles from './Comments.module.css';
import { FormEvent } from 'react';

const Comments = () => {
  const submitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section className={styles.commentsWrapper}>
      <div className={styles.container}>
        <form onSubmit={submitComment} className={styles.commentForm}>
          <div className={styles.commentInput}>
            <input
              type="text"
              name="name"
              placeholder="Add a comment"
              onChange={(e) => console.log(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.commentBtn}>
              Post
            </button>
          </div>
        </form>

        <div className={styles.containerComment}></div>
      </div>
    </section>
  );
};

export default Comments;
