import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { startLoginEmailPassword, startLoginGoogle } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {

  const dispatch = useDispatch()
  const { loading } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    email: '',
    password: ''
  });

  const {email, password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch( startLoginEmailPassword(email, password) );
  }

  const handleGoogleLogin = () => {
    dispatch( startLoginGoogle() );
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form className="animate__animated animate__fadeIn" onSubmit={handleLogin}>
        <input 
          className="auth__input" 
          type="text" 
          placeholder="Correo electrónico" 
          name="email" 
          value={email} 
          onChange={handleInputChange}
          autoComplete="off" 
        />
        <input 
          className="auth__input" 
          type="password" 
          placeholder="Contraseña" 
          name="password" 
          value={password} 
          onChange={handleInputChange}
          />

        <button type="submit" className="btn btn-primary btn-block" disabled={ loading }>
          Ingresar
        </button>

        <div className="auth__social-networks">
          <p>Unete con tus redes sociales :D</p>

          <div className="google-btn" onClick={ handleGoogleLogin }>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>

            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          ¿No tienes cuenta? ¡Crea una aquí!
        </Link>
        
      </form>
    </>
  );
};
