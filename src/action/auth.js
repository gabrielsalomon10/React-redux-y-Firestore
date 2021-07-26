import Swal from 'sweetalert2';
import validator from 'validator';
import { facebookAuthProvider, firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../components/types/types';
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch(finishLoading());
                if( !validator.isEmail( email ) ){
                    Swal.fire('Error','El email es incorrecto', 'error');
                } else if( !validator.isStrongPassword( password ) ) {
                    Swal.fire('Error','La contraseña es incorrecta', 'error');
                }
            });
    }
}

export const startRegisterWithEmailPasswordEmail = ( name, email, password ) => {

    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {
               await user.updateProfile({ displayName: name })
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                console.log(e);
            });
    }

}


export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
            });
    }
}

export const startFacebookLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( facebookAuthProvider )
            .then( userCred => {
                dispatch( login( userCred.user ) );
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
});