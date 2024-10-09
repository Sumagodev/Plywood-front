import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../Utility/Toast';
import { getUserNotifications, getupadateRead, getUserById, checkForValidSubscriptionAndReturnBoolean } from '../../services/User.service'; // Import your API call

export default function UserNotifications() {
    const userObj = useSelector(state => state.auth.user);
    const { _id } = userObj || {};
    const auth = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [totalElements, setTotalElements] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [productArr, setProductArr] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [userSubscriptionStatus, setUserSubscriptionStatus] = useState({ expired: true, blocked: false });
    const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGetUser = async () => {
        try {
            const { data: res } = await getUserById(_id);
            if (res.data) {
                setUserSubscriptionStatus({
                    expired: res.data.userSubscriptionExpired,
                    blocked: res.data.isBlocked
                });
            }
        } catch (err) {
            errorToast(`Failed to fetch user data: ${err.message}`);
        }
    };

    const handleGetProducts = async (skipValue, limitValue) => {
        setLoading(true);
        try {
            const query = `?page=${skipValue}&perPage=${limitValue}&userId=${_id}`;
            const { data: res } = await getUserNotifications({ userId: _id });
            if (res.data) {
                setTotalElements(res.totalElements);
                setProductArr(res.data);
            }
        } catch (err) {
            errorToast(`Failed to fetch notifications: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Function to mark a notification as read when clicked
    const handleNotificationClick = async (notificationId) => {
        try {
            await getupadateRead({ userId: _id, notificationId });
            // Update the local state to reflect the read status
            setProductArr(prevArr =>
                prevArr.map(notification =>
                    notification._id === notificationId ? { ...notification, isRead: true } : notification
                )
            );
        } catch (err) {
            errorToast(`Failed to mark notification as read: ${err.message}`);
        }
    };

    const debouncedSave = useCallback(
        debounce((nextValue) => handleGetProducts(page, limit, nextValue), 1000),
        []
    );

    const handlePageChange = (page) => {
        if (Math.ceil(totalElements / limit) >= page) {
            setPage(page);
            handleGetProducts(page, limit);
        }
    };

    const HandleCheckValidSubscription = async () => {
        try {
            const { data: res } = await checkForValidSubscriptionAndReturnBoolean(auth?._id);
            if (res.data) {
                setCurrentUserHasActiveSubscription(res.data);
            }
        } catch (err) {
            // Handle error as needed
        }
    };

    useEffect(() => {
        handleGetUser();
        handleGetProducts(page, limit);
        HandleCheckValidSubscription();
    }, [page, limit, searchQuery]);

    const calculateDaysLeft = (endDate) => {
        const currentDate = new Date();
        const end = new Date(endDate);
        const differenceInTime = end.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays >= 0 ? differenceInDays : 0; // Return 0 if the date has already passed
    };

    return (
        <div className="container-fluid topup-subscription-container">
            <div className="row d-flex justify-content-center">
                <div className="col-10 mb-5">
                    <h4 className="yellow">Your Notifications</h4>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="rounded">
                            <div className="row d-flex justify-content-between">
                                {productArr.map((item, index) => {
                                    const daysLeft = item.type === 'flash_sale'
                                        ? calculateDaysLeft(item.payload?.flashSaleDetails?.endDate)
                                        : null;

                                    const messagesByType = {
                                        'profile_view': !currentUserHasActiveSubscription
                                            ? 'Someone viewed your profile.'
                                            : (<> 👁️ <b>{item.payload?.organizationName}</b> viewed your profile.</>),
                                        'product_view': !currentUserHasActiveSubscription
                                            ? `Someone viewed your product ${item.payload?.productObj?.slug}`
                                            : `${item.payload?.organizationName || 'An organization'} viewed your product ${item.payload?.productObj?.slug || 'Unnamed Product'}`,
                                        'contact': !currentUserHasActiveSubscription
                                            ? 'A user contacted you.'
                                            : (<><b>{item.payload?.organizationName}</b> contacted you.</>),
                                        'flash_sale': daysLeft !== null
                                            ? `Get ${item.payload?.flashSaleDetails?.discountValue || 'Unnamed Product'}% OFF our top-selling ${item.payload?.productName} for the next ${daysLeft} days only!`
                                            : `💥 Stock is limited, so grab the offer and Save Big!`,
                                        'new_arrival': (<>
                                            🌟 <b className='text-success'>New Arrivals</b> Are Here! 🌟 Check out the latest Product <b> {item.payload?.productName} </b> to our collection!  Your product has been reviewed and approved. You’re all set to move forward!
                                        </>),
                                        'product_approval_confirmation': `👋 Hi ${item.payload?.organizationName}, Your Product Is Approved! 👋${item.payload?.productName}`,
                                        'product_review': `🌟 ${item.payload?.organizationName} 🌟Review your product ${item.payload?.productName}`,
                                        'vendor_review': `🌟 New Arrivals Are Here! 🌟 Check out the latest Product ${item.payload?.productName} to our collection!`,
                                        'dealershipOpportunity': (
                                            <>
                                                🌟 Exclusive Dealership Opportunity Available For {item.payload?.organizationObj?.brandNames}! 🌟
                                                <br />
                                                {item.payload?.organizationName} is thrilled to announce a new dealership/distributor opportunity in {item.payload?.organizationObj?.address}! Join our growing network and become a part of our success story. Interested? Fill the given form to
                                                <a href='/AddDealership' className='fw-bold'>&nbsp;Apply</a> and learn more!
                                            </>
                                        ),
                                        'product_under_review': (`👋 Hi ${item.payload?.organizationName}, Your Product is Now Under Review! 👋 Our team is currently checking the details. We’ll notify you once the verification is complete. Thanks for your patience!`),
                                    };

                                    const message = messagesByType[item.type] || item.type;

                                    return (
                                        <div key={index} className="col-md-6 col-12 mt-2">
                                            <div
                                                className="profile-section-container"
                                                style={{
                                                    background: item.isRead ?  "#FFF":"#e2c6ae" , // Change background color based on isRead
                                                    boxShadow: "2px 4px 5px 0px #00000040"
                                                }}
                                                onClick={() => {
                                                    handleNotificationClick(item._id);
                                                    console.log(item); // Log the entire item to see its structure
                                                    if (item.type === "product_review" || item.type === "profile_view") {
                                                        navigate(`/Supplier/${item.userId}`);
                                                    } else {
                                                        console.log("Navigating to Supplier with ID:", item.payload?.addedbyUserObj?._id); // Log the ID
                                                        navigate(`/`);
                                                    }
                                                }}
                                                 // Add onClick handler here
                                            >
                                                <div className="row flex_direction_row">
                                                    <div className="col-6">
                                                        {item.payload?.bannerImage && <img src={item.payload.bannerImage} className='img-fluid' alt="Banner" />}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-2">
                                                        <strong className='clr fs-5'>{new Date(item.createdAt).toDateString()}</strong>
                                                    </div>
                                                    <div className="text-dark">{message}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Pagination Controls */}
                            <div className="pagination-controls">
                                {Array.from({ length: Math.ceil(totalElements / limit) }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        disabled={page === index + 1}
                                        className={`page-button ${page === index + 1 ? 'active' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
