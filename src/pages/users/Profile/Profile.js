import React, {useState, useEffect} from "react";
import { Button, Spinner } from  "react-bootstrap";
import MainLayout from "../../../layouts/MainLayout";
import { useParams} from "react-router-dom";
import { profileService } from "../../../services/users/profileService"
import {toast} from "react-toastify";
import BannerAvatar from "../../../components/users/BannerAvatar";
import userLogged from "../../../hooks/users/userLogged"

import "./Profile.scss";

export default function Profile(props){
    const {setRefreshLogin} = props;
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const currentUser = userLogged();

    useEffect(() =>{
        profileService(params.userId).then( response => {

            if (!response.success){
                toast.error(response.message, {theme: "colored"})
                return
            }

            setProfile(response.data)
        }).catch(() => {
            toast.error("Error al cargar los datos", {theme: "colored"})
        })
    }, [params])

    return(
        <MainLayout setRefreshLogin={setRefreshLogin} className="profile">
            <div className="profile__title">
               <h2>{profile?.user?.name} {profile?.user?.lastname}</h2>
            </div>
            <BannerAvatar profile={profile} currentUser={currentUser} />
            <div>Info usuario</div>
            <div className="profile__tweets">Lista de tweets</div>
        </MainLayout>
    )
}
