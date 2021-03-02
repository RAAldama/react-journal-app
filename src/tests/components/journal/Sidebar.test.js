import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount } from "enzyme"
import { Provider } from "react-redux";

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogOut } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogOut: jest.fn(),
}))

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: '23u84u9ejfisd',
        name: 'Albus'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>
);

describe('test on <Sidebar />', () => {
    
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should called the startLogOut', () => {
        wrapper.find('button').prop('onClick')();

        expect( startLogOut ).toHaveBeenCalled();
    })
    
    test('should called the startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    })
    
})
