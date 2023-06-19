import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import { listTweetsUserService } from "../../../services/tweets/listTweetsUserService";
import Tweet from "../Tweet";
import { map } from "lodash"
import { Button, Spinner } from "react-bootstrap";

import "./ListTweets.scss"


export default function ListTweets(props){
    const { profile } = props;
    const [tweets, setTweets] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showBtnTweets, setShowBtnTweets] = useState(false);
    const limitByPage = 20;

    useEffect(()=>{
        if(!profile?.user) return;

        listTweetsUserService(profile?.user.id, numPage).then(response => {
            if (!response.success){
                toast.error(response.message, {theme: "colored"});
                return
            }

            setShowBtnTweets(response.data.length === limitByPage);
            setTweets([...tweets, ...response.data]);
            setLoading(false);
        }).catch(() => {
            toast.error("Error al cargar los datos", {theme: "colored"})
            setShowBtnTweets(false);
            setLoading(false);
        })
    }, [profile?.user.id, numPage])

    if (tweets.length === 0 || !profile){
        return (
            <div className="tweets">
                <h3>No hay tweets</h3>
            </div>
        )
    }

    const loadTweets = () => {
        const numPageTmp = numPage + 1
        setLoading(true);
        setNumPage(numPageTmp);
    };

    return(
        <div className="tweets">
            <h3>Tweets</h3>
            <div>
                {map(tweets, (tweet) => {
                   return <Tweet tweet={tweet} user={profile?.user}/>
                })}
            </div>

            { showBtnTweets && <Button onClick={loadTweets}>
                { loading ?
                    <Spinner as="span"
                             animation="grow"
                             size="sm"
                             role="status"
                             aria-hidden="true" />
                    : "Cargar mas" }
            </Button> }

        </div>
    )
}
