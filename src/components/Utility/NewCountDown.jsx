import React from 'react'
import Countdown from 'react-countdown';
import { SwiperSlide } from 'swiper/react';
import { generateImageUrl } from '../../services/url.service';
import { MdCall, MdOutlineVerified } from "react-icons/md";
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

export default function NewCountDown({ index, el }) {

    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, miliseconds }) => {
        // if (completed) {
        //   // Render a completed state
        //   return <Completionist />;
        // } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}:{miliseconds}</span>;
        // }  
    };


    const handleGetDifferenceInMs = (firstDate) => {
        console.log(firstDate, "firstDate, secondDate")
        if (firstDate) {
            const firstDateInMs = new Date().getTime()
            const secondDateInMs = new Date(firstDate).getTime()

            const differenceBtwDates = secondDateInMs - firstDateInMs

            const aDayInMs = 24 * 60 * 60 * 1000

            const daysDiff = Math.round(differenceBtwDates / aDayInMs)
            console.log(differenceBtwDates, "differenceBtwDates", daysDiff, "daysDiff")
            // return differenceBtwDates
            return daysDiff
        }
    }
    return (

        <div className="product-box-2">
            <div className="position-relative">
                <Countdown
                    date={el?.endDate}
                    // date={new Date(el?.endDate).getTime()}
                    intervalDelay={0}
                    precision={3}
                    key={index + 2}
                    renderer={renderer} />
                <CountdownTimer key={index + 2} targetDate={el.endDate} />
                <Link to="/ShopDetail">
                    <img src={generateImageUrl(el.productId.mainImage)} alt="" className="img" />
                    <div className="overlyasper"></div>
                </Link>
                <h6 className="title">
                    <Link to="/ShopDetail">
                        {el?.productId?.name}
                    </Link>
                </h6>
                <ul className="tags">
                    <li>{ }% OFF</li>
                    {new Date(el?.endDate).toDateString()}

                </ul>
            </div>

            <div className="content">
                <div>
                    <h6 className="old">
                        <span className="prize">₹{el?.price}</span>
                        <span className="small text-muted">/ Sq ft</span>
                    </h6>
                    <h6 className="new">
                        <span className="prize">₹{el?.salePrice}</span>
                        <span className="small text-muted">/ Sq ft</span>
                    </h6>
                </div>
                <button className="call-btn">
                    <MdCall />
                </button>
            </div>
        </div>
    )
}
