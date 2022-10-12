import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { useState } from 'react';
import './App.css';

import initializeAuth from './Firebase/firebase.initialize';

initializeAuth();

const provider = new GoogleAuthProvider();
const providers = new GithubAuthProvider();

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');



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
    e.preventDefault();
    console.log(email, password);
    if(password.length < 6){
      setError('Password must be at least 6 characters long');
      return;
    }
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Password must contain 2 upper case');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user =  result.user;
      console.log(user);
      setError('');
    })
    .catch(error => {
      setError(error.message);
      
    });
    
  }

  return (
    <div className="mx-5">

    <form onSubmit={handleRegistration}>
      <h3 className='text-primary'>Pelase Register</h3>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required/>
        </div>
      </div>
    
      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck1"/>
            <label className="form-check-label" htmlFor="gridCheck1">
              Example checkbox
            </label>
          </div>
        </div>
      </div>
      <div className="row mb-3 text-danger">{error}</div>
      <button type="submit" className="btn btn-primary">Sign in</button>
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
