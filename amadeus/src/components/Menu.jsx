import React from 'react'
import logo from '../assets/images/Amadeus PC.jpg'
import { Link } from 'react-router-dom'


export default function Menu() {
  return (
 

     
    <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">


    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon">
            <img className="w-50" src={logo} alt="Amadeus PC" />
        </div>
    </Link>
    
    
    <hr className="sidebar-divider my-0" />
    
    
    <li className="nav-item active">
        <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - Amadeus PC</span></Link>
    </li>
    
    
    <hr className="sidebar-divider" />
    
    
    <div className="sidebar-heading">Actions</div>
    
    
    <li className="nav-item">
        <Link className="nav-link collapsed" to="/users">
            <i className="fas fa-fw fa-user"></i>
            <span>Usuarios</span>
        </Link>
    </li>
    
    
    <li className="nav-item">
        <Link className="nav-link" to="/categorias">
            <i className="fas fa-fw fa-cart-shopping"></i>
            <span>Categorias</span></Link>
    </li>
    
    
    <li className="nav-item">
        <Link className="nav-link" to="/productos">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Productos</span></Link>
    </li>
    
    
    <hr className="sidebar-divider d-none d-md-block" />
    </ul>
    
  
    

   
    
  )
}
