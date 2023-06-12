import React, {useState} from "react";
import { Form, Button, Row, Col } from  "react-bootstrap";

import "./EditUserForm.scss"

export default function EditUserForm(props){
    const {user, setShowModal} = props;
    const onsubmit = e =>{
        e.preventDefault();

        console.log("edit user");
    }

    return (
        <div className="edit-user-form">
           <Form onSubmit={onsubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="name"
                            />
                        </Col>

                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                name="lastname"
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        as="textarea"
                        row="5"
                        placeholder="Biografia"
                        type="text"
                        name="biography"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        placeholder="Sitio web"
                        type="text"
                        name="siteWeb"
                    />
                </Form.Group>

                <Button className="btn-submit"
                        variant="primary"
                        type="submit">
                    Actualizar
                </Button>
           </Form>
        </div>
    )
}
