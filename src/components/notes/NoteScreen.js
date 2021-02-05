import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    //El doble punto es para renombrar la variable sacada del selector
    const { active:note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {title, body, id} = formValues;
    const activeId = useRef( note.id );
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( startDelete(id) );
    }

    useEffect(() => {

        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset])

    useEffect(() => {
        
        dispatch( activeNote(formValues.id, {...formValues}) );

    }, [formValues, dispatch])

    return (
        <div className="notes__main">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    className="notes__title-input" 
                    type="text" 
                    placeholder="Its called Lothric..."
                    name="title" 
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea 
                    className="notes__text-area" 
                    placeholder="Did u get good?" 
                    name="body" 
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    note.url && 
                    <div className="notes__image">
                        <img src={note.url} alt="note-img" />
                    </div>
                }
            </div>

            <button className="btn btn-danger" onClick={handleDelete}>
                Borrar Nota
            </button>

        </div>
    )
}
