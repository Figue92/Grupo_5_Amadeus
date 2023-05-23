import React from 'react'
import { TablaProductos } from '../components/TablaProductos'
import { useState, useEffect } from 'react'
import { UseFetch } from '../hooks/UseFetch'
import PropTypes from 'prop-types'
import { AddProduct } from '../components/AddProduct'



export const Productos = () => {
  const [productState, setProductState] = useState({
    loading: true,
    productos: []
  });
    useEffect(() => {
      UseFetch('/productos?limit=100')
        .then(({ ok, data }) => {
         
          const { productos } = data;
          setProductState({
            loading: false,
            productos
          })
        })
        .catch(error => console.error)
    }, []);

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
          console.log(data);
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
              <TablaProductos productos={productState.productos}categories={categoryState.categories}brands={brandState.brands}
                loading={productState.loading} />
            </div>
            </div>
      </div>
    </div>
      
       
    </div >
  )
}

