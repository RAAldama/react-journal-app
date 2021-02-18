import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
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

        try {
            const doc = await db.collection(`${uid}/journal/notes`).add( newNote );
            dispatch( activeNote(doc.id, newNote) );
            dispatch( addNewNote(doc.id, newNote) );
        } catch (error) {
            console.log(error);
        }

    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {id, ...note}
    }
}

export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
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

export const startUpload = (file) => {
    return async(dispatch, getSate) => {

        const { active:activeNote } = getSate().notes;
        
        Swal.fire({
            title: 'Subiendo imágen',
            text: 'Espere, elegido no muerto',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        
        dispatch( startSaveNote(activeNote) );

        Swal.close();

    }
}

export const startDelete = (id) => {
    return async(dispatch, getSate) => {

        const uid = getSate().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id,
    }
}

export const notesLogout = () => {
    return {
        type: types.notesLogOutClean,
    }
}