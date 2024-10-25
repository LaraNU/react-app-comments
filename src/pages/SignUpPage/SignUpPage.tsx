import styles from './SignUpPage.module.css';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [eyeIcon, setEyeIcon] = useState('/close-eye.svg');

  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [eyeIconConfirm, setEyeIconConfirm] = useState('/close-eye.svg');

  const [errorFirebase, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordState, setPassword] = useState('');
  const [passwordConfirmState, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already in use. Please try another one.');
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
      handleSignUp(email, passwordState, name);
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
          <h2 className={styles.title}>Sign Up</h2>
          <p className={styles.text}>
            Ready to become part of the exclusive club? Fill in the details
            below, and let the journey begin!
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                type="text"
                id="name"
                placeholder="Name"
                autoComplete="off"
                required
              />
              <label className={styles.label} htmlFor="name">
                Full Name
              </label>
            </div>

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
              Sign Up
            </button>
          </form>
        </div>
        <p className={styles.textLink}>
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
