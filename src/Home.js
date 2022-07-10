import axios from 'axios'
import React, { useState } from 'react'

function Home() {

    function d(t) {
        var cd = 24 * 60 * 60 * 1000,
            d = Math.floor(t / cd)
        return d
    }
    const [fecha, setFecha] = useState({
        'fechaInicio': ''
    })
    const [fechas, setFechas] = useState([])
    const handleChange = e => {
        const { name, value } = e.target
        setFecha({
            ...fecha,
            [name]: value
        })
    }
    const getDatos = async (e) => {
        e.preventDefault()
        const date = new Date(fecha.fechaInicio.replaceAll('-', '/'))
        const fecha_filtro = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T00:00:00.000Z'
        await axios.get(`https://localhost:7153/api/Usuario_Pases/filtrar_fechas/${fecha_filtro}`)
            .then(r => {
                r.data.map(async coso => {
                    let cosoo = {
                        id: coso.id,
                        usuario: '',
                        tipo: '',
                        pases: 0
                    }
                    await axios.get(`https://localhost:7153/api/Usuarios/${coso.usuario}`)
                        .then(async res => {
                            cosoo.usuario = res.data.nombre
                            await axios.get(`https://localhost:7153/api/Tipos_Pases/${coso.pase}`)
                                .then(res => {
                                    cosoo.tipo = res.data.tipo
                                    console.log(new Date(coso.fechaCompra));
                                    console.log(d(Date.now() - new Date(coso.fechaCompra).getTime()));
                                    cosoo.pases = (res.data.pases)
                                    setFechas(oldArray => [
                                        ...oldArray,
                                        cosoo
                                    ])
                                })
                        })

                })
            })
    }
    

    return (
        <div>
            <form onSubmit={getDatos}>
                <input type="date" name="fechaInicio" onChange={handleChange} />
                <button type="submit">BUSCAR</button>
            </form>
            {fechas.map(fech => (
                <div key={fech.id}>
                    <p>{console.log(fech)}</p>
                    <p></p>
                    <p></p>
                </div>
            ))}
        </div>
    )
}

export default Home