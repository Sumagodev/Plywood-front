import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { deleteFlashSalebyId, getAllFlashSalesbyUserId } from '../../services/FlashSales.service';
import { getAllsubscription } from '../../services/Subscription.service'
import { buySubscription } from '../../services/UserSubscription.service';
import { errorToast, successToast } from '../Utility/Toast'
import {
    FaEdit, FaTrash, FaPencilAlt
} from "react-icons/fa";
import { FaPlus } from 'react-icons/fa'
import { toastSuccess } from '../../utils/toastutill';
import { getUserById } from '../../services/User.service';
import { deleteAdvertisement, getAllAdvertisements } from '../../services/Advertisement.service';
import { deletedealership,getAlldealership } from '../../services/AddDealership.service'
import { generateImageUrl } from '../../services/url.service';
import "../../assets/css/Topup.css"
export default function MyDealershipsusers() {
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

            let { data: res } = await getdealershipById(userObj._id);
            if (res.data) {
                console.log('pooja', res.data)
                
                setAdvertisementArr(res.data);
            }
        }
        catch (err) {
            errorToast(err);
        }
    }


    const handleDeleteFlashSale = async (id) => {
        try {

            let { data: res } = await deletedealership(id);
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
        navigate(`/AddDealership?id=${id}`)
    }


    return (


        <div className='container-fluid subscription-container topup-subscription-container'>
            <div className="container">
                <div className="subsctiption-heading">
                    Your Dealership &nbsp;&nbsp;
                    <Link
                        to="/AddDealership"
                        className="yellow-bg btn text-white subsctiption-card-button  rounded-circle"
                    >
                        <FaPlus />
                    </Link>

                </div>
                <div className="subscription-description">
                    Buy our Dealership to get a steady flow of leads for your business and take your business to the next level.
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {
                                advertisementArr && advertisementArr.length > 0 && advertisementArr.map((el, index) => {
                                    return (
                                        <div key={index} className="subscription-card pb-3">
                                            <div className="row ">
                                                <div className=' d-flex justify-content-end my-2'>

                                                    <button onClick={() => handleDeleteFlashSale(el._id)} className='yellow-bg btn text-white mx-2   rounded-5'>   <FaTrash /></button>


                                                    {/* <button onClick={() => handleRedirectToEditScreen(el?._id)} className='yellow-bg btn text-white  mx-2  rounded-5'><FaPencilAlt /></button> */}
                                                </div>
                                                <div className="col-12">

                                                    {
                                                        el.isVideo ?
                                                            <video style={{ width: "100%", height: 200 }} src={generateImageUrl(el.image)} />
                                                            :
                                                            <img style={{ width: "100%", height: 200, borderRadius: 20 }} className="shadow" src={generateImageUrl(el.image)} alt="" />
                                                    }

                                                    <div className="row pt-4">
                                                        <div className="col-6 my-1 clr">

                                                            Product Name:
                                                        </div>
                                                        <div className="col-6  my-1 clr">
                                                            {el.productId?.name}
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-6 my-1 clr">
                                                            Message:
                                                        </div>
                                                        <div className="col-6  my-1 clr">
                                                            {el?.message}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6 my-1 clr">
                                                            Start Date:
                                                        </div>
                                                        <div className="col-6  my-1 clr">
                                                            {moment(el?.startDate).format("DD-MM-YYYY")}
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-6 my-1 clr">
                                                            End Date:
                                                        </div>
                                                        <div className="col-6  my-1 clr">
                                                            {moment(el?.endDate).format("DD-MM-YYYY")}
                                                        </div>

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
        </div>
    )
}
