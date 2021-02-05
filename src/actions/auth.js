import Swal from 'sweetalert2';

import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { uiFinishLoading, uiStartLoading } from "./ui";
import { notesLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {
        dispatch( uiStartLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password).then(
            ({ user }) => {
                dispatch( login(user.uid, user.displayName) );
                dispatch( uiFinishLoading() )
            }
        ).catch(
            e => {
                console.log(e);
                dispatch( uiFinishLoading() );

                Swal.fire('Error al iniciar sesión Dx', e.message, 'error');
            }
        )
    }
}

export const startRegisterEmailPassword = (email, password, username) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            async( {user} ) => {
                await user.updateProfile({ displayName: username });

                dispatch( login(user.uid, user.displayName) );
            }
        ).catch(
            e => {
                console.log(e);
                
                Swal.fire('Error al iniciar sesión Dx', e.message, 'error');
            }
        )
    }
}

export const startLoginGoogle = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider ).then(
            ( {user} ) => {
                dispatch( login(user.uid, user.displayName) );
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

export const startLogOut = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( notesLogout() );
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}