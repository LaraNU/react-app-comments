import styles from './CommentForm.module.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  query,
  orderBy,
  updateDoc,
  arrayUnion,
  doc,
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import CommentItem from '../CommentItem/CommentItem';

type Reply = {
  id: string;
  text: string;
  createdAt: Timestamp | null;
  userName: string;
};

type Comment = {
  id: string;
  text: string;
  createdAt: Timestamp | null;
  userName: string;
  replies?: Reply[];
};

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    const fetchComments = async () => {
      const commentsCollection = collection(db, 'comments');
      const commentsQuery = query(
        commentsCollection,
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(commentsQuery);

      const commentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt || null,
        userName: doc.data().userName || 'Anonymous',
        replies: doc.data().replies || [],
      })) as Comment[];

      setComments(commentsList);
    };

    fetchComments();
    return () => unsubscribe();
  }, []);

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post comments');
      navigate('/signin');
      return;
    }

    if (comment.trim() === '') return;

    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        text: comment,
        createdAt: serverTimestamp(),
        userName: user.displayName || user.email || 'Anonymous',
        replies: [],
      });

      const newCommentSnapshot = await getDoc(docRef);
      const newComment = {
        id: newCommentSnapshot.id,
        text: comment,
        createdAt: newCommentSnapshot.data()?.createdAt || null,
        userName: newCommentSnapshot.data()?.userName || 'Anonymous',
        replies: [],
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setComment('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const submitReply = async (commentId: string, replyText: string) => {
    const commentRef = doc(db, 'comments', commentId);
    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      createdAt: Timestamp.now(),
      userName: user?.displayName || user?.email || 'Anonymous',
    };

    try {
      await updateDoc(commentRef, {
        replies: arrayUnion(newReply),
      });

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        )
      );
    } catch (error) {
      console.error('Error adding reply: ', error);
    }
  };

  return (
    <section className={styles.commentsWrapper}>
      <div className={styles.container}>
        <form onSubmit={submitComment} className={styles.commentForm}>
          <div className={styles.commentInput}>
            <input
              type="text"
              value={comment}
              placeholder="Add a comment"
              onChange={(e) => setComment(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.commentBtn}>
              Post
            </button>
          </div>
        </form>

        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.containerComment}>
              <CommentItem
                id={comment.id}
                userName={comment.userName}
                text={comment.text}
                createdAt={comment.createdAt?.toDate() || null}
                submitReply={submitReply}
                commentReplies={comment.replies?.length}
              />

              {comment.replies && comment.replies.length > 0 && (
                <ul className={styles.repliesList}>
                  {comment.replies.map((reply) => (
                    <li key={comment.id} className={styles.containerComment}>
                      <CommentItem
                        key={reply.id}
                        id={reply.id}
                        userName={reply.userName}
                        text={reply.text}
                        createdAt={reply.createdAt?.toDate() || null}
                        submitReply={submitReply}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CommentForm;
