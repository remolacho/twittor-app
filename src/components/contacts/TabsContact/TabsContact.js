import React from "react";
import {Button, ButtonGroup} from "react-bootstrap";

import "./TabsContact.scss"

export default function TabsContact(props){
    const {changeTab, type} = props;

    return(
        <ButtonGroup className="tabs-contact">
            <Button
                className={type === "followed" && "active"}
                onClick={changeTab}
            >
                Siguiendo
            </Button>
            <Button
                className={type === "unfollowed" && "active"}
                onClick={changeTab}
            >
                Nuevos
            </Button>
        </ButtonGroup>
    )
}