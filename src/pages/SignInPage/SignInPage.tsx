import styles from './SignInPage.module.css';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [eyeIcon, setEyeIcon] = useState('/close-eye.svg');

  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [eyeIconConfirm, setEyeIconConfirm] = useState('/close-eye.svg');

  const [errorFirebase, setError] = useState('');
  const [email, setEmail] = useState('');
  const [passwordState, setPassword] = useState('');
  const [passwordConfirmState, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          setError(
            'Invalid credentials provided. Please check your input and try again.'
          );
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordState === passwordConfirmState) {
      handleSignIn(email, passwordState);
    }
  };

  const toggleInputType = (
    currentType: string,
    setType: React.Dispatch<React.SetStateAction<string>>,
    setIcon: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newType = currentType === 'password' ? 'text' : 'password';
    setType(newType);
    setIcon(newType === 'password' ? '/close-eye.svg' : '/open-eye.svg');
  };

  return (
    <div className={styles.new}>
      <div className="wrapper">
        <div className={styles.container}>
          <h2 className={styles.title}>Sign In</h2>
          <p className={styles.text}>
            Ready to become part of the exclusive club? Fill in the details
            below, and let the journey begin!
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                type="text"
                id="email"
                placeholder="Email Address"
                autoComplete="off"
                required
              />
              <label className={styles.label} htmlFor="email">
                Email Address
              </label>
            </div>

            <div className={styles.formGroup}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                type={passwordType}
                id="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <img
                onClick={() =>
                  toggleInputType(passwordType, setPasswordType, setEyeIcon)
                }
                className={styles.eyeIcon}
                src={eyeIcon}
                alt="close-eye"
              />
            </div>

            <div className={styles.formGroup}>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                type={confirmPasswordType}
                id="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="off"
                required
              />
              <label className={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <img
                onClick={() =>
                  toggleInputType(
                    confirmPasswordType,
                    setConfirmPasswordType,
                    setEyeIconConfirm
                  )
                }
                className={styles.eyeIcon}
                src={eyeIconConfirm}
                alt="close-eye"
              />
              {passwordState !== passwordConfirmState && (
                <div className={styles.errorMessage}>
                  Passwords do not match
                </div>
              )}
            </div>

            <div className={styles.errorMessage}>{errorFirebase}</div>
            <button className={styles.formBtn} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <p className={styles.textLink}>
          Don’t have account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
