import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLeadsById } from '../../services/leads.service';
import { getAllSubscriptionbyUserId } from '../../services/UserSubscription.service';
import { errorToast } from '../Utility/Toast';

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
        <div className='container my-5'>

            <div className="row d-flex justify-content-between">
                <div className="col-12 ms-2 pt-2 profile-section-Heading">Recent Activities</div>
            </div>
            <div className="rounded">
                <div className="row mt-4 d-flex justify-content-between">
                    {
                        leadsArr && leadsArr.length > 0 && leadsArr.map((el, index) => {
                            return (
                                <div key={index} className='profile-section-container'>
                                    <div className="row align-items-center">
                                        <div className="col-4 col-sm-6">
                                            <h4><b>{el?.name}</b></h4>
                                        </div>
                                        <div className="col-8 col-sm-6 d-flex justify-content-end">
                                            <div className="theme-outline-button">
                                                Contacted On -  {moment(el?.createdAt).format("DD-MM-YYYY")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-3 my-1">
                                            Product Name:
                                        </div>
                                        <div className="col-9 my-1">
                                            {el?.productObj?.name ? el?.productObj?.name : "NA"}
                                        </div>
                                        <div className="col-3 my-1">
                                            Product Price:
                                        </div>
                                        <div className="col-9 my-1">
                                            {el?.productObj?.sellingprice ? ("₹" + el?.productObj?.sellingprice) : "NA"}
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
