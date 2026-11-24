import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        const quiereLoguearse = window.confirm(
          'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?'
        );
        navigate(quiereLoguearse ? '/login' : '/');
      } else {
        setError('Error al registrar el usuario. Verificá los datos.');
      }
    }
  };

  return (
    <div>
      <h2>Crear una nueva cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;