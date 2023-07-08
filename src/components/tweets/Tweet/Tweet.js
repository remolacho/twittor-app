import React from "react";
import AvatarAlt from "../../../assets/jpg/avatar.jpg";
import {API_HOST, V1_API} from "../../../utils/variablesApi";
import {replaceUrlWithLinks, uniqueTimestamp} from "../../../utils/shared";
import { Image } from "react-bootstrap";
import moment from "moment";
import "./Tweet.scss"

export default function Tweet(props){
   const { tweet } = props

    console.log(tweet)
    const avatarUrl = tweet?.user
        ? `${API_HOST}/${V1_API}/users/avatar?userId=${tweet?.user.id}&timestamp=${uniqueTimestamp()}`
        : AvatarAlt

    return(
       <div className="tweet" key={tweet.id}>
           <div className="user-info">
                <Image className="avatar" src={avatarUrl} roundedCircle></Image>
                {tweet?.user?.name} {tweet?.user?.lastname}
                <span>{moment(tweet.createdAt).calendar()}</span>
           </div>
           <div className="body-tweet" dangerouslySetInnerHTML={{__html: replaceUrlWithLinks(tweet.message)}}
           />
       </div>
    )
}
