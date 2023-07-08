import React from "react";
import moment from "moment";
import location from "moment/locale/es"
import { LocationIcon, LinkIcon, BirthdateIcon } from "../../../../utils/icons";
import "./InfoUser.scss"

export default function InfoUser(props){
    const { user } = props;

    return(
        <div className="info-user">
            <h2 className="name">
                { user?.name } { user?.lastname }
            </h2>

            <p className="email">
                { user?.email }
            </p>

            { user?.biography &&
                <div className="biography">
                  { user.biography }
                </div>
            }

            <div className="more-info">
                { user?.location &&
                    <p className="">
                        <LocationIcon/>
                        { user.location }
                    </p>
                }

                { user?.sideWeb &&
                    <a  href={user.sideWeb}
                        target="_blank"
                        rel="noopener noreferrer">
                        <LinkIcon/> { user.sideWeb }
                    </a>
                }

                { user?.birthday &&
                    <p className="">
                        <BirthdateIcon/>
                        { moment(user.birthday).locale("es", location).format("LL") }
                    </p>
                }
            </div>
        </div>
    )
}
