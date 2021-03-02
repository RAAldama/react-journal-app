import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount } from "enzyme"
import { Provider } from "react-redux";

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {}

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'OwO',
    body: 'UwU',
    url: 'https://imagendeprueba.com/photo.jpg'
}

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry {...note} /> 
    </Provider>
);

describe('tests on <JournalEntry />', () => {
    
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should active the note', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith( activeNote( note.id, {...note} ) );
    })
    
})
