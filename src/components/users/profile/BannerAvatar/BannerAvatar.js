import React from "react";
import AvatarAlt from "../../../../assets/jpg/avatar.jpg"
import "./BannerAvatar.scss"
import ActionsProfile from "../ActionsProfile";
import {API_HOST, V1_API} from "../../../../utils/variablesApi"

export default function BannerAvatar(props){
    const { profile, currentUser } = props;

    const bannerUrl = profile
        ? `${API_HOST}/${V1_API}/users/banner?userId=${profile.user.id}`
        : null

    const avatarUrl = profile
        ? `${API_HOST}/${V1_API}/users/avatar?userId=${profile.user.id}`
        : AvatarAlt

    return(
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
            <ActionsProfile className="actions-profile" profile={profile} currentUser={currentUser}/>
        </div>
    )
}
