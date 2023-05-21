import React from 'react'
import NuevosProductos from './NuevosProductos'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { UseFetch } from '../hooks/UseFetch'

export const TablaProductos = () => {
    
    const [state, setState] = useState({
        loading: true,
        productos: []
    })
    useEffect(() => {
        UseFetch('/productos')
            .then(({ ok, data }) => {
                console.log(data);
                const { productos } = data;
                setState({
                    loading: false,
                    productos
                })
            })
            .catch(error => console.error)
    }, []);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Novedad</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
            
             {
            state.loading ?
            <p>Cargando...</p> :
            (state.productos.map(producto=> <NuevosProductos key={producto.id}{...producto} />))
              }
                      
                
            </tbody>
        </table>

    )
}

   


