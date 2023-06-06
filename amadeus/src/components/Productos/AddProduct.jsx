import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { UseFetch } from '../../hooks/UseFetch'
import { useFormik } from "formik";
import validate from "../../validations/addProductValidator";
import { AddImageProduct } from "./AddImageProduct";

export const AddProduct = ({handleAdd, handleClose}) => {

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

  const formik = useFormik({
    initialValues: {
      name: '',
      idBrand: '',
      idCategory: '',
      price: '',
      discount: 0,
      description: '',
      linkVideo: '',
      novelty: false,
      image_1: null,
      image_2: null,
      image_3: null

    },
    validate,
    onSubmit: (values,{resetForm}) => {
      let data = new FormData();
      for (const key in values) {
        data.append(key, values[key])
        resetForm()
        handleClose()
      }
      handleAdd(data)

    }
  })
  return (
    <>
      <form className="row" onSubmit={formik.handleSubmit}>
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
          <label htmlFor="idBrand" className="form-label">
            Marca *
          </label>
          <select
            className={`form-control ${formik.errors.idBrand ? "is-invalid" : !formik.errors.idBrand && formik.values.idBrand ? "is-valid" : null}`}
            name="idBrand"
            value={formik.values.idBrand}
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
          {
            <small className="text-danger">{formik.errors.idBrand}</small>
          }
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="idCategory" className="form-label">
            Categoría *
          </label>
          <select className={`form-control ${formik.errors.idCategory ? "is-invalid" : !formik.errors.nameCategory && formik.values.nameCategory ? "is-valid" : null}`} name="idCategory" value={formik.values.nameCategory}
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
          {
            <small className="text-danger">{formik.errors.idCategory}</small>
          }
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input
            type="number"
            className={`form-control ${formik.errors.price ? "is-invalid" : !formik.errors.price && formik.values.price ? "is-valid" : null}`}
            name="price" value={formik.values.price}
            onChange={formik.handleChange}

          />
            {
            <small className="text-danger">{formik.errors.price}</small>
          }
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
            className={`form-control ${formik.errors.description ? "is-invalid" : !formik.errors.description && formik.values.description ? "is-valid" : null}`}
            name="description"
            style={{ resize: "none" }}
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        {
            <small className="text-danger">{formik.errors.description}</small>
          }
        <div className="col-12 mb-3">
          <label htmlFor="linkVideo" className="form-label">
            Link Video Review
          </label>
          <input
            type="text"
            className="form-control"
            name="linkVideo" value={formik.values.linkVideo}
            onChange={formik.handleChange}
          />
          {
            <small className="text-danger">{formik.errors.linkVideo}</small>
          }
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
              <label htmlFor="isNew" className="form-check-label" >Nuevo</label>
            </div>
          </div>

        </div>
        <div className="row">
        <label htmlFor="">Imágenes</label>
          <div className="col-4 mb-4">
            <div className="d-flex justify-content-between gap-5">
             

              <AddImageProduct file={formik.values.image_1} setFieldValue={formik.setFieldValue} name={"image_1"} main={false} />
              <AddImageProduct file={formik.values.image_2} setFieldValue={formik.setFieldValue} name={"image_2"} main={false} />
              <AddImageProduct file={formik.values.image_3} setFieldValue={formik.setFieldValue} name={"image_3"} main={false} />

            </div>
          </div>
        </div>

        <button className="btn btn-primary my-1" type="submit">
          Guardar
        </button>

      </form>


    </>
  );
}
AddProduct.propTypes = {
  productos: PropTypes.array,
  handleAdd: PropTypes.func



}
export default AddProduct;