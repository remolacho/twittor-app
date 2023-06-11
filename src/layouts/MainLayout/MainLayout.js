import React from "react";
import {Container, Row, Col} from "react-bootstrap"
import LeftMenu from "../../components/menus/LeftMenu";
import "./MainLayout.scss"

export default function MainLayout(props) {
    const { children, className, setRefreshLogin} = props

    return (
        <Container className={`main-layout ${className}`}>
            <Row>
                <Col xp={3} className="main-layout__menu">
                    <LeftMenu setRefreshLogin={setRefreshLogin} />
                </Col>
                <Col xs={9} className="main-layout__content">
                    <h2>
                        {children}
                    </h2>
                </Col>
            </Row>
        </Container>
    )
}
