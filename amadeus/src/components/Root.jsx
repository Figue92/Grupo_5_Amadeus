import React from 'react'
import Header from "./Header";
import Menu from "./Menu";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";


export const Root = () => {
    return (
        <div id="wrapper">
            <Menu />
            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Header />
                
                        <Outlet />
                   
                </div>
                <Footer />


            </div>
        </div>
    )
}
