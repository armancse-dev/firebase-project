import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';

import initializeAuth from './Firebase/firebase.initialize';

initializeAuth();

const provider = new GoogleAuthProvider();
const providers = new GithubAuthProvider();

function App() {

  const [user, setUser] = useState({})
  const auth = getAuth();
  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
    .catch((error) => {
      console.log(error.message);
      
    });
  }
  const handleGithubSignIn = () =>{
    const auth = getAuth();
    signInWithPopup(auth, providers)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
      console.log(user);
    })
    .catch((error) => {
      console.log(error.message);
      
    });
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUser({});
    })
  }

  const handleRegistration = e =>{
    console.log('registration will be added');
    e.preventDefault();
  }

  return (
    <div className="App">

      <form action="" onSubmit={handleRegistration}>
        <h3>Please Register</h3>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" id="" /><br/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="" /><br/>
        <input type="submit" value="Register" />
      </form>
      
      
      <br/><br/><br/><br/><br/>
      <div>-------------------------</div>
     {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>:
        <button onClick={handleSignOut}>Sign Out</button>
      }
      <br/>


      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
          </div>
      }

    </div>
  );
}

export default App;
