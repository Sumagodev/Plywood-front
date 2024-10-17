import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AddAdvertisement, getAdvertisementById, getForHomepage, updateAdvertisementApi } from "../../services/Advertisement.service";
import { getBrandApi } from "../../services/brand.service";
import { getAllCategories } from "../../services/Category.service";
import { createFlashSales, getFlashSalebyId, updateFlashSalebyId } from "../../services/FlashSales.service";
import { AddProduct, getAllProducts, getProductById, updateProductApi } from "../../services/Product.service";
import { generateImageUrl } from "../../services/url.service";
import { getUserById } from "../../services/User.service";
import { toastError } from "../../utils/toastutill";
import FileUpload from "../Utility/FileUpload";
import { errorToast, successToast } from "../Utility/Toast";

export default function AddPromotion() {
    const navigate = useNavigate()
    let userObj = useSelector(state => state.auth.user)
    const [userObjData, setUserObjData] = useState({});
    let id = useSelector(state => state.auth.user._id)
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [isEditingModeOn, setIsEditingModeOn] = useState(false);
    const [productArr, setProductArr] = useState([]);
    const [productId, setProductId] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [searchParams, setSearchParams] = useSearchParams();
    const [productSlug, setProductSlug] = useState("");
    const [isVideo, setIsVideo] = useState(false);

    const onSubmit = async () => {
        try {
            if (`${productId}` === '' || !productId) {
                errorToast('Please select a product')
                return 0
            }

            let obj = {
                userId: userObj._id,
                productId,
                message,
                image,
                productSlug,
                endDate,
                startDate,
                isVideo
            }

            if (isEditingModeOn) {
                let { data: res } = await updateAdvertisementApi(obj, searchParams.get("id"))
                if (res.message) {
                    successToast(res.message)
                    navigate(-1)
                }
            }

            else {
                let { data: res } = await AddAdvertisement(obj)
                console.log(res, "asd")
                if (res.message) {
                    successToast(res.message)
                }
            }

        }
        catch (err) {
            errorToast(err)
        }

    }
    const handleEndDateChange = (value) => {
        const selectedEndDate = new Date(value);
        const selectedStartDate = new Date(startDate);

        if (selectedEndDate <= selectedStartDate) {
            errorToast("End date must be greater than start date.");
        } else {
            setEndDate(value);
        }
    };
    const handleStartDateChange = (value) => {
        const selectedEndDate = new Date(endDate);
        const selectedStartDate = new Date(value);

        if (selectedEndDate <  selectedStartDate) {
            errorToast("start date must be greater than start date.");
        } else {
            setStartDate(value);
        }
    };
    const handleGetProducts = async () => {
        try {

            let query = `page=${1}&perPage=${10000}&userId=${userObj?._id}`
            let { data: res } = await getAllProducts(query)
            if (res.data) {
                setProductArr(res.data)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }
    const handleGetSaleById = async () => {
        try {

            let { data: res } = await getAdvertisementById(searchParams.get("id"))
            if (res.data) {
                console.log(res.data, "getById")
                setProductId(res.data.productId);
                setImage(res.data.image);
                setMessage(res.data.message)
                setProductSlug(res.data.productSlug)
                setStartDate(res.data.startDate)
                setEndDate(res.data.endDate)
                setIsVideo(res.data.isVideo)
                // setProductArr(res.data)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }
    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                console.log(res.data, "dataa")
                setUserObjData(res.data);
            }
        }
        catch (err) {
            errorToast(err)
        }
    }
    useEffect(() => {
        if (image && image.includes("base64")) {
            if (image.slice(0, 30).toLowerCase().includes("video")) {
                setIsVideo(true)
            }
            else {
                setIsVideo(false)
            }
        }
    }, [image])
    useEffect(() => {
        handleGetUser()
        handleGetProducts()
    }, [])
    useEffect(() => {
        if (searchParams.get("id")) {
            setIsEditingModeOn(true)
            handleGetSaleById()
        }
    }, [searchParams.get("id")])
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 col-md-12">
                    <div className="right frormcontainer">
                        <h3 className="heading formheading ps-3">{isEditingModeOn ? "Edit" : "Add"} Promotions</h3>
                        <form className="form profile-section-container ">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Product <span className="text-danger">*</span></label>

                                    <select className='form-control' value={productId} onChange={(e) => {
                                        setProductId(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select Product</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Start Date <span className="text-danger">*</span></label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={moment(startDate).format("YYYY-MM-DDThh:mm:ss")}
                                        onChange={(e) => handleStartDateChange(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>End Date <span className="text-danger">*</span></label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={moment(endDate).format("YYYY-MM-DDThh:mm:ss")}
                                        onChange={(e) => handleEndDateChange(e.target.value)}
                                    />
                                </div>
                                <br />
                                <div className="col-md-12 mt-3">
                                    <label>Promotion Image/Video  <span className="text-danger">*</span> <span> width:100px and height:100px
                                    </span></label>
                                    <div className="my-3">
                                        {/* {image} */}

                                        {
                                            isVideo ?
                                                <>
                                                    {
                                                        image.includes("base64") ?
                                                            <>
                                                                <video src={image} height={100} width={100} />
                                                            </>
                                                            :
                                                            <>
                                                                <video src={generateImageUrl(image)} height={100} width={100} />
                                                            </>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {
                                                        image.includes("base64") ?
                                                            <img style={{ height: 100, width: 100 }} src={image} alt="" />
                                                            :
                                                            <img style={{ height: 100, width: 100 }} src={generateImageUrl(image)} alt="" />
                                                    }
                                                </>
                                        }

                                    </div>
                                    <FileUpload acceptedType={"image/png, image/gif, image/jpeg,video/mp4,video/x-m4v,video/*"} onFileChange={(value) => { setImage(value); }} />
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <label>Promotion Message <span className="text-danger">*</span></label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={message}
                                        placeholder=" Enter Message here"
                                        // disabled
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button type="button" onClick={() => { onSubmit() }} className="btn btn-custom btn-yellow mt-2 px-4 fs-5 me-5">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
