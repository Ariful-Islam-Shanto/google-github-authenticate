import React, { useState } from 'react';
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase.init';


const LogIn = () => {
    const [user, setUser] = useState(null);


    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider ();
    const githubProvider = new GithubAuthProvider ();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const user = result.user;
            setUser(user);
        })
        .catch(error => {
            console.log("error", error.message);
        })
    }

    const handleGitHubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const user = result.user;
            setUser(user);
        })
        .catch(error => {
            console.log("error", error.message);
        })
    }


    const handleGoogleSignOut = () => {
        signOut(auth) 
        .then(() => setUser(null))
        .catch((err) => console.log(err));
    }
    return (
        <div className='flex items-center flex-col justify-center'>
            <h1>Sign In with google</h1>
            <div className='flex items-center gap-4 justify-center'>

            {user ?
               <button className='border border-blue-500 btn' onClick={handleGoogleSignOut}>Sign Out</button>
            :
            <>
            <button className='border border-blue-500 btn' onClick={handleGoogleSignIn}>Sign In With Google</button>
            <button className='border border-blue-500 btn' onClick={handleGitHubSignIn}>Sign In With GitHub</button>
            </> 
            }
            </div>
            {user && 
            <div>
                <h1 className="text-2xl text-black font-bold">{user?.displayName}</h1>
                <p>{user?.email}</p>
                <img src={user?.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default LogIn;