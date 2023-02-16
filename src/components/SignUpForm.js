import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '../utils/firebaseUtils';
import { addDoc, collection } from 'firebase/firestore';
import { Validator } from '../utils/formValidator';
import FormInput from './FormInput';

const SignUpForm = ({ setRegistered }) => {
  const [validator, setValidator] = useState(new Validator());
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usersCollection = collection(firestore, 'users');

  useEffect(() => {
    const addNewUser = async () => {
      if (validator.status === 'success') {
        await addDoc(usersCollection, {
          firstname: validator.firstname,
          lastname: validator.lastname,
          email: validator.email.value,
          password: validator.password.value,
          // Clean up
        });
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        setRegistered(true);
      }
    };
    addNewUser();
    // eslint-disable-next-line
  }, [validator]);

  const signUpNewUser = async (e) => {
    e.preventDefault();
    const firstname = firstNameRef.current.value.trim();
    const lastname = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    // Form validation
    setValidator(new Validator(firstname, lastname, email, password, 'check'));
  };

  return (
    <section className="form-section">
      <div className="ads-block">
        <p>
          <b>Try it free 7 days</b> then $20/mo, thereafter
        </p>
      </div>
      <form onSubmit={signUpNewUser} className="signup-form container">
        <FormInput
          ref={firstNameRef}
          placeholder="First Name"
          valid={validator.status === 'idle' || validator.firstname}
          errorMsg="First Name cannot be empty"
        />
        <FormInput
          ref={lastNameRef}
          placeholder="Last Name"
          valid={validator.status === 'idle' || validator.lastname}
          errorMsg="Last Name cannot be empty"
        />
        <FormInput
          ref={emailRef}
          placeholder="Email Address"
          valid={
            validator.status === 'idle' ||
            (!validator.email.empty && validator.email.valid)
          }
          errorMsg={
            validator.email.empty
              ? 'Please fill in your email'
              : 'Looks like this is not an email'
          }
        />
        <FormInput
          ref={passwordRef}
          placeholder="Password"
          valid={
            validator.status === 'idle' ||
            (!validator.password.empty && validator.password.valid)
          }
          errorMsg={
            validator.password.empty
              ? 'Password cannot be empty'
              : 'Password should contain 6-20 characters (at least one uppercase, one lowercase & one digit)'
          }
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
