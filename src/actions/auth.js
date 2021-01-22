import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {

        setTimeout(() => {
            dispatch( login(123, 'Albus') );
        }, 3500);
        
    }
}

export const startLoginGoogle = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider ).then(
            ( {user} ) => {
                dispatch( login(user.uid, user.displayName) )
            }
        );
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}