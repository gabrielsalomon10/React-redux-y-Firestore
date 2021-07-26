import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword, startFacebookLogin } from '../../action/auth';
import { facebookAuthProvider } from '../../firebase/firebaseConfig';


export const Login = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const handleFacebookLogin = () => {
        dispatch( startFacebookLogin() );
    }

    return (
        <>
            <h3 className="auth__title" >Entrar</h3>

            <form onSubmit={ handleLogin }>
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
                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Ingresar   
                </button>

                <hr />
                    <div className="auth__social-networks">
                        <p>Ingresa con tu red social</p>
                        <div 
                            className="google-btn"
                            onClick={ handleGoogleLogin }
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b >Inicia sesión con Google</b>
                            </p>
                        </div>

                        <div 
                            className="google-btn"
                            onClick={ () => handleFacebookLogin( facebookAuthProvider ) }
                        >
                            <div className="facebook-icon-wrapper">
                                <img className="google-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMTz-VzY1FLzOJSP9iJcxVNhJc7LwZ-MT7Q&usqp=CAU" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b style={{ fontSize: 12 }}>Inicia sesión con Facebook</b>
                            </p>
                        </div>
                    </div>

                    <Link 
                        to="/auth/register"
                        className="link"
                    >
                        Crear nueva cuenta
                    </Link>
            </form>

        </>
    )
}
