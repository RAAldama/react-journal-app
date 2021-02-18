import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startNewNote, startSaveNote, startUpload } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/prueba.jpg'
    } )
}))
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '6bLRFNK2oHcMHTUXqv0q',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore(initState);

describe('tests with notes-actions', () => {

    beforeEach( ()=>{
        store = mockStore(initState)
    } )
    
    test('should create a new note wuth startNewNote', async() => {
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive, 
            payload: {
                id: expect.any(String), 
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew, 
            payload: {
                id: expect.any(String), 
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //Eliminar archivos de Firestore
        const docId = actions[0].payload.id;
        await db.doc(`TESTING/journal/notes/${docId}`).delete();
    })
    
    /*
    test('should load the notes starLoadingNotes', async() => {        
        await store.dispatch( startLoginNotes('TESTING') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload ).toMatchObject(expected);

    })
    */

    test('should upgrade the note, startSaveNote', async() => {
        const note = {
            id: '6bLRFNK2oHcMHTUXqv0q',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        // const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        // expect( docRef.data().title ).toBe( note.title );
    })
    
    test('should upload the entries url, startUpload', async() => {
        
        const file = new File([], 'foto.jpg');
        await store.dispatch( startUpload(file) );
        
        // const docRef = await db.doc('/TESTING/journal/notes/6bLRFNK2oHcMHTUXqv0q').get();
        // expect( docRef.data().url ).toBe( 'https://hola-mundo.com/prueba.jpg' );
    })
    
})
