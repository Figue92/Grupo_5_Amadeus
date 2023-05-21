import React from 'react'
import { Root } from "../components/Root";
import { Route, 
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider } from "react-router-dom";

import { Home } from "../pages/Home";
import { Users } from '../pages/Users';
import { Productos } from '../pages/Productos';
import { Categorias } from '../pages/Categorias';

const router= createBrowserRouter([
    {
        path : "/",
        element : <Root/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "/users",
                element : <Users/>
            },
            {
                path : "/productos",
                element : <Productos/>
            },
            {
                path : "/categorias",
                element : <Categorias/>
            },
        
        
        ]
    },
   
])

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}
