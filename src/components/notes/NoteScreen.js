import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    className="notes__title-input" 
                    type="text" 
                    placeholder="Its called Lothric..." 
                />

                <textarea className="notes__text-area" placeholder="Did u get good?"></textarea>

                <div className="notes__image">
                    <img src="https://images7.alphacoders.com/109/1098539.png" alt="note-img" />
                </div>
            </div>
        </div>
    )
}
