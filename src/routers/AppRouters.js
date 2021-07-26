import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";

import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from "react-redux";
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { AuthRouters } from './AuthRouters';
import { LegoScreen } from '../components/lego/LegoScreen';
import { login } from '../action/auth';
import { setNotes, startLoadingNotes } from '../action/notes';
import { loadNotes } from '../helpers/loadNotes';


export const AppRouters = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState( true );

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => {
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                const notes = await loadNotes( user.uid );
                dispatch( setNotes( notes ) );

                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }
            setChecking( false );
        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if( checking ) {
        <h1>Espere...</h1>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouters }
                    />

                    <PrivateRoute 
                        path="/"
                        exact
                        isAuthenticated={ isLoggedIn }
                        component={ LegoScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
