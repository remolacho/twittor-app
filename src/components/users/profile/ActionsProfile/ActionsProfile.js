import React, {useEffect, useState} from "react";
import { Button } from  "react-bootstrap";
import ConfigModal from "../../../../components/modals/ConfigModal";
import EditUserForm from "../../forms/EditUserForm";
import { checkFollowUpService } from "../../../../services/followers/checkFollowUpService";
import {toast} from "react-toastify";
import {followService} from "../../../../services/followers/followService";
import {unFollowService} from "../../../../services/followers/unFollowService";

import "./ActionProfile.scss"

export default function ActionsProfile(props){
    const { profile, currentUser, className } = props;
    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);

    const canViewEdit     = currentUser?._id === profile?.user.id;
    const canViewFollow   = !canViewEdit && (following !== null && !following);
    const canViewUnFollow = !canViewEdit && following;
    const canCallCheckFollowUp = profile && !canViewEdit

    useEffect(()=>{
        if (!canCallCheckFollowUp) return setFollowing(null);

        checkFollowUpService(profile?.user.id).then(response => {
            if (!response.success){
                toast.error(response.message, {theme: "colored"})
                return
            }

            setFollowing(response.data.followed);
        }).catch(() => {
            toast.error("Error al cargar los datos", {theme: "colored"})
        })
    }, [profile?.user])

    const onFollow = () => {
        followService(profile?.user.id).then( response =>{
            if (!response.success){
                toast.error(response.message, {theme: "colored"})
                return
            }

            setFollowing(true);
        }).catch( ()=>{
            toast.error("Error en el servidor", {theme: "colored"})
        })
    }

    const onUnFollow = () => {
        unFollowService(profile?.user.id).then( response =>{
            if (!response.success){
                toast.error(response.message, {theme: "colored"})
                return
            }

            setFollowing(false);
        }).catch( ()=>{
            toast.error("Error en el servidor", {theme: "colored"})
        })
    }

    return(
        <div className={className}>
            {
                canViewEdit &&
                 <Button
                     onClick={() => setShowModal(true)}> Editar perfil
                 </Button>
            }

            {
                canViewFollow &&
                <Button onClick={onFollow}>
                    Seguir
                </Button>
            }

            {
                canViewUnFollow &&
                <Button className="unFollow" onClick={onUnFollow}>
                    <span>Siguiendo</span>
                </Button>
            }

            <ConfigModal
                show={showModal}
                setShow={setShowModal}
                title="Editar perfil">

                <EditUserForm profile={profile} setShowModal={setShowModal}/>

            </ConfigModal>
        </div>
    )
}
