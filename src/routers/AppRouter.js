import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( user => {
            if(user?.uid){
                dispatch( login(user.uid, user.displayName) );
                setIsLogged(true);    
            }else{
                setIsLogged(false);
            }

            setChecking(false);
        });

    }, [ dispatch, setChecking, setIsLogged ])

    if(checking){
        return(
            <h1>Espere un momento... estamos cargando OwO</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={() => ((!isLogged) ? <AuthRouter /> : <Redirect to="/" />)} />
                    <Route exact path="/" component={() => ((isLogged) ? <JournalScreen /> : <Redirect to="/login" />)} />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
