import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/User.service";
import { createTicket } from "../../services/UserTicket.service";
import { errorToast, successToast } from "../Utility/Toast";
import "../../assets/css/help.css";

export default function AddTickets() {
    const navigate = useNavigate()
    let userObj = useSelector(state => state.auth.user)
    const [userObjData, setUserObjData] = useState({});
    let id = useSelector(state => state.auth.user._id)
    const [message, setMessage] = useState("");


    const onSubmit = async () => {
        try {
            if (`${message}` === '' || !message) {
                errorToast('Please enter a message')
                return 0
            }

            let obj = {
                userId: userObj._id,
                name: message,

            }
            let { data: res } = await createTicket(obj)
            if (res.message) {
                successToast(res.message)
                // navigate(-1)
            }

        }
        catch (err) {
            errorToast(err)
        }

    }







    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                console.log(res.data, "dataa")
                setUserObjData(res.data);
            }
        }
        catch (err) {
            errorToast(err)
        }
    }



    useEffect(() => {
        handleGetUser()
    }, [])



    return (
        <div className="container add-ticket-container">
            <div className="row m-3 pt-3">
                <div className="col-12 col-md-12">
                    <div className="right">
                        <h3 className="heading ps-3">Create Ticket</h3>
                        <form className="form row profile-section-container " style={{ width: "100%" }}>
                            <div className="col-md-12">
                                <label>Reason / Message <span className="text-danger">*</span></label>
                                <textarea
                                    type="text"
                                    className="mt-3 form-control"
                                    value={message}
                                    placeholder={"Please enter your query"}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="col-md-12">
                                <button type="button" onClick={() => { onSubmit() }} className="btn btn-custom btn-yellow mt-2 add-ticket-btn-submit">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
