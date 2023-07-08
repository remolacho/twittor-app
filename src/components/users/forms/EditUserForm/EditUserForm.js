import React, {useState, useCallback} from "react";
import { Form, Button, Row, Col, Spinner } from  "react-bootstrap";
import DatePicker from "react-datepicker"
import DateLangEs from "date-fns/locale/es"
import { useDropzone } from "react-dropzone"
import { CameraIcon } from "../../../../utils/icons"
import {each} from "lodash";
import {toast} from "react-toastify";
import {uploadImageService} from "../../../../services/users/uploadImageService";
import {validFormProfile} from "../../../../utils/validations/profile";
import {updateService} from "../../../../services/users/updateServise";
import {uniqueTimestamp} from  "../../../../utils/shared";
import {API_HOST, V1_API} from "../../../../utils/variablesApi";

import "./EditUserForm.scss"

function attributes(){
    return  {
        name:      "",
        lastname:  "",
        biography: "",
        location:  "",
        sideWeb:   "",
        birthday:  ""
    }
}

function initializerUser(user){
    let userAttributes = attributes();

    if (!user) return userAttributes;

    each(userAttributes, (value, key) => {
        userAttributes[key] = user[key] || ""
    })

    return userAttributes
}

export default function EditUserForm(props){
    const { profile, setShowModal } = props;
    const [formData, setFormData] = useState(initializerUser(profile?.user));
    const [loading, setLoading] = useState(false);

    const [bannerFile, setBannerFile] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(
        profile
            ? `${API_HOST}/${V1_API}/users/banner?userId=${profile?.user.id}&timestamp=${uniqueTimestamp()}`
            : null
    );

    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    }, [])

    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    })

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(
        profile ?
            `${API_HOST}/${V1_API}/users/avatar?userId=${profile?.user.id}&timestamp=${uniqueTimestamp()}`
            : null
    );

    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    }, [])

    const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        const formProfile = validFormProfile(formData);

        if(!formProfile.isValid){
            toast.error(formProfile.message, {theme: "colored"});
            return null;
        }

        setLoading(true);

        if(bannerFile){
            await uploadImageService(bannerFile, "banner").catch(() =>{
                toast.error("Error al cargar el banner", {theme: "colored"});
            })
        }

        if(avatarFile){
            await uploadImageService(avatarFile, "avatar").catch(() =>{
                toast.error("Error al cargar el avatar", {theme: "colored"});
            })
        }

        await updateService(formData).then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            setShowModal(false);
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })

        setLoading(false);
        window.location.reload();
    }

    return (
        <div className="edit-user-form">
            <div
                className="banner"
                style={{ backgroundImage: `url('${bannerUrl}')`}}
                {...getRootBannerProps()} >

                <input {...getInputBannerProps()} />
                <CameraIcon/>
            </div>

            <div className="avatar"
                 style={{ backgroundImage: `url('${avatarUrl}')`}}
                 {...getRootAvatarProps()} >

                <input {...getInputAvatarProps()} />
                <CameraIcon/>
            </div>

            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                defaultValue={formData.name}
                                type="text"
                                placeholder="Nombre"
                                name="name"
                                onChange={onChange}
                            />
                        </Col>

                        <Col>
                            <Form.Control
                                defaultValue={formData.lastname}
                                type="text"
                                placeholder="Apellido"
                                name="lastname"
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        defaultValue={formData.biography}
                        as="textarea"
                        row="5"
                        placeholder="Biografia"
                        type="text"
                        name="biography"
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        defaultValue={formData.sideWeb}
                        placeholder="Sitio web"
                        type="text"
                        name="sideWeb"
                        onChange={onChange}
                    />
                </Form.Group>

               <Form.Group>
                   <DatePicker
                       placeholder="Fecha de nacimiento"
                       locale={DateLangEs}
                       selected={new Date(formData.birthday)}
                       onChange={date => setFormData({...formData, birthday: date})}
                   />
               </Form.Group>

                <Button className="btn-submit"
                        variant="primary"
                        type="submit">
                    { loading && <Spinner animation="border" size="sm"/> } Actualizar
                </Button>
            </Form>
        </div>
    )
}
