import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { mount } from "enzyme"
import { Provider } from "react-redux";
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/firebase-config'

import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: { id: 'nsdifhnisnweiuhr734y87y783' },
        notes: []
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('tests on  <AppRouter />', () => {
    
    test('should call the login if auth', async() => {

        let user;

        await act( async() => {
            const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCredentials.user;

            mount( 
                <Provider store={ store }>
                    <MemoryRouter>
            
                        <AppRouter /> 
            
                    </MemoryRouter>
                </Provider>
            );
        })

        expect( login ).toHaveBeenCalledWith("hI90MG06TVVgJXnVHShkUEv9dij1", null);
    })
    
})
