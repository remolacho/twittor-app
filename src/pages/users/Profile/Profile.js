import React, {useState, useEffect} from "react";
import MainLayout from "../../../layouts/MainLayout";
import { useParams} from "react-router-dom";
import { profileService } from "../../../services/users/profileService"
import {toast} from "react-toastify";
import BannerAvatar from "../../../components/users/profile/BannerAvatar";
import userLogged from "../../../hooks/users/userLogged"
import InfoUser from "../../../components/users/profile/InfoUser";

import "./Profile.scss";
import ListTweets from "../../../components/tweets/ListTweets";

export default function Profile(props){
    const {callLogin, setCallLogin} = props;
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const currentUser = userLogged();

    useEffect(() =>{
        if (callLogin) return setProfile(null);

        profileService(params.userId).then( response => {

            if (!response.success){
                toast.error(response.message, {theme: "colored"})
                return
            }

            setProfile(response.data)
        }).catch(() => {
            toast.error("Error al cargar los datos", {theme: "colored"})
        })
    }, [params, callLogin])

    return(
        <MainLayout setCallLogin={setCallLogin} className="profile">
            <div className="profile__title">
               <h2>{profile?.user?.name} {profile?.user?.lastname}</h2>
            </div>

            <BannerAvatar profile={profile} currentUser={currentUser} />
            <InfoUser user={profile?.user} />
            <ListTweets user={profile?.user} type="profile"/>
        </MainLayout>
    )
}
