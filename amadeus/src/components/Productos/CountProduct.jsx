import { useEffect, useState } from 'react'
import Metric from '../Home/Metric'

export const CountProduct = () => {

    const [state, setState] = useState({

        productos: {
            title: "Cantidad de Productos",
            color: "primary",
            value: 0,
            icon: "fa-sharp fa-solid fa-desktop"
        },
        usuarios: {
            title: "Cantidad de Usuarios",
            color: "success",
            value: 0,
            icon: "fa-receipt"
        },
        categorias: {
            title: "Cantidad de Categorias",
            color: "warning",
            value: 0,
            icon: "fa-star"

        }
    })
    useEffect(() => {

fetch('http://localhost:3000/api/apiMain/metrics')
            .then(response => {
               
                return response.json()
               
            })
            .then(({ok,data}) =>{
            
               if(ok){
                const {totalProducts,totalUsers,totalCategories} = data;
                setState({
                    ...state,
                    productos: {
                        ...state.productos,
                        value : totalProducts
                    },
                  
                    usuarios: {
                        ...state.usuarios,
                        value : totalUsers
                    },
                    
                    categorias: {
                        ...state.categorias,
                        value : totalCategories
                    }
                })
               } 
            } )
        
            .catch(error => console.log(error))
    }, []);


    return (
        <div className="row">

            <Metric {...state.productos} />
            <Metric {...state.usuarios} />
            <Metric {...state.categorias} />



        </div>
    )
}
