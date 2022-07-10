import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

function Usuario() {


  const [usuario, setUsuario] = useState({
    id: 0,
    nombre_Usuario: ''
  })
  const [usuarios, setUsuarios] = useState([])

  const handleChange = e => {
    const { name, value } = e.target
    setUsuario({
      ...usuario,
      [name]: value
    })
  }

  const onCrearUsuario = async (e) => {
    e.preventDefault()
    delete usuario.id
    await axios.post('https://localhost:7153/api/Usuarios', usuario)
      .then(r => {
        getUsuarios()
      })
  }

  const onClickDelete = async a => {
    await axios.delete(`https://localhost:7153/api/Usuarios/${a}`)
      .then(r => {
        getUsuarios()
      })
  }
  
  const getUsuarios = useCallback(async () => {
    await axios.get('https://localhost:7153/api/Usuarios')
      .then(r => {
        setUsuarios(r.data)
      })
      .catch(e => {
        console.log(e)
      })
  },
    [],
  )

  useEffect(() => {
    return () => {
      getUsuarios()
    }
  }, [getUsuarios])

  return (
    <>
      <form method='post' onSubmit={onCrearUsuario}>
        <h2>CREAR USUARIO</h2>
        <input type="text" placeholder='Nombre' name='nombre_Usuario' onChange={handleChange} />
        <button type='submit'>CREAR</button>
      </form>
      <div>
        <h2>VER USUARIOS</h2>
        {usuarios.map(usuario => (
          <div key={usuario.id}>
            <p>{usuario.id}</p>
            <p>{usuario.nombre_Usuario}</p>
            <button onClick={() => onClickDelete(usuario.id)}>DELETE</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Usuario