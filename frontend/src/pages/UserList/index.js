import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// import { Container } from './styles';

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }

    loadUsers()
  }, []);

  return (
    <>
      <Link to="/users/create">Criar usuário</Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Rua</th>
            <th>Nº</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.street}</td>
              <td>{user.address.number}</td>
              <td>
                <Link to={`/users/edit/${user._id}`}>Editar</Link>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}