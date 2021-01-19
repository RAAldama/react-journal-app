import React from 'react'
import { NoteScreen } from '../notes/NoteScreen'
//import { BlankPage } from './BlankPage'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <Sidebar />

            <main>
                {/* <BlankPage /> */}

                <NoteScreen />
            </main>
        </div>
    )
}
