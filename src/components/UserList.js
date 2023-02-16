import React from 'react';
import { collection } from 'firebase/firestore';
import { firestore } from '../utils/firebaseUtils';
import { useCollection } from 'react-firebase-hooks/firestore';

const UserList = () => {
  const usersCollection = collection(firestore, 'users');
  const [users] = useCollection(usersCollection);
  const userData = users
    ? users.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    : [];
  console.log(userData);
  return (
    <section>
      <div className="container">
        <h2>Registered Users</h2>
        <ul className="user-list">
          {userData &&
            userData.map((d) => (
              <li key={d.id}>
                <div>
                  <div className="profile-logo">{d.data.firstname[0]}</div>
                  <span>{d.data.firstname}</span>
                </div>
                <span>{d.data.email}</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default UserList;
