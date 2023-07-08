import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import Tweet from "../Tweet";
import { map } from "lodash"
import { Button, Spinner } from "react-bootstrap";
import {LIMIT_PAGE} from "../../../utils/variablesApi";
import {listTweetsService} from "../../../services/tweets/listTweetsService";

import "./ListTweets.scss"

export default function ListTweets(props){
    const { user, type } = props;
    const [tweets, setTweets] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [showBtnTweets, setShowBtnTweets] = useState(false);

    useEffect(()=>{
        if(type === "profile" && !user) return;

        listTweetsService(type, user?.id, numPage).then(response => {
            if (!response.success){
                toast.error(response.message, {theme: "colored"});
                return
            }

            console.log(response.data);

            setShowBtnTweets(response.data.length === LIMIT_PAGE);
            setTweets([...tweets, ...response.data]);
            setLoadingBtn(false);
            setLoadingPage(false)
        }).catch(() => {
            setShowBtnTweets(false);
            setLoadingPage(false)
            setLoadingBtn(false);
        })
    }, [user?.id, numPage])

    if (loadingPage){
        return (
            <div className="tweets__loading">
                <Spinner animation="border" variant="info"/>
                Buscando Tweets...
            </div>
        )
    }

    if (tweets.length === 0 && !loadingPage){
        return (
            <div className="tweets">
                <h3>No hay tweets</h3>
            </div>
        )
    }

    const loadTweets = () => {
        const numPageTmp = numPage + 1
        setLoadingBtn(true);
        setNumPage(numPageTmp);
    };

    return(
        <div className="tweets">
            <h3>Tweets</h3>
            <div>
                {map(tweets, (tweet) => {
                   return <Tweet key={tweet.id} tweet={tweet}/>
                })}
            </div>

            { showBtnTweets && <Button onClick={loadTweets}>
                { loadingBtn ?
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
