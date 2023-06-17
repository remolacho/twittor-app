import React from "react";
import {Modal} from "react-bootstrap";
import {CloseIcon} from "../../../utils/icons"

import "./TweetModal.scss";
import CreateTweetForm from "../../tweets/forms/CreateForm";

function TweetModal(props) {
    const {show, setShow, setCallLogin} = props;

    return(
        <Modal
            className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg">
            <Modal.Header>
                <Modal.Title>
                    <CloseIcon onClick={() => setShow(false)} />
                    <h2>Que estas pensando?</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateTweetForm setShow={setShow}/>
            </Modal.Body>
        </Modal>
    )
}

export default TweetModal