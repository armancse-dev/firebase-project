import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import './App.css';

import initializeAuth from './Firebase/firebase.initialize';

initializeAuth();

const provider = new GoogleAuthProvider();

function App() {
  const handleGoogleSignIn = () =>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
