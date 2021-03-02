import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount } from "enzyme"
import { Provider } from "react-redux";

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active: {
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        }
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>
);

describe('tests on <NoteScreen />', () => {
    
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should iniate activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Olis again OwO'
            }
        })

        expect( activeNote ).toHaveBeenLastCalledWith( 1234, {body: 'Mundo', title: 'Olis again OwO', id: 1234, date: 0} );
    })
    
})
