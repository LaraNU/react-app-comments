import { useState, FormEvent } from 'react';
import styles from './CommentItem.module.css';

type CommentItemProps = {
  id: string;
  userName: string;
  text: string;
  createdAt: Date | null;
  // eslint-disable-next-line no-unused-vars
  submitReply: (commentId: string, replyText: string) => Promise<void>;
  commentReplies?: number;
};

const CommentItem = ({
  id,
  userName,
  text,
  createdAt,
  submitReply,
  commentReplies,
}: CommentItemProps) => {
  const [likes, setLikes] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const toggleInput = () => {
    setIsFormVisible((prev) => !prev);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (replyText.trim() === '') return;
    await submitReply(id, replyText);
    setReplyText('');
    setIsFormVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.commentImg}>{userName[0].toUpperCase()}</div>
      <div className={styles.container}>
        <div className={styles.comment}>
          <div className={styles.row}>
            <p className={styles.name}>{userName}</p>
            {createdAt && (
              <p className={styles.date}>
                {createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
          <p className={styles.text}>{text}</p>
          <div className={styles.rowIcon}>
            <div className={styles.icon}>
              <img onClick={handleLike} src="/bx-like.png" alt="like" />
              <span>{likes}</span>
            </div>
            <div onClick={toggleInput} className={styles.icon}>
              <img src="/bx-comment.png" alt="comments" />
              <span>{commentReplies}</span>
            </div>
          </div>
        </div>

        {isFormVisible && (
          <form onSubmit={submit} className={styles.subanswers}>
            <input
              className={styles.input}
              type="text"
              value={replyText}
              placeholder="Add a reply"
              onChange={(e) => setReplyText(e.target.value)}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
