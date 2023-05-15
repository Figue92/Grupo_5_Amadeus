import React from 'react'
import Metric from './Metric'

export default function CountProduct() {
    const metrics = [
        {
            title: "Cantidad de Productos",
            color: "primary",
            value: 22,
            icon: "fa-sharp fa-solid fa-desktop"
        },
        {
            title: "Cantidad de Categorias",
            color: "success",
            value: 7,
            icon: "fa-receipt"
        },
        {
            title: "Productos Nuevos",
            color: "warning",
            value: 10,
            icon: "fa-star"
        }
    ]

    return (
        <div className="row">
{
    metrics.map((metric,index) =>{
        return <Metric {...metric} key={ index + metric.title}/>
})
    
}

            
        </div>
    )
}
