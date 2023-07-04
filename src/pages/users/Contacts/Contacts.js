import React, {useState, useEffect} from "react";
import MainLayout from "../../../layouts/MainLayout";
import {withRouter} from "../../../utils/withRouter"
import {contactsListService} from "../../../services/followers/contactsListServicex";
import {toast} from "react-toastify";
import ListContacts from "../../../components/contacts/ListContacts";
import queryString from "query-string"
import {Button} from "react-bootstrap";
import TabsContact from "../../../components/contacts/TabsContact/TabsContact";

import "./Contacts.scss";
import {LIMIT_PAGE} from "../../../utils/variablesApi";

function queryParams(location){
    const {type="followed", numPage = 1, term=""} = queryString.parse(location.search)

    return {
        type: type,
        numPage: numPage,
        term: term
    }
}

function Contacts(props) {
    const {setCallLogin, location} = props;
    const params = queryParams(location);
    const [contacts, setContacts] = useState([]);
    const [type, setType] = useState(params.type);
    const [term, setTerm] = useState(params.term);
    const [numPage, setNumPage] = useState(params.numPage);
    const [loading, setLoading] = useState(true);
    const [showBtnLoad, setShowBtnLoad] = useState(false);

    useEffect(() => {
        contactsListService(type, numPage, term).then(response => {
            if (!response.success){
                toast.error(response.message, {theme: "colored"});
                return
            }

            setShowBtnLoad(response.data.length === LIMIT_PAGE)
            setContacts([...contacts, ...response.data]);
            setLoading(false);
        }).catch(() => {
            setShowBtnLoad(false);
            setContacts([]);
            setLoading(false);
        })
    }, [type, term, numPage])

    const changeTab = () => {
        if (type === "followed"){
            setType("unfollowed");
        }else{
            setType("followed");
        }

        setContacts([]);
        setNumPage(1);
        setLoading(true);
    };

    const changeTerm = e => {
        setTimeout(() => {
            setTerm(e.target.value);
            setContacts([]);
            setNumPage(1);
            setLoading(true);
        }, "200");
    };

    const moreContacts = () => {
        const numPageTmp = numPage + 1
        setShowBtnLoad(false);
        setLoading(true);
        setNumPage(numPageTmp);
    };

    return(
        <MainLayout setCallLogin={setCallLogin} className="contacts">
            <div className="contacts__title">
               <h2>Contactos</h2>
               <input
                 type="text"
                 placeholder="Buscar contacto..."
                 onChange={changeTerm}
               />
            </div>

            <TabsContact changeTab={changeTab} type={type} />
            <ListContacts contacts={contacts} loading={loading}/>
            { showBtnLoad && <Button onClick={moreContacts}>Cargar mas</Button> }
        </MainLayout>
    )
}

export default withRouter(Contacts)