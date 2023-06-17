import React from "react";
import MainLayout from "../../layouts/MainLayout";
import "./Home.scss";

export default function Home(props){
    const { setCallLogin } = props;

    return (
        <MainLayout setCallLogin={setCallLogin} className="home">
            <span>Estas en el home...</span>
        </MainLayout>
    )
}