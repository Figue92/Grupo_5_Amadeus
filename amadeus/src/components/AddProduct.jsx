import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { UseFetch } from '../hooks/UseFetch'
import { useFormik } from "formik";
import validate from "../validations/addProductValidator";

export const AddProduct = () => {

  const [productState, setProductState] = useState([]);
  useEffect(() => {
    UseFetch('/productos?withPagination=false')
      .then(({ ok, data }) => {
        const { productos } = data;
        setProductState({
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

        const { categories } = data;
        setCategoryState({
          loading: false,
          productos: productos,
          categories: categoryState.categories
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
          productos: productos,
          categories: categoryState.categories,
          brands: brandState.brands
        })
      })
      .catch(error => console.error)
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      brand: '',
      category: '',
      price: '',
      discount: 0,
      description: '',
      onSale: false,
      isNew: false

    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    }
  })

  return (
    <>
   
        <div className="col-12 mb-3">
          <label htmlFor="name" className="form-label">
            Nombre *
          </label>
          <input
            type="text"
            className={`form-control ${formik.errors.name ? "is-invalid" : !formik.errors.name && formik.values.name ? "is-valid" : null}`}
            name="name" value={formik.values.name}
            onChange={formik.handleChange} 
          />
          {
            <small className="text-danger">{formik.errors.name}</small>
          }
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="brand" className="form-label">
            Marca *
          </label>
          <select
            className="form-control"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
           >
            <option hidden defaultValue value="">Seleccione...</option>
            {brandState.loading ? (
              <option disabled>Cargando marcas...</option>
            ) : (
              brandState.brands.map((brand, index) => (
                <option value={brand.id} key={index}>{brand.name}</option>
              ))
            )}
          </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Categoría *
          </label>
          <select className="form-control" name="category" value={formik.values.category}
            onChange={formik.handleChange}
            >
            <option hidden defaultValue value="">Seleccione...</option>
            {categoryState.loading ? (
              <option disabled>Cargando categorías...</option>
            ) : (
              categoryState.categories.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.nameCategory}</option>
              ))
            )}
          </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input
            type="number"
            className="form-control"
            name="price" value={formik.values.price}
            onChange={formik.handleChange}
         
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="discount" className="form-label">
            Descuento
          </label>
          <input
            type="number"
            className="form-control"
            name="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
           
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="description" className="form-label">
            Descripción *
          </label>
          <textarea
            className="form-control"
            name="description" 
            style={{ resize: "none" }}
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <div className="col-12 mb-3">
          <div className="d-flex justify-content-around">
            <div className="form-check form-switch">
              <input className="form-check-input" name="free" type="checkbox" role="switch"
                id="onSale" checked={formik.values.onSale}
                onChange={formik.handleChange} />
              <label htmlFor="onSale" className="form-check-label">En oferta</label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" name="isNew" type="checkbox" role="switch"
                id="isNew" checked={formik.values.isNew}
                onChange={formik.handleChange} />
              <label htmlFor="isNew"className="form-check-label" >Nuevo</label>
            </div>
          </div>

        </div>
        <div className="col-12 mb-3">

          <input
            className="form-control"
            type="file"
            name="image"
            id="image"
            hidden
          />
          <div className="d-flex align-items-center justify-content-around">
            <label htmlFor="image" className="btn btn-success my-1"  >
              Cargar imagenes *
            </label>

          </div>

        </div>

      




    </>
  );
}
AddProduct.propTypes = {
  productos: PropTypes.array



}
export default AddProduct;