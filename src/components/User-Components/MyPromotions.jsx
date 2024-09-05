import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFlashSalebyId, getAllFlashSalesbyUserId } from '../../services/FlashSales.service';
import { getAllsubscription } from '../../services/Subscription.service'
import { buySubscription } from '../../services/UserSubscription.service';
import { errorToast, successToast } from '../Utility/Toast'
import {
    FaEdit, FaTrash
} from "react-icons/fa";
import { toastSuccess } from '../../utils/toastutill';
import { getUserById } from '../../services/User.service';
import { deleteAdvertisement, getAllAdvertisements } from '../../services/Advertisement.service';
import { generateImageUrl } from '../../services/url.service';
export default function MyPromotions() {
    const navigate = useNavigate()
    let userObj = useSelector(state => state.auth.user)
    let id = useSelector(state => state.auth.user._id)
    const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);
    const [userDataObj, setUserDataObj] = useState({});
    const [advertisementArr, setAdvertisementArr] = useState([]);




    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                setUserDataObj(res.data)
                setUserSubscriptionExpired(res.data.userSubscriptionExpired)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    const handleGetAdvertisements = async (id) => {
        try {

            let { data: res } = await getAllAdvertisements(id);
            if (res.data) {
                console.log(res.data)
                setAdvertisementArr(res.data);
            }
        }
        catch (err) {
            errorToast(err);
        }
    }


    const handleDeleteFlashSale = async (id) => {
        try {

            let { data: res } = await deleteAdvertisement(id);
            if (res.message) {
                toastSuccess(res.message)
                handleGetAdvertisements(userObj._id)
            }
        }
        catch (err) {
            errorToast(err);
        }
    }

    useEffect(() => {
        if (userObj) {
            handleGetAdvertisements(userObj._id);
            handleGetUser()
        }
    }, [userObj])

    const handleRedirectToEditScreen = async (id) => {
        navigate(`/AddPromotions?id=${id}`)
    }


    return (
        <div className='container-fluid subscription-container'>
            <div className="container">
                <div className="row me-2 d-flex justify-content-between">
                    <div className="col-6 col-sm-7 subsctiption-heading">
                        Your Promotions
                    </div>
                    <div className="col-6 col-sm-5 mt-5 justify-content-end">
                        {
                            (userSubscriptionExpired == false && userDataObj?.numberOfAdvertisement > 0 && !userDataObj?.isBlocked) ?
                                <div className="row d-flex justify-content-end">
                                    <button className="theme-outline-button" onClick={() => navigate("/AddPromotions")}>
                                        Create an advertisement
                                    </button>
                                </div>
                                :
                                (!userSubscriptionExpired && (!userDataObj?.numberOfAdvertisement || userDataObj?.numberOfAdvertisement <= 0) && !userDataObj?.isBlocked) &&
                                <div className="row d-flex justify-content-end">
                                    <button className="theme-outline-button" onClick={() => navigate("/Subscription")}>
                                        Purchase a subscription
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                {
                    (userSubscriptionExpired) &&
                    <div className="subscription-description">
                        You do not have a valid subscription , subscribe one to add an advertisement
                    </div>
                }
                {
                    (userDataObj?.numberOfAdvertisement <= 0) &&
                    <div className="subscription-description">
                        You do not have a enough balance in your account , subscribe one to add an advertisement
                    </div>
                }
                {
                    (userDataObj?.isBlocked) &&
                    <div className="subscription-description">
                        Your subscription has been blocked by admin please contact admin for further details
                    </div>
                }
                <div className="row">
                    <div className="col-12">
                        <div className="row d-flex justify-content-between">

                            {
                                advertisementArr && advertisementArr.length > 0 && advertisementArr.map((el, index) => {
                                    return (

                                        <div className="col-lg-4 col-sm-12 col-md-6 mb-3">
                                        <div key={index} className='profile-section-container '>
                                        <span>width:356px and height:250px</span>
                                            <div className="row">
                                                <div className="col-3">
                                                    {/* <h4><b>{el?.userObj?.name}</b></h4> */}
                                                    
                                                </div>
                                                <div className="col-9 d-flex justify-content-end">
                                                    <div className="theme-outline-button" onClick={() => handleRedirectToEditScreen(el._id)} style={{ fontSize: 12, padding: "4px 10px" }}>
                                                        <FaEdit />
                                                        {/* Created On -  {moment(el?.createdAt).format("DD-MM-YYYY")} */}
                                                    </div>
                                                    <div className="theme-outline-button ms-2" onClick={() => handleDeleteFlashSale(el._id)} style={{ fontSize: 12, padding: "4px 10px" }}>
                                                        <FaTrash />
                                                        {/* Created On -  {moment(el?.createdAt).format("DD-MM-YYYY")} */}
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="row mt-4">
                                                <div className="col-12">
                                               
                                                    {
                                                        el.isVideo ?
                                                            <video style={{ width: "100%", height: 200 }} src={generateImageUrl(el.image)} />
                                                            :
                                                            <img style={{ width: "100%", height: 200 }} src={generateImageUrl(el.image)} alt="" />
                                                    }
                                                    
                                                </div>
                                                <div className="col-5 my-1">
                                          
                                                    Product Name:
                                                </div>
                                                <div className="col-7  my-1">
                                                    {el?.productId.name}
                                                </div>
                                                <div className="col-5 my-1">
                                                    Message:
                                                </div>
                                                <div className="col-7  my-1">
                                                    {el?.message}
                                                </div>
                                                <div className="col-5 my-1">
                                                    Start Date:
                                                </div>
                                                <div className="col-7  my-1">
                                                    {moment(el?.startDate).format("DD-MM-YYYY")}
                                                </div>
                                                <div className="col-5 my-1">
                                                    End Date:
                                                </div>
                                                <div className="col-7  my-1">
                                                    {moment(el?.endDate).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
