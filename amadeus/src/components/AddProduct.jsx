import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { UseFetch } from '../hooks/UseFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const AddProduct = () => {



  const [productState, setProductState] = useState({
    loading: true,
    productos: []
  });
  useEffect(() => {
    UseFetch('/productos?withPagination=false')
      .then(({ ok, data }) => {

        const { productos } = data;
        setProductState({
          loading: false,
          productos
        })
      })
      .catch(error => console.error)
  }, []);




  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    discount: 0,
    description: '',
    onSale: false,
    isNew: false
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Envía los datos del formulario al backend
    createProduct(formData)
      .then(data => {
        // Maneja la respuesta del backend aquí
        console.log(data);
      })
      .catch(error => {
        // Maneja cualquier error aquí
        console.error(error);
      });
  };
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
          productos: productState.productos,
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
          productos: productState.productos,
          categories: categoryState.categories,
          brands
        })
      })
      .catch(error => console.error)
  }, []);
  return (
    <>


<form className="row">
            <div className="col-12 mb-3">
              <label htmlFor="name" className="form-label">
                Nombre *
              </label>
              <input
                type="text"
                className="form-control"
                name="name" value={formData.name}
                onChange={handleInputChange} required
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="brand" className="form-label">
                Marca *
              </label>
              <select
                className="form-control"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required

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
              <select className="form-control" name="category" value={formData.category}
                onChange={handleInputChange}
                required>
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
                name="price" value={formData.price}
                onChange={handleInputChange}
                required
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
                value={formData.discount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="description" className="form-label">
                Descripción *
              </label>
              <textarea
                className="form-control"
                name="description" value={formData.description}
                onChange={handleInputChange}
                required
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="col-12 mb-3">
              <div className="d-flex justify-content-around">
                <div className="form-check form-switch">
                  <input className="form-check-input" name="free" type="checkbox" role="switch"
                    id="onSale" checked={formData.onSale}
                    onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="onSale">En oferta</label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" name="isNew" type="checkbox" role="switch"
                    id="isNew" checked={formData.isNew}
                    onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="isNew">Nuevo</label>
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
                <label className="btn btn-success my-1" htmlFor="image" >
                  Cargar imagenes *
                </label>

              </div>

            </div>

          </form>
      

         

    </>
  );
}
AddProduct.propTypes = {
  productos: PropTypes.array



}
export default AddProduct;