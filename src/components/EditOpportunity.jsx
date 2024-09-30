import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AddAdvertisement, getAdvertisementById, getForHomepage, updateAdvertisementApi } from "../services/Advertisement.service";
// import { getBrandApi } from "../../services/brand.service";
// import { getAllCategories } from "../../services/Category.service";
// import { createFlashSales, getFlashSalebyId, updateFlashSalebyId } from "../../services/FlashSales.service";
import { AddProduct, getAllProducts, getProductById, updateProductApi } from "../services/Product.service";
import { generateImageUrl } from "../services/url.service";
import { getUserById } from "../services/User.service";
// import { toastError } from "../utils/toastutill";
import FileUpload from "../components/Utility/FileUpload";
import { errorToast, successToast } from "../components/Utility/Toast";
import '../assets/css/editopp.css'

function EditOpportunity() {

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

    const [NameOfOrganization , setNameOfOrganization] = useState("");
    const [brand , setbrand] = useState("");
    const [Category , setCategory] = useState("");
    const [email , setemail] = useState("");
    const [Country , setCountry] = useState("");
    const [State , setState] = useState("");
    const [City , setCity] = useState("");

    // const onSubmit = async () => {
    //     try {
    //         if (`${productId}` === '' || !productId) {
    //             errorToast('Please select a product')
    //             return 0
    //         }

    //         let obj = {
    //             userId: userObj._id,
    //             productId,

    //             NameOfOrganization,
    //             brand,
    //             Category,
    //             email,
    //             Country,
    //             State,
    //             City,

    //             message,
    //             image,
    //             productSlug,
    //             endDate,
    //             startDate,
    //             isVideo
    //         }

    //         if (isEditingModeOn) {
    //             let { data: res } = await updateAdvertisementApi(obj, searchParams.get("id"))
    //             if (res.message) {
    //                 successToast(res.message)
    //                 navigate(-1)
    //             }
    //         }

    //         else {
    //             let { data: res } = await AddAdvertisement(obj)
    //             console.log(res, "asd")
    //             if (res.message) {
    //                 successToast(res.message)
    //             }
    //         }

    //     }
    //     catch (err) {
    //         errorToast(err)
    //      }

    // }



    // const handleGetProducts = async () => {
    //     try {

    //         let query = `page=${1}&perPage=${10000}&userId=${userObj?._id}`
    //         let { data: res } = await getAllProducts(query)
    //         if (res.data) {
    //             setProductArr(res.data)
    //         }
    //     }
    //     catch (err) {
    //         errorToast(err)
    //     }
    // }


    // const handleGetSaleById = async () => {
    //     try {

    //         let { data: res } = await getAdvertisementById(searchParams.get("id"))
    //         if (res.data) {
    //             console.log(res.data, "getById")
    //             setProductId(res.data.productId);

    //             setNameOfOrganization(res.data.NameOfOrganization);
    //             setbrand(res.data.brand);
    //             setCategory(res.data.Category);
    //             setemail(res.data.email);
    //             setCountry(res.data.Country);
    //             setState(res.data.State);
    //             setCity(res.data.City);


    //             setImage(res.data.image);
    //             setMessage(res.data.message)
    //             setProductSlug(res.data.productSlug)
    //             setStartDate(res.data.startDate)
    //             setEndDate(res.data.endDate)
    //             setIsVideo(res.data.isVideo)
    //             // setProductArr(res.data)
    //         }
    //     }
    //     catch (err) {
    //         errorToast(err)
    //     }
    // }



    // const handleGetUser = async () => {
    //     try {
    //         let { data: res } = await getUserById(id)
    //         if (res.data) {
    //             console.log(res.data, "dataa")
    //             setUserObjData(res.data);
    //         }
    //     }
    //     catch (err) {
    //         errorToast(err)
    //     }
    // }



    // useEffect(() => {
    //     if (image && image.includes("base64")) {
    //         if (image.slice(0, 30).toLowerCase().includes("video")) {
    //             setIsVideo(true)
    //         }
    //         else {
    //             setIsVideo(false)
    //         }
    //     }
    // }, [image])



    // useEffect(() => {
    //     handleGetUser()
    //     handleGetProducts()
    // }, [])



    // useEffect(() => {
    //     if (searchParams.get("id")) {
    //         setIsEditingModeOn(true)
    //         handleGetSaleById()
    //     }
    // }, [searchParams.get("id")])


    //Dhananjay Code : 

    // const alleditdata =[
        
    //     NameOfOrganization,
    //     brand,
    //     Category,
    //     email,
    //     Country,
    //     State,
    //     City,
    //     image

    // ]

    // function onSubmit(){
    //     console.log(alleditdata);
    //     successToast('Data Submited')
    // }


    //Dhananjay Updated Code.
    function onSubmit() {
        if (!NameOfOrganization || !brand || !Category || !email || !Country || !State || !City) {
            errorToast('Please fill out all required fields');
            return;
        }
    
        const alleditdata = {
            NameOfOrganization,
            brand,
            Category,
            email,
            Country,
            State,
            City,
            image
        };
    
        console.log(alleditdata);
        successToast('Data Submitted');
    
        // Call API to save the data (either add or update)
        // if (isEditingModeOn) {
        //     // Update logic here
        // } else {
        //     // Add logic here
        // }
    }


    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 col-md-12">
                    <div className="right frormcontainer">
                        <h3 className="heading formheading ps-3">{isEditingModeOn ? "Edit" : "Edit"} Oppotunity</h3>
                        <form className="form profile-section-container ">

                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name Of Organization: <span className="text-danger">*</span></label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter Organization here"
                                        value={NameOfOrganization}
                                        onChange={(e) => {setNameOfOrganization(e.target.value)}}
                                        required
                                    />

                                    {/* <select className='form-control' value={NameOfOrganization} onChange={(e) => {
                                        setNameOfOrganization(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select Organization</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select> */}
                                </div>
                                <div className="col-md-6">
                                    <label>Brand: <span className="text-danger">*</span></label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter Organization here"
                                        value={brand}
                                        required
                                        onChange={(e) => {setbrand(e.target.value)}}
                                    />

                                    {/* <select className='form-control' value={brand} onChange={(e) => {
                                        setbrand(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select Brand</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select> */}
                                </div>
                                <div className="col-md-6">
                                    <label>Category: <span className="text-danger">*</span></label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter Organization here"
                                        value={Category}
                                        onChange={(e) => {setCategory(e.target.value)}}
                                        required
                                    />

                                    {/* <select className='form-control' value={Category} onChange={(e) => {
                                        setCategory(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select Category</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select> */}
                                </div>
                                <div className="col-md-6 ">
                                    <label>Email Id:  <span className="text-danger">*</span></label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter email here"
                                        value={email}
                                        onChange={(e) => {setemail(e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Country: <span className="text-danger">*</span></label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter Organization here"
                                        value={Country}
                                        onChange={(e) => {setCountry(e.target.value)}}
                                        required
                                    />

                                    {/* <select className='form-control' value={Country} onChange={(e) => {
                                        setCountry(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select Country</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select> */}
                                </div>
                                <div className="col-md-6">
                                    <label>State: <span className="text-danger">*</span></label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter Organization here"
                                        value={State}
                                        onChange={(e) => {setState(e.target.value)}}
                                        required
                                    />


                                    {/* <select className='form-control' value={State} onChange={(e) => {
                                        setState(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select State</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select> */}
                                </div>
                                <div className="col-md-6">
                                    <label>City: <span className="text-danger">*</span></label>

                                    <textarea
                                        type="email"
                                        className="form-control"
                                        placeholder=" Enter Organization here"
                                        value={City}
                                        onChange={(e) => {setCity(e.target.value)}}
                                        required    
                                    />

                                    {/* <select className='form-control' value={City} onChange={(e) => {
                                        setCity(e.target.value)
                                        let tempObj = productArr.find(el => el._id == e.target.value)
                                        setProductSlug(tempObj.slug);
                                    }}>
                                        <option value="">Please Select City</option>
                                        {productArr && productArr.length > 0 && productArr.map(el => <option key={el._id} value={`${el._id}`}>{el.name}</option>)}
                                    </select> */}
                                </div>


                                



                                {/* 
                            <div className="col-md-6">
                                <label>Start Date <span className="text-danger">*</span></label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={moment(startDate).format("YYYY-MM-DDThh:mm:ss")}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label>End Date <span className="text-danger">*</span></label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={moment(endDate).format("YYYY-MM-DDThh:mm:ss")}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div> */}



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

                                {/* <div className="col-md-12">
                                    <label>Promotion Message <span className="text-danger">*</span></label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={message}
                                        placeholder=" Enter Message here"
                                       
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div> */}
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

export default EditOpportunity
