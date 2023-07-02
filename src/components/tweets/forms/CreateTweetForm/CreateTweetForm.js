import React, {useState} from "react";
import { Form, Button } from  "react-bootstrap";
import classNames from "classnames";
import "./CreateTweetForm.scss"
import {validSendTweet} from "../../../../utils/validations/createTweet";
import {createTweetService} from "../../../../services/tweets/createTweetService";
import {toast} from "react-toastify";

export default function CreateTweetForm(props){
    const [message, setMessage] = useState("")
    const {setShow} = props;

    const onSubmit = e =>{
        e.preventDefault();

        if(!validSendTweet(message)) return;

        createTweetService(message).then( response => {
            if (!response.success){
                toast.error(response.message, {theme: "colored"})
                return
            }

            setShow(false);
            window.location.reload();
        }).catch( ()=> {
            toast.error("Error en el servidor", {theme: "colored"})
        })
    }

    const onChange = e =>{ setMessage(e.target.value); }

    return(
       <Form onSubmit={onSubmit}>
            <Form.Control
                as="textarea"
                rows="6"
                placeholder="twittear"
                type="text"
                name="message"
                onChange={onChange}
            />

           <span className={
               classNames(  "counter", { "danger": !validSendTweet(message) } )
           }>
               {message.length}
           </span>

           <Button
               type="submit"
               disabled={!validSendTweet(message)}
           >
               Twittear
           </Button>
       </Form>
    )
}
