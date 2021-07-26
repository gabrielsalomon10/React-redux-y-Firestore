/* import { db } from "../firebase/firebaseConfig";
 */import { types } from '../components/types/types';
import { loadNotes } from '../helpers/loadNotes';



/* export const startNewNote = () => {

    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const nombre = document.getElementById('nombre').value;
        const compra = document.getElementById('compra').value;
        const venta = document.getElementById('venta').value;

        const newNote = {
            nombre: nombre,
            compra: compra,
            venta: venta,
            date: new Date().getTime()
        }

        const docRef = await db.collection('list').add( newNote )
            .then( docRef => console.log( 'Agregado', docRef))
            .catch( err => console.log(err)); 
        dispatch( activeNote( newNote ) ); 
    }

} */


export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});


export const startLoadingNotes = ( uid ) => {

    return async(dispatch) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }

}


export const setNotes = ( notes ) => ({

    type: types.notesLoad,
    payload: notes

});


/* export const startSaveNote = ( note ) => {
    
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        console.log(note)        
        await db.doc('list').update( noteToFirestore );
    }
    
} */


export const refreshNote = ( id, note ) => ({

    type: types.notesUpdate,
    payload: {
        id,
        note
    }

});