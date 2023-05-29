import React from "react";
import {Container, Row, Col, Button } from "react-bootstrap";

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
        <Col className="signIn-signUp__left">
            <h2>Sidebar Left...</h2>
        </Col>
    )
}

function RightComponent() {
    return (
        <Col className="signIn-signUp__right">
            <h2>ComponentRight...</h2>
        </Col>
    )
}

export default SignInSignUp