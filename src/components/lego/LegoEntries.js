import React from 'react';
import { useSelector } from 'react-redux';
import { LegoEntry } from './LegoEntry';

export const LegoEntries = () => {

    /* const entries = [1,2,3,4,5,6,7,8,9,10]; */

    const { notes } = useSelector( state => state.notes );

    return (
        <div className="lego__entries">
            {
                notes.map( note => (
                    <LegoEntry
                        key={ note.id }
                        { ...note }
                    />
                ))
            }
        </div>
    )
}