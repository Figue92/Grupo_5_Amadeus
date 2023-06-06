import { TablaUsuarios } from '../components/Usuarios/TablaUsuarios'
import { useState, useEffect, React } from 'react'
import { UseFetch } from '../hooks/UseFetch'


export const Users = () => {

    const [userState, setUserState] = useState({
        loading: true,
        users: [],
    })

    useEffect(() => {
        UseFetch('/users')
            .then(({ ok, data }) => {
console.log(data);
                const { users } = data;
                setUserState({
                    loading: false,
                    users: data
                })
            })
            .catch(error => console.error)
    }, [])


    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <TablaUsuarios
                                users={userState.users}
                                loading={userState.loading}

                            />
                        </div>
                    </div>
                </div>
            </div>


        </div >

    )
}


