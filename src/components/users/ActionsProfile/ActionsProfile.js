import React from "react";
import { Button } from  "react-bootstrap";

export default function ActionsProfile(props){
    const { user, currentUser, className } = props;

    if (!user){
        return null
    }

    const canEdit = currentUser?._id === user.id;
    const canFollow = currentUser?._id !== user.id

    return(
        <div className={className}>
            {canEdit && <Button> Editar perfil </Button>}
            {canFollow && <Button> Seguir </Button>}
        </div>
    )
}
