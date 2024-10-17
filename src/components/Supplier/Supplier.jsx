import React, { useEffect, useState } from "react";
import { AiFillHome, AiOutlineWhatsApp } from "react-icons/ai";
import { BiClipboard, BiHeadphone } from "react-icons/bi";
import { BsCalendarWeek, BsFillCheckCircleFill, BsStarFill } from "react-icons/bs";
import { FaPhoneAlt, FaProductHunt, FaPhoneVolume } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImLocation, ImOffice, ImUser } from "react-icons/im";
import { images } from "../Utility/Images";
import PageBanner from "../Utility/PageBanner";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MdAddBusiness, MdCall, MdImportExport } from "react-icons/md";
import { GiChart, GiScales } from "react-icons/gi";
import Category from "../Category";
import { toastError, toastSuccess } from "../../utils/toastutill";
import { checkForValidSubscription, checkForValidSubscriptionAndReturnBoolean, getUserById } from "../../services/User.service";
import { generateImageUrl } from "../../services/url.service";
import { getAllProductsBySupplierId } from "../../services/Product.service";
import { getDecodedToken } from "../../services/auth.service";
import { useSelector } from "react-redux";
import { createLead } from "../../services/leads.service";
import { errorToast, successToast } from "../Utility/Toast";
import { addReview, getReviewForProduct } from "../../services/ProductReview.service";
import StarRatings from "react-star-ratings";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import { MdOutlineEmail } from "react-icons/md";
import bagicn from '../../assets/image/home/images/bagicn.png'
import icn365 from '../../assets/image/home/images/365icn.png'
import customericn from '../../assets/image/home/images/customericn.png'
import telephone from '../../assets/image/home/images/telephone.png'
import gsticn from '../../assets/image/home/images/gsticn.png'
import birthdate from '../../assets/image/home/images/birthdateicn.png'








function Supplier() {

  const [quoteModal, setQuoteModal] = useState(false);
  const authObj = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);

  let userObj = useSelector((state) => state.auth.user);
  const [reviewModal, setReviewModal] = useState(false);
  const [productReviewArr, setProductReviewArr] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams()
  const [supplierObj, setSupplierObj] = useState({});
  const [productsArr, setProductsArr] = useState([]);
  const [tabs, setTabs] = useState([
    // {
    //   name: "Home",
    //   icon: <AiFillHome />,
    //   active: false,
    //   tab: "1",
    // },
    {
      name: "Profile",
      icon: <ImUser />,
      active: false,
      tab: "2",
    },
    {
      name: "Our Products",
      icon: <FaProductHunt />,
      active: true,
      tab: "3",
    },
    {
      name: "Reviews",
      icon: <BiClipboard />,
      active: false,
      tab: "4",
    },
  ]);
  const reviews = {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 1,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  }

  const ActiveTab = (i) => {
    const temp = tabs.map((item, index) => {
      i === index ? (item.active = true) : (item.active = false);
      return item;
    });


    if (temp[i].name == "Reviews") {

    }


    setTabs([...temp]);
  };




  const HandleGetProductBySupplierId = async (id) => {
    try {
      let { data: res } = await getAllProductsBySupplierId(id)
      if (res.data) {
        setProductsArr(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }
  const HandleCheckValidSubscription = async () => {
    try {
      let { data: res } = await checkForValidSubscriptionAndReturnBoolean(userObj?._id)
      if (res.data) {
        setCurrentUserHasActiveSubscription(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }


  const handleGetProductReview = async (id) => {
    try {
      let { data: res } = await getReviewForProduct(`userId=${id}`);
      if (res.message) {
        setProductReviewArr(res.data);
      }
    } catch (err) {
      toastError(err);
    }
  };

  const HandleGetUserById = async (id) => {
    try {
      let { data: res } = await getUserById(id)
      if (res.data) {
        console.log(res.data, "data")
        setSupplierObj(res.data)
      }
    }
    catch (err) {
      toastError(err)
    }
  }



  useEffect(() => {
    if (supplierObj && supplierObj._id) {
      handleGetProductReview(supplierObj._id)
    }
  }, [supplierObj])
  useEffect(() => {
    HandleGetUserById(params.id)
    HandleGetProductBySupplierId(params.id)
  }, [params])


  const changeRating = (e) => {
    console.log(e);
    setRating(e);
  };


  const handleCreateLead = async () => {
    try {
      let obj = {
        userId: supplierObj?._id,
        phone: supplierObj?.phone,
        email: supplierObj?.email,
        name: supplierObj?.name,
        createdById: userObj?._id,
      };
      let { data: res } = await createLead(obj);
      if (res.message) {
        successToast(res.message);

      }
    } catch (err) {
      errorToast(err);
    }
  };
  const homeslider = {
    0: {
      slidesPerView: 1
    },
    567: {
      slidesPerView: 2
    },
    769: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    },
  }





  const handleSubmitReview = async (e) => {

    try {

      e.preventDefault();

      if (userName == "") {

        toastError("Name is mandatory")

        return

      }

      if (!(supplierObj && supplierObj._id)) {

        toastError("Something went wrong please close the app and open again ")

        return

      }

      let obj = {
        rating,
        message,
        name: userName,
        userId: supplierObj._id,
        // productId: productObj?._id,
      };

      let { data: res } = await addReview(obj);

      if (res.message) {

        toastSuccess(res.message);

        setReviewModal(false);

        handleGetProductReview(supplierObj?._id)

      }

    } catch (err) {

      toastError(err);

    }

  };

  const phoneNumber = "+91 8412563251";
  const handleCall = () => {
    window.open(`tel:${phoneNumber}`);
  };





  useEffect(() => {
    if (userObj && userObj._id) {
      HandleCheckValidSubscription()
    }
  }, [userObj])
  useEffect(() => {
    if (userObj && userObj._id && params.id) {
      if (userObj._id == params.id) {
        setEditVisible(true)
      }
      else {
        setEditVisible(false)
      }
    }
  }, [userObj, params.id])


  return (
    <main>
      <PageBanner edit={editVisible} userId={params.id} img={supplierObj?.bannerImage && supplierObj.bannerImage != "" ? generateImageUrl(supplierObj?.bannerImage) : (supplierObj?.imagesArr && supplierObj?.imagesArr.length > 0 ? generateImageUrl(supplierObj?.imagesArr[1].image) : images.category_5)} className="supplierbanner" />

      <section className="supplier-detail my-3">
        <div className="container-fluid">
          <div className="row box supplierlist">
            <div className="col-12 d-flex justify-content-center">
              <li className="left my-3">
                <ul className="inner">
                  <li>
                    <div className="image me-5">
                      <a href={generateImageUrl(supplierObj.profileImage)}>
                        <img
                          src={supplierObj.profileImage && supplierObj.profileImage != "" ? generateImageUrl(supplierObj.profileImage) : images.category_6}
                          alt=""

                        />

                      </a>
                    </div>

                  </li>
                  <li>
                    <ul className="inner1">
                      <li className="icon-brown-list my-2"

                      >
                        <div className="icon brown">
                        </div>
                        <h2 className="">{supplierObj.companyObj?.name}</h2>
                      </li>
                      <li className=" my-2"

                      >
                        <a target="_blank" href={supplierObj.companyObj?.googleMapsLink} style={{ display: "flex", flexDirection: "row" }}>
                          <div className="icon brown pe-2 fs-4" >
                            <ImLocation />
                          </div>
                          <span className="address">{supplierObj.companyObj?.address.toUpperCase()} {supplierObj?.cityObj?.name.toUpperCase()}, {supplierObj?.stateObj?.name.toUpperCase()}, {supplierObj?.countryObj?.name.toUpperCase()}</span>
                        </a>
                      </li>
                      {/* <li className="my-2">
                        <div className="icon brown pe-2 fs-5">
                          <BsStarFill />
                        </div>
                        {supplierObj.rating}
                      </li> */}
                      <li className="my-2">
                        <div className="icon brown pe-2 fs-5">
                          {Array.from({ length: supplierObj.rating }, (_, index) => (
                            <BsStarFill key={index} class="text-warning" />
                          ))}
                        </div>
                      </li>
                      <li className=" my-2">
                        <div className="icon brown pe-2 fs-5">
                          <BsFillCheckCircleFill class="text-success" />
                        </div>
                        {supplierObj.companyObj?.gstNumber}
                      </li>
                      {/* <li className="my-2">
                        <div className="icon brown pe-2 fs-5">
                          <BsFillCheckCircleFill />
                        </div>
                        {supplierObj.companyObj?.gstNumber ? (
                          supplierObj.companyObj.gstNumber.startsWith('1') ? (
                            'GST Number starts with 1'
                          ) : supplierObj.companyObj.gstNumber.startsWith('2') ? (
                            'GST Number starts with 2'
                          ) : (
                            'GST Number does not start with 1 or 2'
                          )
                        ) : (
                          'No GST Number available'
                        )}
                      </li> */}

                    </ul>
                    <div className="container">
                      <div className=" row px-0" >

                        <div className="d-grid d-lg-flex ">

                          <div className=" px-3">
                            <a


                              onClick={() => currentUserHasActiveSubscription ? handleCreateLead() : errorToast("You do not have a valid subscription to perform this action")}
                              href={currentUserHasActiveSubscription ? `tel:${supplierObj?.companyObj?.phone}` : "#"}
                              className="btn btn-yellow btn-custom btn-hover with-icon"
                            >
                              <FaPhoneVolume className="wtsp me-3" />
                              Call Now
                            </a>
                          </div>
                          <div className=" px-3">
                            <a
                              onClick={() => currentUserHasActiveSubscription ? handleCreateLead() : errorToast("You do not have a valid subscription to perform this action")}
                              href={currentUserHasActiveSubscription ? `mailto:${supplierObj?.companyObj?.email}` : '#'}
                              className="btn btn-yellow btn-custom btn-hover with-icon"
                            >
                              <MdOutlineEmail className="emailic me-3" />
                              Send Email
                            </a>
                          </div>
                          <div className=" px-3">
                            <a

                              onClick={() => { if (currentUserHasActiveSubscription) { handleCreateLead(); window.open(`https://web.whatsapp.com/send?phone=${supplierObj?.companyObj?.phone}`) } else { errorToast("You do not have a valid subscription to perform this action") } }}
                              className="btn btn-yellow btn-custom btn-hover with-icon "
                            >
                              <AiOutlineWhatsApp className="wtsp1 me-3" />
                              Whatsapp
                            </a>
                          </div>
                          <li>
                            {
                              supplierObj?.isVerified &&
                              <img src={images.verified} style={{ width: 110, marginBottom: 20 }} alt="" />
                            }
                          </li>
                        </div>

                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </div>

          </div>

        </div>
      </section>

      <section className=" ">
        <div className="container supllertabs px-0 px-lg-5">
          <div className="row d-flex justify-content-center ">
            {tabs.map((item, i) => {
              return (
                <div
                  className={`col-lg-2 col-3 px-lg-3 px-0 vlp my-2 ${item.active ? "active" : ""}`}
                  key={i}
                  onClick={() => ActiveTab(i)}
                >
                  <div className=" fw-light py-0 py-lg-3 ">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <br></br>

      {tabs.map((item, i) => {
        if (item.active && item.tab === "1") {
          return (
            <>
              <section className="mb-80">
                <div className="container">
                  <Swiper
                    spaceBetween={20}
                    breakpoints={homeslider}
                    speed={1500}
                    modules={[Autoplay, Navigation]}
                    autoplay={{ disableOnInteraction: false }}
                    navigation
                  >
                    {
                      supplierObj?.imagesArr && supplierObj?.imagesArr.length > 0 && supplierObj?.imagesArr.map((el, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="product-box supplier-product-box">
                              <a target="_blank" href={generateImageUrl(el.image)}>
                                <img src={generateImageUrl(el.image)} alt="" className="img" />
                              </a>
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }

                  </Swiper>
                </div>
              </section>

              {
                supplierObj?.videoArr && supplierObj?.videoArr.length > 0 &&
                <section className="product-video mb-80">
                  <div className="container">
                    <div className="title-section with-btn mb-5">
                      <h1 className="heading bottom-line brown">
                        Our Videos
                      </h1>
                      <Link to="/" className="btn btn-custom btn-yellow">
                        View All
                      </Link>
                    </div>
                    <div className="row gy-4">

                      {
                        supplierObj?.videoArr && supplierObj?.videoArr.length > 0 && supplierObj?.videoArr.map((el, index) => {
                          return (
                            <div key={index} className="col-12 col-lg-4">
                              <div className="box">
                                <div className="image">
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={generateImageUrl(el.video)}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    autoplay={false}
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                </section>
              }
            </>
          );
        }
        if (item.active && item.tab === "2") {
          return (
            <>
              {/* profile */}
              <section className="supplier-profile mb-80">
                <div className="container">
                  <p className="text-center my-5">{supplierObj?.longDescription}</p>
                  <div className="row ">
                    <div className="row d-flex align-items-center justify-content-center">

                      <div className="col-lg-3 col-md-4 col-12 " >
                        <div className="box ">
                          <div className="icon brown"><img className="img-fluid" src={bagicn} alt="" /></div>
                          <div className="content">
                            <h5 className="brown">Nature of Business</h5>
                            <p>{supplierObj?.companyObj?.natureOfBusiness ? supplierObj?.companyObj?.natureOfBusiness : "Not provided"} </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4 col-12">
                        <div className="box">

                          <div className="icon brown"><img className="img-fluid" src={icn365} alt="" /></div>
                          <div className="content">
                            <h5 className="brown">Year of Establishment</h5>
                            <p>{supplierObj?.companyObj?.yearOfEstablishment ? supplierObj?.companyObj?.yearOfEstablishment : "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4 col-12 py-5">
                        <div className="box">
                          <div className="icon brown"><img className="img-fluid" src={customericn} alt="" /></div>
                          <div className="content">
                            <h5 className="brown">Contact Person Name</h5>
                            <p>{supplierObj?.name ? supplierObj?.name : "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4 col-12">
                        <div className="box">
                          <div className="icon brown"><img className="img-fluid" src={telephone} alt="" /></div>
                          <div className="content">
                            <h5 className="brown">Landline</h5>
                            <p>{currentUserHasActiveSubscription ? supplierObj?.landline ? supplierObj?.landline : "Not provided" : "You do not have a valid subscription"}</p>
                          </div>
                        </div>
                      </div>



                      <div className="col-lg-3 col-md-4 col-12">
                        <div className="box">
                          <div className="icon brown"><img className="img-fluid" src={gsticn} alt="" /></div>
                          <div className="content">
                            <h5 className="brown">Contact Person Name</h5>
                            <p>{supplierObj?.companyObj?.gstNumber ? supplierObj?.companyObj?.gstNumber : "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4 col-12 ">
                        <div className="box">
                          <div className="icon brown"><img className="img-fluid" src={birthdate} alt="" /></div>
                          <div className="content">
                            <h5 className="brown">Birthdate</h5>
                            <p>{supplierObj?.aniversaryDate ? moment(supplierObj?.aniversaryDate).format("YYYY-MM-DD") : "Not provided"}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        }
        if (item.active && item.tab === "3") {
          return (
            <section className="category-page my-3">
              <div className="container">
                <ul className="row">
                  {productsArr && productsArr.length > 0 ? (
                    productsArr.map((item, i) => (
                      <li key={item.id || i} className="col-12 col-md-3">
                        <div className="product-box mb-3">
                          <Link to={`/ShopDetail/${item?.slug}`}>
                            <img
                              src={item?.mainImage ? generateImageUrl(item?.mainImage) : images.category_5}
                              alt={item?.mainImage ? item.name : "Default product image"}
                              className="img"
                            />
                          </Link>
                          <div className="content">
                            <button className="call-btn" onClick={handleCall} aria-label="Call product seller">
                              <MdCall />
                            </button>
                            <div className="title">
                              <Link className="text-white fs-5" to={`/ShopDetail/${item?.slug}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="text-white fw-light">
                              Size (Sq ft): {item?.specification?.size || "N.A."}
                            </div>
                            <div className="text-white">₹{item.sellingprice}/Sq ft</div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <h6>No products added yet.</h6>
                  )}
                </ul>
              </div>
            </section>
          );
        }
        if (item.active && item.tab === "4") {
          return (
            // <section className="category-page mb-80">
            //   <div className="container">
            //     <div className="row d-flex justify-content-end">
            //       <div className="col-2 mb-4 d-flex justify-content-end">
            //         {authObj?.isAuthorized &&

            //           <Link to="#" className="btn btn-custom btn-yellow" onClick={() => setReviewModal(true)}>
            //             Write a review
            //           </Link>
            //         }
            //       </div>
            //     </div>
            //     <ul className="row">
            //       {productReviewArr && productReviewArr.length > 0 ? (
            //         productReviewArr.map((el, index) => {
            //           return (
            //             <div key={index} className="col-12">
            //               <div className="product-review">
            //                 <div className="top">
            //                   <div className="name">
            //                     <div>
            //                       <h6>{el.name}</h6>
            //                       <p className="small brown">{moment(el.createdAt).format("DD-MM-YYYY")}</p>
            //                     </div>
            //                   </div>
            //                   <div className="review-rating">
            //                     {/* {el.rating} */}
            //                     <ReactStars edit={false} count={5} size={24} value={el.rating} activeColor="#ffd700" />
            //                   </div>
            //                 </div>
            //                 <div className="desp">
            //                   <p>
            //                     {el.message} {el.rating}
            //                   </p>
            //                 </div>
            //               </div>
            //             </div>
            //           );
            //         })
            //       ) : (
            //         <div className="col-12">
            //           <div className="product-review">
            //             <div className="top">
            //               <div className="name">
            //                 <div>
            //                   <h6>No Reviews found</h6>
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         </div>
            //       )}
            //     </ul>
            //     <div className="row gy-4">
            //       {productReviewArr && productReviewArr.length > 0 ? (
            //         <Swiper
            //           spaceBetween={20}
            //           slidesPerView={4}
            //           breakpoints={reviews}
            //           speed={1500}
            //           modules={[Autoplay, Navigation]}
            //           autoplay={{ disableOnInteraction: false }}
            //           navigation
            //           className="pt-5 px-4"
            //         >
            //           {productReviewArr.map((el, index) => (
            //             <SwiperSlide key={index}>
            //               <div className="col-12">
            //                 <div className="product-review">
            //                   <div className="top">
            //                     <div className="name">
            //                       <div>
            //                         <h6>{el.name}</h6>
            //                         <p className="small brown">
            //                           {moment(el.createdAt).format("DD-MM-YYYY")}
            //                         </p>
            //                       </div>
            //                     </div>
            //                     <div className="review-rating">
            //                       <ReactStars
            //                         edit={false}
            //                         count={5}
            //                         size={24}
            //                         value={el.rating}
            //                         activeColor="#ffd700"
            //                       />
            //                     </div>
            //                   </div>
            //                   <div className="desp">
            //                     <p>
            //                       {el.message} {el.rating}
            //                     </p>
            //                   </div>
            //                 </div>
            //               </div>
            //             </SwiperSlide>
            //           ))}
            //         </Swiper>
            //       ) : (
            //         <div className="col-12">

            //           <div>
            //             <h6>No Reviews found for this product</h6>

            //           </div>
            //         </div>
            //       )}
            //     </div>
            //   </div>
            // </section>
            <section className="mt-5" style={{ background: "#FFF2E2" }}>
              <div className="container-fluid pb-4">
                <div className="title-section with-btn mb-5">
                  <h1 className="heading text-start ms-lg-5 pt-3  brown">Reviews</h1>
                  {auth?.isAuthorized && (
                    <Link to="#" className="btn btn-custom btn-yellow" onClick={() => setReviewModal(true)}>
                      Write a review
                    </Link>
                  )}
                </div>
                <div className="row gy-4">
                  {productReviewArr && productReviewArr.length > 0 ? (
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={4}
                      breakpoints={reviews}
                      speed={1500}
                      modules={[Autoplay, Navigation]}
                      autoplay={{ disableOnInteraction: false }}
                      navigation
                      className="pt-5 px-4"
                    >
                      {productReviewArr.map((el, index) => (
                        <SwiperSlide key={index}>
                          <div className="col-12">
                            <div className="product-review">
                              <div className="top">
                                <div className="name">
                                  <div>
                                    <h6>{el.name}</h6>
                                    <p className="small brown">
                                      {moment(el.createdAt).format("DD-MM-YYYY")}
                                    </p>
                                  </div>
                                </div>
                                <div className="review-rating">
                                  <ReactStars
                                    edit={false}
                                    count={5}
                                    size={24}
                                    value={el.rating}
                                    activeColor="#ffd700"
                                  />
                                </div>
                              </div>
                              <div className="desp">
                                <p>
                                  {el.message} {el.rating}
                                </p>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="col-12">

                      <div>
                        <h6>No Reviews found for this product</h6>

                      </div>
                    </div>
                  )}
                </div>

              </div>
            </section>
          );
        }
      })}

      <Modal
        show={quoteModal}
        size="lg"
        centered
        onHide={() => setQuoteModal(false)}
      >
        <Modal.Body className="review-modal custom-modal">
          <button
            type="button"
            class="btn-close right"
            aria-label="Close"
            onClick={() => setQuoteModal(false)}
          ></button>
          <h3 className="heading brown my-2">Get a quote</h3>
          <form className="form row">
            <div className="col-12">
              <label>Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label>Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label>Phone No.</label>
              <input type="number" className="form-control" />
            </div>
            <div className="col-12">
              <label>Comment</label>
              <textarea rows="5" className="form-control"></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-custom text-white yellow-bg py-2">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>



      <Modal show={reviewModal} size="lg" centered onHide={() => setReviewModal(false)}>
        <Modal.Body className="review-modal custom-modal">
          <button type="button" class="btn-close right" aria-label="Close" onClick={() => setReviewModal(false)}></button>
          <h3 className="heading brown my-2">Review Us</h3>
          <form className="form row">
            <div className="col-12 col-md-6">
              <label>Name</label>
              <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label>Rating</label>
              <StarRatings rating={rating} starRatedColor="orange" starHoverColor="orange" changeRating={changeRating} numberOfStars={5} starDimension="28px" starSpacing="2px" name="rating" />
              {/* <input type="number" className="form-control" /> */}
            </div>
            <div className="col-12">
              <label>Comment</label>
              <textarea onChange={(e) => setMessage(e.target.value)} value={message} rows="5" className="form-control"></textarea>
            </div>
            <div className="col-12">
              <button
                onClick={(e) => {
                  handleSubmitReview(e);
                }}
                className="btn btn-custom text-white yellow-bg py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </main>
  );
}

export default Supplier;
