import React, {useState} from "react";
import {API_HOST, V1_API} from "../../../utils/variablesApi"
import {replaceUrlWithLinks, uniqueTimestamp} from "../../../utils/shared";
import {Card, Image} from "react-bootstrap";
import {Link} from "react-router-dom"

import "./Contact.scss"

export default function ListContacts(props){
    const {contact} = props;

    const [avatarUrl, _] = useState(
        contact ?
            `${API_HOST}/${V1_API}/users/avatar?userId=${contact.id}&timestamp=${uniqueTimestamp()}`
            : null
    );

    return(
       <Card as={Link}
             to={`/users/profile/${contact.id}`}
             className="contact">
           <Card.Body>
               <Image
                   width={64}
                   height={64}
                   roundedCircle
                   className="mr-3"
                   src={avatarUrl}
                   alt={`${contact.name} ${contact.lastname}`}
               />
               <span className="contact__name">{contact.name} {contact.lastname}</span>
               <p className="contact__biography">{contact?.biography}</p>
           </Card.Body>
       </Card>
    )
}