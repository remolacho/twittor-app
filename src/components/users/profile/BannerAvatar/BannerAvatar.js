import React from "react";
import AvatarAlt from "../../../../assets/jpg/avatar.jpg";
import ActionsProfile from "../ActionsProfile";
import {API_HOST, V1_API} from "../../../../utils/variablesApi";
import {uniqueTimestamp} from "../../../../utils/shared";

import "./BannerAvatar.scss"

export default function BannerAvatar(props){
    const { profile, currentUser } = props;

    const bannerUrl = profile
        ? `${API_HOST}/${V1_API}/users/banner?userId=${profile.user.id}&timestamp=${uniqueTimestamp()}`
        : null

    const avatarUrl = profile
        ? `${API_HOST}/${V1_API}/users/avatar?userId=${profile.user.id}&timestamp=${uniqueTimestamp()}`
        : AvatarAlt

    return(
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
            <ActionsProfile className="actions-profile" profile={profile} currentUser={currentUser}/>
        </div>
    )
}
