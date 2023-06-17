import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faHome, faUser, faUsers, faPowerOff} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import LogoWithe from "../../../assets/png/logo-white.png"
import {logoutUser} from "../../../services/users/auth";
import userLogged from "../../../hooks/users/userLogged"

import "./LeftMenu.scss";

export default function LeftMenu(props) {
    const { setCallLogin } = props;
    const currentUser = userLogged();

    const logout = () =>{
        logoutUser();
        setCallLogin(true);
    }

     return (
         <div className="left-menu">
             <img src={LogoWithe} alt="Twittor" className="logo"/>

             <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Inicio
             </Link>

             <Link to={`/users/profile/${currentUser?._id}`}>
                 <FontAwesomeIcon icon={faUser} /> Perfil
             </Link>

             <Link to="/users/contacts">
                 <FontAwesomeIcon icon={faUsers} /> Contactos
             </Link>

             <Link onClick={logout} to="/">
                 <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesion
             </Link>

             <Button>Tweetear</Button>
         </div>
     )
}