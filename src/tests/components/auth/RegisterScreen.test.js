import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>

            <RegisterScreen />

        </MemoryRouter>
    </Provider>
)

describe('tests on <RegisterScreen />', () => {
    
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should make the respective dispatch of action', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                value: '',
                name:'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        expect( actions[0] ).toEqual({ type: types.uiSetError, payload: 'El CORREO debe de ser válido' });
    })

    test('should render the danger box with error', () => {
        
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'El CORREO debe de ser válido'
            }
        }
        
        const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
        
                    <RegisterScreen />
        
                </MemoryRouter>
            </Provider>
        )

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );

    })
    
})
