import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <>
      <h3 className="auth__title">Register</h3>

      <form>
        <input className="auth__input" type="text" placeholder="Usuario" name="name" autoComplete="off" />
        <input className="auth__input" type="text" placeholder="Correo electrónico" name="email" autoComplete="off" />
        <input className="auth__input" type="password" placeholder="Contraseña" name="password" />
        <input className="auth__input" type="password" placeholder="Confirmar contraseña" name="password2" />

        <button type="submit" className="btn btn-primary btn-block mb-5">Registrar</button>

        <Link className="link" to="/auth/login">
            ¿Con cuenta? ¡Ingresa aquí!
        </Link>

       
      </form>
    </>
    )
}
