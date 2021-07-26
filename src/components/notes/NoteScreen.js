import React from 'react';
import { LegoStock } from '../lego/LegoStock';
import { NotesAppBar } from './NotesAppBar';


export const NoteScreen = () => {

    

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <LegoStock />
            </div>
        </div>
    )
}
