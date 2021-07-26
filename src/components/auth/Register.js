import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordEmail } from '../../action/auth';
import Swal from 'sweetalert2';


export const Register = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.ui );

    const [ values, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name ,email ,password ,password2 } = values;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordEmail( name, email, password ) );
        }

        
    }

    const isFormValid = () => {

        if( name.trim().length < 3 ) {

            Swal.fire('Error','El campo debe contener 3 o mas caracteres','error');
            return false;

        } else if( !validator.isEmail( email ) ) {

            Swal.fire('Error','El email no es válido','error');
            return false;

        } else if( password !== password2 || password.length < 6 || password2.length < 6 ) {
            Swal.fire('Error','Las contraseñas deben tener mas de 6 caracteres y deben ser iguales','error');
            return false;
        }

        return true;
    }

    return (
        <>
            <h3 className="auth__title" >Entrar</h3>

            <form onSubmit={ handleRegister } >

                {
                    msgError &&
                    (
                    <div className="auth__alert-error">
                        { msgError } 
                    </div>
                    )
                }

                <input 
                    type="name" 
                    placeholder="Nombre"
                    name="name"
                    className="auth__intput"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    className="auth__intput"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder="Contraseña"
                    name="password"
                    className="auth__intput"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder="Confirmar contraseña"
                    name="password2"
                    className="auth__intput"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    /* disabled={ true } */
                >
                    Registrarse   
                </button>

                <hr />

                    <Link 
                        to="/auth/login"
                        className="link"
                    >
                        Ya estás registrado?
                    </Link>
            </form>

        </>
    )
}
