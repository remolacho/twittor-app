import React, {useState}  from "react";
import { Button } from  "react-bootstrap";
import ConfigModal from "../../../../components/modals/ConfigModal"
import EditUserForm from "../../forms/EditUserForm";

export default function ActionsProfile(props){
    const { user, currentUser, className } = props;
    const [showModal, setShowModal] = useState(false);

    if (!user) return null

    const canEdit = currentUser?._id === user.id;
    const canFollow = currentUser?._id !== user.id

    return(
        <div className={className}>
            {canEdit &&
                 <Button
                     onClick={() => setShowModal(true)}> Editar perfil
                 </Button>
            }

            {canFollow &&
                <Button>
                    Seguir
                </Button>
            }

            <ConfigModal
                show={showModal}
                setShow={setShowModal}
                title="Editar perfil">

                <EditUserForm user={user} setShowModal={setShowModal}/>

            </ConfigModal>
        </div>
    )
}
