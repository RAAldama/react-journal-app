import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { login, logout, startLoginEmailPassword, startLogOut } from "../../actions/auth"
import { types } from "../../types/types";

const uid = 'TESTING';
const displayName = 'Albus';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {}

let store = mockStore(initState);

describe('tests on the auth actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })
    
    test('should create the respective action, login and logout', () => {
        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({type: types.login, payload: {uid, displayName}});
        expect(logoutAction).toEqual({type: types.logout});
    })

    test('should realize the startLogOut', async() => {
        await store.dispatch( startLogOut() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({ type: types.logout });
        expect( actions[1] ).toEqual({ type: types.notesLogOutClean });
    })
    
    test('should begin the startLoginEmailPassword', async() => {
        await store.dispatch( startLoginEmailPassword('test@testing.com','123456') );

        const actions = store.getActions();
        expect( actions[1] ).toEqual({ 
            type: types.login, 
            payload: { 
                uid: 'hI90MG06TVVgJXnVHShkUEv9dij1', 
                displayName: null 
            } 
        });
    })
    
    
})
