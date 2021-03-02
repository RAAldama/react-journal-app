import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";

import { startRegisterEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui );

  const [formValues, handleInputChange] = useForm({
    name: 'albus',
    email: 'lel@lel.com',
    password: '123456',
    password2: '123456',
  });

  const {name, email, password, password2} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if( isFormValid() ){
      dispatch( startRegisterEmailPassword(email, password, name) );
    }
  }

  const isFormValid = () => {
    if( name.trim().length === 0 ){
      const error = 'El NOMBRE es obligatorio';
      dispatch( setError(error) );

      return false;

    } else if( !validator.isEmail(email) ) {
      const error = 'El CORREO debe de ser válido';
      dispatch( setError(error) );

      return false;

    } else if( password !== password2 || password.length < 5 ){
      const error = 'Revise la CONTRASEÑA';
      dispatch( setError(error) );

      return false;
    }

    dispatch( removeError() );

    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form className="animate__animated animate__fadeIn" onSubmit={handleRegister}>
        
        {
          msgError &&
          <div className="auth__alert-error">
            { msgError }
          </div>
        }

        <input
          className="auth__input"
          type="text"
          placeholder="Usuario"
          name="name"
          value={name} 
          onChange={handleInputChange}
          autoComplete="off"
        />
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
        <input
          className="auth__input"
          type="password"
          placeholder="Confirmar contraseña"
          name="password2"
          value={password2} 
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Registrar
        </button>

        <Link className="link" to="/auth/login">
          ¿Con cuenta? ¡Ingresa aquí!
        </Link>
      </form>
    </>
  );
};
