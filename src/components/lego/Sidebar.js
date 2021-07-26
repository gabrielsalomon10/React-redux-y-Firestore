import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../action/auth';
import { LegoEntries } from './LegoEntries';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { displayName } = useSelector( state => state.auth )

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    
     return (
        <aside className="lego__sidebar">
            <div className="lego__sidebar-navbar mb-1">
                <h3>
                    <i className="far fa-grin-alt fa-1x"></i>
                    <span> { displayName }</span>
                </h3>

            <button 
                className="btn"
                onClick={ handleLogout }
            >
                Salir
            </button>
            </div>

            <div 
                className="lego__new-entry"
            >
                <i class="fas fa-balance-scale fa-7x"></i>
                <p className="mt-1">Ultimos añadidos</p>
            </div>

            <LegoEntries />

        </aside>
    )
}
