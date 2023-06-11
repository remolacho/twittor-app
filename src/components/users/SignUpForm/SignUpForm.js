import React, {useState} from "react";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {signUpService} from "../../../services/users/signUpService"
import {toast} from "react-toastify"
import {validFormSignUp} from "../../../utils/validations/signUp"
import "./SignUpForm.scss"

function initialUserAttributes(){
    return {
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}

export default function SignUpForm(props){
    const {setShowModal} = props
    const [formData, setFormData] = useState(initialUserAttributes())
    const [signUpLoading, setSignUpLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault();

        const signUpValidation = validFormSignUp(formData);

        if (!signUpValidation.isValid){
            toast.warning(signUpValidation.message, {theme: "colored"});
            return
        }

        setSignUpLoading(true)

        signUpService(formData).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success("Se creo el usuario con exito", {theme: "colored"});
            setShowModal(false)
            setFormData(initialUserAttributes)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setSignUpLoading(false);
        })
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
                    {!signUpLoading ? "Registrarse" : <Spinner animation="border"/> }
                </Button>
            </Form>

        </div>
    )
}
