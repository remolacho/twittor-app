import React, {useState} from "react";
import AvatarAlt from "../../../assets/jpg/avatar.jpg"
import "./BannerAvatar.scss"
import ActionsProfile from "../ActionsProfile";

export default function BannerAvatar(props){
    const { profile, currentUser } = props;

    const bannerUrl = profile
        ? profile.banner.alternateUrl
        : null;

    const avatarUrl = profile
        ? profile.avatar.alternateUrl
        : AvatarAlt

    return(
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
            <ActionsProfile className="actions-profile" user={profile?.user} currentUser={currentUser}/>
        </div>
    )
}
