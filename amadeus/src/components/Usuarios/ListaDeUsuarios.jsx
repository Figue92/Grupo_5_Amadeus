import { React, useState } from 'react'
import PropTypes from 'prop-types'


export default function ListaDeUsuarios({
    id,
    name,
    surname,
    email,
    phone,
    idAddress,
    idRol
}) {

    const [state, setState] = useState({
        user: {
            id,
            name,
            surname,
            email,
            phone,
            idAddress,
            idRol
        }
    })

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{idAddress}</td>
            <td>{idRol}</td>


            <td>
                <div className='d-flex justify-content-between gap-1 col-lg-8'>
                    <button className="btn btn-success"> <i className="fas fa-edit"></i>Editar Usuario</button>
                    <button className="btn btn-danger"> <i className="fas fa-trash"></i>Eliminar Usuario</button>
                </div>
            </td>
        </tr>

    )
}
ListaDeUsuarios.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    idAddress: PropTypes.number,
    idRol: PropTypes.number
}
