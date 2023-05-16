import Header from './Header'
import Footer from './Footer'
import logo from '../assets/images/Amadeus PC.jpg'

import TablaProductos from './TablaProductos'
import { CountProduct } from './CountProduct'



export const Productos = () => {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <Header />
            <div className="container-fluid">
                <div className="d-sm-flex justify-content-between mb-4">
                    <div className="mb-6">
                        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">


                            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                                <div className="sidebar-brand-icon">
                                    <img className="w-100" src={logo} alt="Amadeus PC" />
                                </div>
                            </a>


                            <hr className="sidebar-divider my-0" />


                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard - Amadeus PC</span></a>
                            </li>


                            <hr className="sidebar-divider" />


                            <div className="sidebar-heading">Actions</div>


                            <li className="nav-item">
                                <a className="nav-link collapsed" href="/">
                                    <i className="fas fa-fw fa-user"></i>
                                    <span>Usuarios</span>
                                </a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <i className="fas fa-fw fa-cart-shopping"></i>
                                    <span>Carritos</span></a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <i className="fas fa-fw fa-chart-area"></i>
                                    <span>Productos</span></a>
                            </li>


                            <hr className="sidebar-divider d-none d-md-block" />
                        </ul>
                    </div>
                    <div className='d-flex flex-column w-100'>
                        <div className>
                        <CountProduct/>
                        </div>
                       <TablaProductos/>
                      

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
