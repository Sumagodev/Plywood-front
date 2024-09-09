import React, { useEffect, useState } from 'react'
import { getAllsubscription } from '../services/Subscription.service'
import { buySubscription } from '../services/UserSubscription.service';
import { errorToast, successToast } from './Utility/Toast'
import { useSelector } from 'react-redux';
import { getAlltopups } from '../services/topup.service';
import { buyTopup } from '../services/UserTopup.service';
import "../assets/css/Topup.css"

export default function Topup() {

    const [topupArr, setSubscriptionArr] = useState([]);
    let role = useSelector(state => state.auth.role)

    const handleGetSubscriptions = async () => {
        try {
            let { data: res } = await getAlltopups(`role=${role}`)
            if (res.data) {
                setSubscriptionArr(res.data)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    useEffect(() => {
        handleGetSubscriptions()
    }, [])



    const handleBuyTopup = async (subscriptionObj) => {
        try {
            let obj = {
                ...subscriptionObj
            }
            let { data: res } = await buyTopup(obj)
            if (res.message) {
                successToast(res.message);
                if (res?.data && res?.data.instrumentResponse) {
                    let instrumentResponse = res?.data.instrumentResponse;
                    if (instrumentResponse?.redirectInfo) {
                        window.location.href = instrumentResponse?.redirectInfo.url;
                        return 0;
                    }
                } else {
                    errorToast(
                        "`Phonepe is not working.Please Try Some another Payment Method"
                    );
                }
                return 0;

            }
        }
        catch (err) {
            console.log(err)
            errorToast(err)
        }
    }

    return (
        <div className='container-fluid subscription-container topup-subscription-container'>
            <div className="container">
                <div className="subsctiption-heading">
                    Our topup plans
                </div>
                <div className="subscription-description">
                    Buy our topup to get a steady flow of leads for your business and take your business to the next level.
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {
                                topupArr && topupArr.length > 0 && topupArr.map((el, index) => {
                                    return (
                                        <div key={index} className="subscription-card">
                                            <div className="subscription-card-heading">{el?.name}</div>
                                            <div className="subscription-card-price">₹ {el?.price}</div>
                                            {
                                                <div className="subscription-card-days">No Validity</div>
                                            }
                                            <div className="subscription-card-description mb-3">{el?.description}</div>
                                            <div className="subscription-card-days">{el?.numberOfSales != 0 ? `${el?.numberOfSales} Flash sales` : "No Flash sales"}</div>
                                            {

                                                <div className="subscription-card-description mt-0">For {el?.saleDays > 1 ? `${el?.saleDays} Days` : `${el?.saleDays} Day`}</div>
                                            }
                                            <div className="subscription-card-days">{el?.numberOfAdvertisement != 0 ? `${el?.numberOfAdvertisement} Advertisements` : "No Advertisements"}</div>
                                            {
                                                el?.advertisementDays > 0 &&
                                                <div className="subscription-card-description mt-0">For {el?.advertisementDays > 1 ? `${el?.advertisementDays} Days` : `${el?.advertisementDays} Day`}</div>
                                            }
                                            {
                                                el.messageArr && el.messageArr.length < 0 && (
                                                    <ul className="subscription-card-message-list pb-5 mb-3">
                                                        {
                                                            el.messageArr.map((ele, indexX) => (
                                                                <li key={indexX}>{ele?.message}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }

                                            <button className="yellow-bg btn text-white subsctiption-card-button" onClick={() => handleBuyTopup(el)}>
                                                Buy Now
                                            </button>
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
