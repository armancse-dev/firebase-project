import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';

import initializeAuth from './Firebase/firebase.initialize';

initializeAuth();

const provider = new GoogleAuthProvider();
const providers = new GithubAuthProvider();

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

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

  const handleEmailChange = e =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = e =>{
    setPassword(e.target.value);
  }
  const handleRegistration = e =>{
    console.log(email, password);
    e.preventDefault();
  }

  return (
    <div className="mx-5">

    <form onSubmit={handleRegistration}>
      <h3 className='text-primary'>Pelase Register</h3>
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input onBlur={handleEmailChange} type="email" class="form-control" id="inputEmail3"/>
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input onBlur={handlePasswordChange} type="password" class="form-control" id="inputPassword3"/>
        </div>
      </div>
    
      <div class="row mb-3">
        <div class="col-sm-10 offset-sm-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck1"/>
            <label class="form-check-label" for="gridCheck1">
              Example checkbox
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
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
