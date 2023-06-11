import React, {useState} from "react";
import {Form, Button, Spinner} from "react-bootstrap";
import {validFormSignIn} from "../../../utils/validations/signIn"
import {signInService} from "../../../services/users/signInService"
import {toast} from "react-toastify"
import {setTokenApi} from "../../../services/users/auth"
import "./SignInForm.scss"

function initialLoginAttributes(){
    return {
        email: "",
        password: ""
    }
}

export default function SignInForm(props){
    const { setRefreshLogin } = props;
    const [formData, setFormData] = useState(initialLoginAttributes())
    const [signInLoading, setSignInLoading] = useState(false)

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        const signInValidation = validFormSignIn(formData);

        if(!signInValidation.isValid){
            toast.warning(signInValidation.message, {theme: "colored"});
            return
        }

        setSignInLoading(true)

        signInService(formData).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setTokenApi(response.data.token);
            toast.success("Inicio con exito", {theme: "colored"});
            setFormData(initialLoginAttributes);
            setRefreshLogin(true);
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setSignInLoading(false);
        })
    }

    return (
        <div className="sign-in-form">
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit} onChange={onChance}>
                <Form.Group>
                    <Form.Control type="email"
                                  placeholder="Email"
                                  defaultValue={formData.email}
                                  name="email"/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password"
                                  placeholder="Contraseña"
                                  defaultValue={formData.password}
                                  name="password"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {!signInLoading ? "Iniciar sesion" : <Spinner animation="border"/> }
                </Button>
            </Form>
        </div>
    )
}
