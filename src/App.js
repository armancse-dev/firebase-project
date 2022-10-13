import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile,FacebookAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import './App.css';

import initializeAuth from './Firebase/firebase.initialize';

initializeAuth();

const provider = new GoogleAuthProvider();
const providers = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);



  const [user, setUser] = useState({})

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

  const handleFacebookSignIn = () =>{
    signInWithPopup(auth,facebookProvider)
    .then(result=>{
      const {displayName, email, photoURL} = result.user;
      console.log(result.user);
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
      console.log(user);
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUser({});
    })
  }

  const toggleLogin =e => {
    setIsLogin(e.target.checked);
  }

  const handleNameChange = e =>{
    setName(e.target.value);
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
    if(isLogin){
      processLogin(email, password);
    }
    else{
      registerNewUser(email, password);
    }

  }

  const processLogin = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setError('');
    })
    .catch(error =>{
      setError(error.message);
    })
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user =  result.user;
      console.log(user);
      setError('');
      verifyEmail();
      setUserName();
    })
    .catch(error => {
      setError(error.message);
      
    });
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(result =>{
      console.log(result);
    })
  }

  const handleResetPassword = () =>{
    sendPasswordResetEmail(auth, email)
    .then(result => {

    })
  }

  return (
    <div className="mx-5">

    <form onSubmit={handleRegistration}>
      <h3 className='text-primary'>Pelase {isLogin ? 'Login' : 'Register'}</h3>

      { !isLogin && <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input onBlur={handleNameChange} type="text" className="form-control" id="inputName" required/>
        </div>
      </div>}


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
            <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
            <label className="form-check-label" htmlFor="gridCheck1">
              Alreday Registerd? 
            </label>
          </div>
        </div>
      </div>
      <div className="row mb-3 text-danger">{error}</div>
      <button type="submit" className="btn btn-primary">{isLogin?'Login' : 'Register'}</button><br/>
      <button onClick={handleResetPassword} type='button' className='btn btn-secondary btn-sm'>Reset Password</button>
    </form>
          
      
      <br/><br/><br/><br/><br/>
      <div>-------------------------</div>
     {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
          <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
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
