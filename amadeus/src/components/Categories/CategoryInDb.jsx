import { useEffect, useState } from 'react'
import { UseFetch } from '../../hooks/UseFetch'
import { CategoryCard } from './CategoryCard';



export const CategoryInDb = () => {

    const [state, setState] = useState({
        loading: true,
        categories: []
    })
    useEffect(() => {
        UseFetch('/categorias')
            .then(({ ok, data }) => {
                console.log(data);
                const { categories } = data;
                setState({
                    loading: false,
                    categories
                })
            })
            .catch(error => console.error)
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Categorias</h5>
                </div>
                <div className="card-body">
                    <div className="row">

                        {
                            state.loading ?
                                <p>Cargando...</p> :
                                state.categories.map((category, index) => <CategoryCard key={category.nameCategory + index}{...category} />)
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
