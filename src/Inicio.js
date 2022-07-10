import React, { useEffect } from 'react'

import axios from 'axios'



function Inicio() {



  const onCrearUsuario = async () => {

   

  }



  useEffect(() => {

    const getUsuarios = async () => {

      await axios.get('https://localhost:7153/api/Usuarios')

        .then(r => {

         

        })

    }

    return () => {

      getUsuarios()

    }

  }, [])

 



  return (

    <>

      <form onSubmit={() => onCrearUsuario()}>

        <h2>CREAR USUARIO</h2>

        <input type="text" placeholder='Nombre' />

        <button type='submit'>CREAR</button>

      </form>

      <div>

        <h2>VER USUARIOS</h2>

        {}

      </div>

    </>

  )

}



export default Inicio