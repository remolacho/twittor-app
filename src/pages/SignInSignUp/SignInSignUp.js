import React from "react";
import {Container, Row, Col, Button } from "react-bootstrap";
import LogoWhite from "../../assets/png/logo-white.png";
import LogoBlue from "../../assets/png/logo.png";
import "./SignInSignUp.scss";

function SignInSignUp(){
    return (
        <Container className="signIn-signUp"  fluid>
            <Row>
                <SideBarLeft/>
                <RightComponent/>
            </Row>
        </Container>
    )
}

function SideBarLeft() {
    return (
        <Col className="signIn-signUp__left" xa={6}>
            <img src={LogoBlue} alt="twittor" />

            <div>
                <h2>
                    - Text 1 ...
                </h2>
                <h2>
                    - text 2 ...
                </h2>
                <h2>
                    - text 3 ...
                </h2>
            </div>
        </Col>
    )
}

function RightComponent() {
    return (
        <Col className="signIn-signUp__right" xs={6}>
            <h2>ComponentRight...</h2>
        </Col>
    )
}

export default SignInSignUp