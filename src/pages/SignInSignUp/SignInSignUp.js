import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faSearch, faUsers, faComment } from "@fortawesome/free-solid-svg-icons"

import {Container, Row, Col, Button } from "react-bootstrap";
import BasicModal from "../../components/modals/BasicModal";
import SignUpForm from "../../components/users/SignUpForm";
import SignInForm from "../../components/users/SignInForm"
import LogoWhite from "../../assets/png/logo-white.png";
import LogoBlue from "../../assets/png/logo.png";
import "./SignInSignUp.scss";

function SignInSignUp(props){
    const { setRefreshLogin } = props;
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModel = content => {
        setShowModal(true);
        setContentModal(content);
    }

    return (
        <>
            <Container className="signIn-signUp"  fluid>
                <Row>
                    <SideBarLeft/>
                    <RightComponent
                        openModal={openModel}
                        setShowModal={setShowModal}
                        setRefreshLogin={setRefreshLogin}
                    />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

function SideBarLeft() {
    return (
        <Col className="signIn-signUp__left" xa={6}>
            <img src={LogoBlue} alt="twittor" />

            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch}/>
                    Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers}/>
                    Entérate de que esta hablando la gente.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment}/>
                    Únete a la conversación.
                </h2>
            </div>
        </Col>
    )
}

function RightComponent(props) {
    const {openModal, setShowModal, setRefreshLogin} = props

    return (
        <Col className="signIn-signUp__right" xs={6}>
            <div>
                <img src={LogoWhite} alt="Twittor"/>
                <h2>Mira lo que esta pasando en este momento</h2>
                <h3>Unete a Twittor ahora mismo.</h3>

                <Button
                    variant="primary"
                    onClick={() => openModal(<SignUpForm setShowModal={setShowModal}/>)}
                >
                    Registrate
                </Button>

                <Button
                    variant="outline-primary"
                    onClick={() => openModal(<SignInForm setRefreshLogin={setRefreshLogin}/>)}
                >
                    Iniciar Sesion
                </Button>
            </div>
        </Col>
    )
}

export default SignInSignUp