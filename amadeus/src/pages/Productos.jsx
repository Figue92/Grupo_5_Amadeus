import React from 'react'
import { TablaProductos } from '../components/TablaProductos'
import { useState, useEffect } from 'react'
import { UseFetch } from '../hooks/UseFetch'




export const Productos = () => {
  const [productState, setProductState] = useState({
    loading: true,
    productos: [],
    pages: null,
    currentPage: null

  });
    useEffect(() => {
      UseFetch('/productos?withPagination=true')
        .then(({ ok, data }) => {
         
          const { productos } = data;
          setProductState({
            loading: false,
            productos: data.productos,
            pages : data.pages,
            currentPage : data.currentPage
          })
        })
        .catch(error => console.error)
    }, []);

    const handleGetPage = (page) => {
      UseFetch(`/productos?withPagination=true&page=${page}`)
      .then(({ ok, data }) => {
       ok &&
        setProductState({
          loading: false,
          productos: data.productos,
          pages : data.pages,
          currentPage : data.currentPage,
         
        })
      })
      .catch(error => console.error)
  }


  const [categoryState, setCategoryState] = useState({
    loading: true,
    categories: []
  });
  useEffect(() => {
      UseFetch('/categorias')
          .then(({ ok, data }) => {
              const {categories} = data;
              setCategoryState({
                  loading: false,
                  categories
              })
          })
          .catch(error => console.error)
  }, []);
  const [brandState, setBrandState] = useState({
    loading: true,
    brands: []
  });
  useEffect(() => {
    UseFetch('/marcas')
        .then(({ ok, data }) => {
  
            const { brands } = data;
            setBrandState({
                loading: false,
                brands
            })
        })
        .catch(error => console.error)
}, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <TablaProductos 
              productos={productState.productos}
              categories={categoryState.categories}
              brands={brandState.brands}
                loading={productState.loading}
                pages={productState.pages}
                currentPage={productState.currentPage}
                handleGetPage={handleGetPage} />
            </div>
            </div>
      </div>
    </div>
      
       
    </div >
  )
}

