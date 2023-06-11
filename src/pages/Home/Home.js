import React from "react";
import MainLayout from "../../layouts/MainLayout";
import "./Home.scss";

export default function Home(props){
    const { setRefreshLogin } = props;

    return (
        <MainLayout setRefreshLogin={setRefreshLogin} className="home">
            <span>Estas en el home...</span>
        </MainLayout>
    )
}