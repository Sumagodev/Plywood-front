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
import { getAllAdvertisements } from '../../services/Advertisement.service';
import { getDealershipOwnerByUserId, deletedealership ,getDealershipApplicationsByUserId} from '../../services/AddDealership.service'
import { generateImageUrl } from '../../services/url.service';
import {getForBannerImagesHomepage,deleteBannerImage} from '../../services/Bannerimsges.service'
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

             const res  = await getForBannerImagesHomepage(userObj._id);
            
                console.log('pooja', res.data)

                setAdvertisementArr(res.data.bannerImages);
         
        }
        catch (err) {
            errorToast(err);
        }
    }


    const handleDeleteFlashSale = async (id) => {
        try {

            let { data: res } = await deleteBannerImage(id);
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
        navigate(`/addbannerimg?id=${id}`)

    }


    return (


        <div className='container-fluid subscription-container topup-subscription-container'>
            <div className="container">
                <div className="subsctiption-heading">
                    Your Dealership &nbsp;&nbsp;
                    <Link
                        to="/addbannerimg"
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
                                advertisementArr && advertisementArr.length > 0 && advertisementArr.filter((a)=>a.type !=="Adminbanner").map((el, index) => {
                                    console.log("advertisementArr...........................", advertisementArr);

                                    return (
                                        <div key={index} className="subscription-card pb-3" style={{ background: "#F5F1E8", boxShadow: "12px 14px 35px 0px #00000040" }}>
                                            <div className="row ">
                                                <div className=' d-flex justify-content-end my-2'>

                                                    <button onClick={() => handleDeleteFlashSale(el._id)} className='yellow-bg btn text-white mx-2   rounded-5'>   <FaTrash /></button>


                                                    {/* <button onClick={() => handleRedirectToEditScreen(el._id)} className='yellow-bg btn text-white  mx-2  rounded-5'><FaPencilAlt /></button> */}
                                                </div>
                                                <div className="col-12">


                                                    <img style={{ width: "100%", height: 200, borderRadius: 20 }} className="shadow"  src={generateImageUrl(el.image)} alt="" />


                                                   

                                                   
                                                    <div className="row">
                                                        <div className="col-6 my-1 clr">
                                                            Type:
                                                        </div>
                                                        <div className="col-6  my-1 clr">
                                                            {el?.type}
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
