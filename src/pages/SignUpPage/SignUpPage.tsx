import styles from './SignUpPage.module.css';
import React, { useState } from 'react';

const SignUpPage = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [eyeIcon, setEyeIcon] = useState('/close-eye.svg');

  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [eyeIconConfirm, setEyeIconConfirm] = useState('/close-eye.svg');

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
    <div className="wrapper">
      <div className={styles.container}>
        <h2 className={styles.title}>Sign up</h2>
        <p className={styles.text}>
          Ready to become part of the exclusive club? Fill in the details below,
          and let the journey begin!
        </p>
        <form>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              autoComplete="off"
            />
            <label htmlFor="name">Full Name</label>
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="email"
              placeholder="Email Address"
              autoComplete="off"
            />
            <label htmlFor="name">Email Address</label>
          </div>
          <div className={styles.formGroup}>
            <input
              type={passwordType}
              id="password"
              placeholder="Password"
              autoComplete="off"
            />
            <label htmlFor="name">Password</label>
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
              type={confirmPasswordType}
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
            />
            <label htmlFor="name">Confirm Password</label>
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
          </div>
          <button className={styles.formBtn} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <p className={styles.textLink}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignUpPage;
