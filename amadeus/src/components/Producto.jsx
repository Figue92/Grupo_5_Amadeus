import React from 'react'
import NuevosProductos from './NuevosProductos'

export default function TablaProductos() {

    const productos =[
{
    id: 1,
    name: "MotherBoard INTEL",
    precio: 20000,
    categoria: "Motherboards",
    marca: "intel",
    descuento: 5,
    novedad: true

},
{
    id:2,
    name: "MotherBoard INTEL",
    precio: 20000,
    categoria: "Motherboards",
    marca: "intel",
    descuento: 5,
    novedad: true

},
{
    id:3,
    name: "MotherBoard INTEL",
    precio: 20000,
    categoria: "Motherboards",
    marca: "intel",
    descuento: 5,
    novedad: true

}
    ]
    return (
        <div className='row'>
        {
        productos.map((producto, index) =>{
           return <NuevosProductos {...producto}key = {index + producto.name}/>
          
        })
    }
        </div>
    )
  
}
