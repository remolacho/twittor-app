import React from "react";
import {Link} from "react-router-dom"
import ErrorImage from "../../assets/png/error-404.png"
import Logo from "../../assets/png/logo.png"
import "./Error404.scss";

export default function Error404(){
    return (
        <div className="error404">
            <img src={Logo}  alt="tweeter"/>
            <img src={ErrorImage}  alt="tweeter"/>
            <Link to="/">Volver al inicio</Link>
        </div>
    )
}
