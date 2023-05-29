import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {toast} from "react-toastify"
import {validFormSignUp} from "../../../utils/validations/signUp"
import "./SingUpForm.scss"

function initialUserAttributes(){
    return {
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}

export default function SingUpForm(props){
    const {setShowModal} = props
    const [formData, setFormData] = useState(initialUserAttributes())

    const onSubmit = e => {
        e.preventDefault();

        const signUp = validFormSignUp(formData);

        if (!signUp.isValid){
            toast.warning(signUp.message, {theme: "colored"});
            return
        }

        toast.success("Se completo con exito", {theme: "colored"});
        setShowModal(false)
    }

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return(
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>

            <Form onSubmit={onSubmit} onChange={onChance}>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                defaultValue={formData.name}
                                name="name"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                defaultValue={formData.lastname}
                                name="lastname"
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        defaultValue={formData.email}
                        name="email"
                    />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                defaultValue={formData.password}
                                name="password"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Repetir Contraseña"
                                defaultValue={formData.repeatPassword}
                                name="repeatPassword"
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>

        </div>
    )
}
