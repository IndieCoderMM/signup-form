import { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import UserList from './components/UserList';

function App() {
  const [registered, setRegistered] = useState(false);

  return (
    <>
      <main>
        <section className="intro-section">
          <h1 className="title">Learn to code by watching others</h1>
          <p className="description">
            See how experienced developers solve problems in real-time. Watching
            scripted tutorials is great, but understanding how developers think
            is invaluable.
          </p>
        </section>

        {registered ? (
          <UserList />
        ) : (
          <SignUpForm setRegistered={setRegistered} />
        )}
      </main>
      <footer>
        <p>
          Solution to Challenge:
          <br />
          <a
            href="https://www.frontendmentor.io/challenges/"
            target="_blank"
            rel="noreferrer"
          >
            Intro component with sign up form
          </a>
        </p>
        <p>
          Created with React & Firestore
          <br />
          Author:{' '}
          <a
            href="https://github.com/IndieCoderMM"
            target="_blank"
            rel="noreferrer"
          >
            IndieCoderMM
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
