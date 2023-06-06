import React from 'react'
import ListaDeUsuarios  from "../Usuarios/ListaDeUsuarios";
import PropTypes from 'prop-types'


export const TablaUsuarios = ({ users, loading }) => {
    return (
        <>

            <div className='table-responsive'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Email</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            loading ?

                                <tr>
                                    <td>
                                        Cargando...
                                    </td>
                                </tr> :
                                (users.map(user => (<ListaDeUsuarios key={user.id} {...user} />)))

                        }

                    </tbody>
                </table>
            </div >

        </>
    )
}
TablaUsuarios.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.number,
    idAddress: PropTypes.number,
    idRol: PropTypes.number
}
