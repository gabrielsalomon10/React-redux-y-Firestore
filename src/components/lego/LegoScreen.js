import React from 'react'
import { Sidebar } from './Sidebar'
import { NoteScreen } from '../notes/NoteScreen';

export const LegoScreen = () => {

    return (
        <div className="lego__main-content">
            <Sidebar />

            <main>
                <NoteScreen />

                
            </main>
        </div>
        
    )
}
