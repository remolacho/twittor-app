import React from "react";
import {Modal} from "react-bootstrap"
import LogoWhite from "../../../assets/png/logo-white.png";

import "./BasicModal.scss"

function BasicModal(props) {
    const {show, setShow, children} = props;

    return(
        <Modal
            className="basic-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg">
            <Modal.Header>
                <Modal.Title>
                    <img src={LogoWhite} alt="Twittor"/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default BasicModal