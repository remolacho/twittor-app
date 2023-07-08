import React from "react";
import CreateTweetForm from "../../tweets/forms/CreateTweetForm";
import ConfigModal from "../ConfigModal";

function TweetModal(props) {
    const {show, setShow} = props;

    return(
        <ConfigModal
            show={show}
            setShow={setShow}
            title="Que estas pensando?">
            <CreateTweetForm setShow={setShow}/>
        </ConfigModal>
    )
}

export default TweetModal
