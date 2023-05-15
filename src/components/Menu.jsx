import React from 'react'
import logo from '../assets/images/Amadeus PC.jpg'


export default function Menu() {
  return (
 
<div>
     
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
    
  )
}
