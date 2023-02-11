import React, { useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
};

const firebase = initializeApp(config);
const firestore = getFirestore(firebase);

const SignUpForm = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usersCollection = collection(firestore, 'users');
  const signUpNewUser = async (e) => {
    e.preventDefault();
    const firstname = firstNameRef.current.value.trim();
    const lastname = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    if (!(firstname && lastname && email && password)) return;
    await addDoc(usersCollection, {
      firstname,
      lastname,
      email,
      password,
    });
    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };
  return (
    <section className="form-section">
      <div className="ads-block">
        <p>
          <b>Try it free 7 days</b> then $20/mo, thereafter
        </p>
      </div>
      <form onSubmit={signUpNewUser} className="signup-form">
        <input
          ref={firstNameRef}
          type="text"
          className="form-input"
          placeholder="First Name"
        />
        <input
          ref={lastNameRef}
          type="text"
          className="form-input"
          placeholder="Last Name"
        />
        <input
          ref={emailRef}
          type="email"
          className="form-input"
          placeholder="Email Address"
        />
        <input
          ref={passwordRef}
          type="password"
          className="form-input"
          placeholder="Password"
        />
        <button type="submit" className="submit-btn">
          Claim Your Free Trial
        </button>
        <small>
          By clicking the button, you are agreeing to our{' '}
          <a
            href="https://github.com/indiecodermm/signup-form"
            target="_blank"
            rel="noreferrer"
            title="Repo Link"
          >
            <b>Terms and Services</b>
          </a>
        </small>
      </form>
    </section>
  );
};

export default SignUpForm;
