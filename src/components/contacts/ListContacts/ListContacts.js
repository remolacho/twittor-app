import React from "react";
import {map} from "lodash";
import {Spinner} from "react-bootstrap";
import Contact from "../Contact";

import "./ListContacts.scss"

export default function ListContacts(props){
    const {contacts, loading} = props;

    return(
        loading
            ? (
                <div className="list-contacts__loading">
                    <Spinner animation="border" variant="info"/>
                    Buscando contactos...
                </div>
              )
            : (
                <ul className="list-contacts">
                    {map(contacts, (contact, index) => {
                        return <Contact key={index} contact={contact} />
                    })}
                </ul>
            )
    )
}