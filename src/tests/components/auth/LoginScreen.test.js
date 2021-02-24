import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { mount } from "enzyme"
import { Provider } from "react-redux";

import { LoginScreen } from "../../../components/auth/LoginScreen"
import { startLoginEmailPassword, startLoginGoogle } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLoginGoogle: jest.fn(),
    startLoginEmailPassword: jest.fn('', '')
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>

            <LoginScreen /> 

        </MemoryRouter>
    </Provider>
);

describe('tests on <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })
    
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should begin the action of startLoginGoogle', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect( startLoginGoogle ).toHaveBeenCalled();
    })
    
    test('should begin the action of startLoginEmailPassword', () => {
        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith('','');
    })

})
