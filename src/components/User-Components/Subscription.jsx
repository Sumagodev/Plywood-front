    import React, { useEffect, useState } from 'react'
import { getAllsubscription } from '../../services/Subscription.service'
import { buySubscription,buySubscriptionforhdfc } from '../../services/UserSubscription.service';
import { errorToast, successToast } from '../Utility/Toast'
import { useSelector } from 'react-redux';
import "../../assets/css/Subscription.css"

export default function Subscription() {

    const [subscriptionArr, setSubscriptionArr] = useState([]);
    let role = useSelector(state => state.auth.role)

    const handleGetSubscriptions = async () => {
        try {
            let { data: res } = await getAllsubscription(`role=${role}`)
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



    const handleBuySubscription = async (subscriptionObj) => {
        try {
            let obj = {
                ...subscriptionObj
            }
            console.log('jfheruithoiertoiejoeri',obj)
            let { data: res } = await buySubscription(obj)
         
            if (res.success) {

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
            errorToast(err)
        }
    }


    const handleBuySubscriptionforhdfc = async (subscriptionObj) => {
        try {
            let obj = {
                ...subscriptionObj
            }
            console.log('jfheruithoiertoiejoeri',obj)
            let { data: res } = await buySubscriptionforhdfc(obj)
         
            if (res.success) {

                successToast(res.message);
                if (res?.data && res?.data.payment_links) {
                    let payment_links = res?.data.payment_links;
                    if (payment_links?.redirectInfo) {
                        window.location.href = payment_links?.web;
                        return 0;
                    }
                } else {
                    errorToast(
                        "Payment gateway  is not working.Please Try Some another Payment Method"
                    );
                }
                return 0;
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    return (
        <div className='container-fluid subscription-container subscription-card-container'>
            <div className="container">
                <div className="subsctiption-heading">
                    Our Subscriptions
                </div>
                <div className="subscription-description">
                    Buy our subscription to get a steady flow of leads for your business and take your business to the next level.
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">

                            {
                                subscriptionArr && subscriptionArr.length > 0 && subscriptionArr.map((el, index) => {
                                    return (
                                        <div key={index} className="subscription-card">
                                            <div className="subscription-card-heading">{el?.name}</div>
                                            <div className="subscription-card-price">₹ {el?.price}  <span style={{ fontSize: 15, color: '#603200' }}>+18% GST </span></div>
                                            {
                                                el?.noOfMonth ?
                                                    <div className="subscription-card-days">{el?.noOfMonth} {el?.noOfMonth > 1 ? "months" : "month"}</div>
                                                    : <div className="subscription-card-days">No Validity</div>
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
                                            {/* {
                                                el.messageArr && el.messageArr.length > 0 && (
                                                    <ul className="subscription-card-message-list pb-5 mb-3">
                                                        {
                                                            el.messageArr.map((ele, indexX) => (
                                                                <li key={indexX}>{ele?.message}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            } */}


                                            <button className="yellow-bg btn text-white subsctiption-card-button" onClick={() => handleBuySubscription(el)}>
                                                Subscribe Now
                                            </button>
                                            {/* <button className="yellow-bg btn text-white subsctiption-card-button" onClick={() => handleBuySubscriptionforhdfc(el)}>
                                                Subscribe Now
                                            </button> */}
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
