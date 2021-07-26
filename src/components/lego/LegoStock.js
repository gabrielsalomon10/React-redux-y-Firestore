import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { db } from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';


export const LegoStock = ( date ) => {

    const [ descripcion, setDescripcion ] = useState('');
    const [ edicionMode, setedicionMode ] = useState(null);
    const [ idLine, setIdLine ] = useState('');
    const [ monto, setMonto ] = useState('');
    const [ lista, setLista ] = useState([]);
    const [ error, setError ] = useState('');


    useEffect( () => {
        const getList = async() => {
            const { docs } = await db.collection('list').get();
            const newArray = docs.map( item => ({
                id: item.id,
                ...item.data()
            }))        
            setLista( newArray );
        }
        getList();
    }, []);

    const setList = async(e) => {
        e.preventDefault();

        if( descripcion === 0 ) {
            setError(Swal.fire('Error', 'Debe completar el campo nombre', 'error'));
            return
        } 
        if( !monto.trim() ) {
            return setError(Swal.fire('Error', 'Debe completar el campo monto', 'error'));
        } 

        const list = {
            descripcion: descripcion,
            monto: monto,
            noteDate
        }

        try {
            const data = await db.collection('list').add( list );
            const { docs } = await db.collection('list').get();
            const newArray = docs.map( item => ({
                id: item.id,
                ...item.data()
            }))        
            setLista( newArray );
        Swal.fire({
            title: 'Añadido con éxito',
            text: 'Guardado',
            icon: 'info',
        });
        } catch (error) {
            console.log(error)
        }
        setDescripcion('');
        setMonto('');

    }


    const deleteLine = async( id ) => {

        try {
            await db.collection('list').doc( id ).delete();
            const { docs } = await db.collection('list').get();
            const newArray = docs.map( item => ({
                id: item.id,
                ...item.data()
            }))        
            setLista( newArray );
            Swal.fire({
                title: 'Estas seguro/a?',
                text: "Se perderá despues de esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Borrado!',
                    'Has borrado tu archivo.',
                    'success'
                  )
                }
              });
        } catch (error) {
            console.log(error);
        }

    }


    const updateLine = async( id ) => {

        const idLine = await db.collection('list').doc(id).get();
        const { descripcion, monto } = idLine.data();
        setDescripcion( descripcion );
        setMonto( monto );
        /* setIdDescripcion( id ); */
        setedicionMode(true);

        try {
            const { descripcion, monto } = idLine.data();
            setDescripcion( descripcion );
            setMonto( monto );
            setIdLine( idLine.id );
            setedicionMode(true);
        } catch (error) {
            console.log(error);
        } 


    }


    const setUpdate = async( e, id ) => {
        e.preventDefault();
        if( !descripcion.trim() ) {
            setError('El campo descripcion esta vacio');
        }

        if( !monto.trim() ) {
            setError('El campo monto esta vacio');
        }

        const lineUpdated = {
            descripcion: descripcion,
            monto: monto
        }

        try {
            await db.collection('list').doc( idLine ).set( lineUpdated );
            const { docs } = await db.collection('list').get();
            const newArray = docs.map( item => ({
                id: item.id,
                ...item.data()
            }))        
            setLista( newArray );
        } catch (error) {
            console.log(error);
        }

        setDescripcion('');
        setMonto('');
        setIdLine('');
        setedicionMode(false);

    }

    const noteDate = moment(date).format('DD/MM/YYYY');

    return (
        <>
            <div className="container">
            <div className="row">
            <div className="col-6">
                <h2>Descripcion</h2>
                <form 
                    className="form-group"
                    onSubmit={ edicionMode ? setUpdate : setList }
                >
                    <input 
                        type="text"
                        value={ descripcion }
                        className="form-control mt-3" 
                        placeholder="Descripcion.."
                        onChange={ (e) => { setDescripcion( e.target.value )} }
                    />

                    <input 
                        type="text"
                        value={ monto }
                        className="form-control mt-3"
                        placeholder="Monto"
                        onChange={ (e) => { setMonto( e.target.value ) } }
                    />
                    {
                        edicionMode ?
                        (
                            <input type="submit" value="Editar" className="new" />
                        )
                        :
                        (
                            <input type="submit" value="Registrar" className="new" />
                        ) 
                    }
                    
                </form>
                {
                    error ? 
                    (
                        <div><p> { error } </p></div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className="col">
                <h2>Listado</h2>
                {
                    lista.length !== 0 ?
                    (
                        lista.map( item => (
                            <li 
                                className="list-group-item m" key={ item.key }> { item.descripcion } <br /> { item.monto} <br /> { noteDate }
                                <button onClick={ ( id ) => { deleteLine( item.id ) }  } className="boton-delete" >Eliminar</button>
                                <button onClick={ ( id ) => { updateLine( item.id ) }  } className="boton-edit" >Editar</button>
                             </li>
                        ))
                    )
                    :
                    (
                        <span>No hay registros aún</span>
                    )
                }
                    </div>
                </div>
            </div>
        </>
    )
}
