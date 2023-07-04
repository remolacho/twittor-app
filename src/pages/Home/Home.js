import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ListTweets from "../../components/tweets/ListTweets";

import "./Home.scss";

export default function Home(props){
    const { setCallLogin } = props;

    return (
        <MainLayout setCallLogin={setCallLogin} className="home">
            <ListTweets type="all"/>
        </MainLayout>
    )
}
