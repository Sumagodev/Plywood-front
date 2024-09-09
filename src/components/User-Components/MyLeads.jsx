import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/User.service';
import { getLeadsBycreatedById } from '../../services/leads.service';
import { errorToast } from '../Utility/Toast';

export default function MyLeads() {
    let role = useSelector(state => state.auth.role)
    let id = useSelector(state => state.auth.user._id)
    const navigate = useNavigate()
    const [leadsArr, setLeadsArr] = useState([]);
    const [userObj, setUserObj] = useState({});
    const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);
    const [userSubscriptionBlocked, setUserSubscriptionBlocked] = useState(false);

    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                console.log(res.data, "dataa")
                setUserObj(res.data);
                setUserSubscriptionExpired(res.data.userSubscriptionExpired)
                setUserSubscriptionBlocked(res.data.isBlocked)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    const handleGetUserSubscription = async () => {
        try {
            let { data: res } = await getLeadsBycreatedById(id)
            // console.log(res, "dataa")
            if (res.data) {
                // let tempArr = res.data.map((el, i) => {
                //     let obj = {
                //         ...el
                //     }
                //     if (i == 0) {
                //     }
                //     else {
                //     }
                //     return obj
                // })
                setLeadsArr(res.data);
            }
        }
        catch (err) {
            errorToast(err)
        }
    }


    useEffect(() => {
        handleGetUserSubscription()
        handleGetUser()
    }, [])

    return (
        <div className='container my-5'>
            <div className="row d-flex justify-content-between">
                <div className="col-lg-6 ms-2 pt-2 profile-section-Heading mb-3 ">My Leads</div>
            </div>

            {/* <div className="rounded">
                <div className="">
                <div className="row">
                    {
                        (userSubscriptionExpired == false) && (userSubscriptionBlocked == false) ?
                            leadsArr && leadsArr.length > 0 && leadsArr.map((el, index) => {
                                return (
                                    <>
                                    
                                        <div className="col-md-6">
                                        <div key={index} className='profile-section-container'>
                                        <div className="row flex_deraction_row">
                                            <div className="col-6">
                                                <h4><b>{el?.userObj?.name}</b></h4>
                                            </div>
                                            <div className="col-12 ">
                                                <div className="theme-outline-button">
                                                    Contacted On -  {moment(el?.createdAt).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-3 my-1">
                                                User Name:
                                            </div>
                                            <div className="col-9  my-1">
                                                {el?.userObj?.name}
                                            </div>
                                            <div className="col-3 my-1">
                                                Phone:
                                            </div>
                                            <div className="col-9  my-1">
                                                {el?.userObj?.phone}
                                            </div>
                                            <div className="col-3 my-1">
                                                Email:
                                            </div>
                                            <div className="col-9  my-1">
                                                {el?.userObj?.email}
                                            </div>
                                            <div className="col-3 my-1">
                                                Contacted On:
                                            </div>
                                            <div className="col-9  my-1">
                                                {new Date(el?.createdAt).toDateString()}
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                   
                                   
                                    </>
                                )
                            })
                            :
                            userSubscriptionBlocked ?
                                <>
                                    <div className="col-6 ms-2 profile-section-Sub-Heading">Your subscription has been blocked by admin please contact admin for further details   </div>
                                </>
                                :

                                <>
                                    <div className="col-6 ms-2 profile-section-Sub-Heading">You have {leadsArr ? leadsArr.length : 0} leads , get a subscription to view the leads   </div>
                                    <div className="d-flex justify-content-end">
                                        <div className="theme-outline-button" onClick={() => navigate("/Subscription")}>
                                            View Subsciptions
                                        </div>
                                    </div>
                                </>

                    }

                    </div>


                </div>

            </div> */}
            <div className="rounded">
                <div className="">
                    <div className="row">
                        {
                            (userSubscriptionExpired == false) && (userSubscriptionBlocked == false) ?
                                leadsArr && leadsArr.length > 0 && leadsArr.map((el, index) => {
                                    return (
                                        <>

                                            <div className="col-md-4 col-12 mt-2 ">
                                                <div key={index} className='profile-section-container'  style={{background: "#F5F1E8",boxShadow: "12px 14px 35px 0px #00000040"}}>
                                                    <div className="row flex_deraction_row">
                                                        <div className="col-6">
                                                            {/* <h4><b>{el?.userObj?.name}</b></h4> */}
                                                        </div>
                                                        {/* <div className="col-12 ">
                                                            <div className='text-black'>
                                                                <span className='fw-bold'> Contacted</span>    : On -  {moment(el?.createdAt).format("DD-MM-YYYY")}
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <div className="row ">
                                                        <div className="col-4  fw-bold text-black ">
                                                            User Name :
                                                        </div>
                                                        <div className="col-8   text-black ">
                                                            {el?.userObj?.name}
                                                        </div>
                                                        <div className="col-4   fw-bold text-black">
                                                            Phone :
                                                        </div>
                                                        <div className="col-8   text-black">
                                                            {el?.userObj?.phone}
                                                        </div>
                                                        <div className="col-2   fw-bold text-black">
                                                            Email:
                                                        </div>
                                                        <div className="col-10   text-black email ">
                                                            {el?.userObj?.email}
                                                        </div>
                                                        {/* <div className='contact-btn '>
                                                            <div className="col-3   fw-bold text-black">
                                                                Contacted:
                                                            </div>
                                                            <div className="col-7   text-black">
                                                                On {new Date(el?.createdAt).toDateString()}
                                                            </div>
                                                        </div> */}
                                                        <div className="col-12 contact-btn mt-2">
                                                            <div className='text-white'>
                                                                <span className='fw-bold'> Contacted</span> :  On {new Date(el?.createdAt).toDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </>
                                    )
                                })
                                :
                                userSubscriptionBlocked ?
                                    <>
                                        <div className="col-6 ms-2 profile-section-Sub-Heading">Your subscription has been blocked by admin please contact admin for further details   </div>
                                    </>
                                    :

                                    <>
                                        <div className="col-6 ms-2 profile-section-Sub-Heading">You have {leadsArr ? leadsArr.length : 0} leads , get a subscription to view the leads   </div>
                                        <div className="d-flex justify-content-end">
                                            <div className="theme-outline-button" onClick={() => navigate("/Subscription")}>
                                                View Subsciptions
                                            </div>
                                        </div>
                                    </>

                        }

                    </div>


                </div>

            </div>

        </div >
    )
}
