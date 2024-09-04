import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLeadsById } from '../../services/leads.service';
import { getAllSubscriptionbyUserId } from '../../services/UserSubscription.service';
import { errorToast } from '../Utility/Toast';
import "../../assets/css/RecentActivities.css"

export default function RecentActivities() {
    let role = useSelector(state => state.auth.role)
    let id = useSelector(state => state.auth.user._id)
    const [userObj, setUserObj] = useState({});
    const navigate = useNavigate()
    const [leadsArr, setLeadsArr] = useState([]);


    const handleGetUserSubscription = async () => {
        try {
            let { data: res } = await getLeadsById(id)
            console.log(res, "dataa")
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

    }, [])

    return (
        <div className='container my-5 recentactivities-main-container'>

            <div className="row d-flex justify-content-between">
                <div className="col-12 my-3 profile-section-Heading text-center fs-2 fw-bold">Recent Activities</div>
            </div>
            <div className="rounded">
                <div className="row mt-3 d-flex justify-content-between">
                    {
                        leadsArr && leadsArr.length > 0 && leadsArr.map((el, index) => {
                            return (
                                <div className='col-lg-6'>
                                    <div key={index} className='profile-section-container my-3'>
                                        <div className="row align-items-center sub-section-1">
                                            <div className="col-12 col-sm-6 my-2 fs-4 text-white fw-bold text-center">
                                                {el?.name}
                                            </div>
                                            <div className="col-12 col-sm-6 d-flex justify-content-center">
                                                <div className="theme-outline-button">
                                                    Contacted On -  {moment(el?.createdAt).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4 sub-section-2">
                                            <div className="col-3 my-1 fw-bold">
                                                Product Name:
                                            </div>
                                            <div className="col-9 my-1">
                                                {el?.productObj?.name ? el?.productObj?.name : "NA"}
                                            </div>
                                            <div className="col-3 my-1 fw-bold">
                                                Product Price:
                                            </div>
                                            <div className="col-9 my-1">
                                                {el?.productObj?.sellingprice ? ("₹" + el?.productObj?.sellingprice) : "NA"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>


        </div >
    )
}
