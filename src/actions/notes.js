import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async(dispatch, getSate) => {

        const uid = getSate().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );
        dispatch( activeNote(doc.id, newNote) );

    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {id, ...note}
    }
}

export const startLoginNotes = (uid) => {
    return async (dispatch) => {

        const notes = await loadNotes(uid);
        dispatch ( setNotes(notes) );
        
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async(dispatch, getSate) => {

        const uid = getSate().auth.uid;

        if(!note.url){
            delete note.url;
        }

        const note2Firestore = {...note};

        delete note2Firestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(note2Firestore);

        dispatch( refreshNote(note.id, note) );
        Swal.fire('Nota salvada', note.title, 'success');

    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: { id, note }
    }
}