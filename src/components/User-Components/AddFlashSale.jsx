import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getBrandApi } from "../../services/brand.service";
import { getAllCategories } from "../../services/Category.service";
import {
  createFlashSales,
  getFlashSalebyId,
  updateFlashSalebyId,
} from "../../services/FlashSales.service";
import {
  AddProduct,
  getAllProducts,
  getProductById,
  updateProductApi,
} from "../../services/Product.service";
import { generateImageUrl } from "../../services/url.service";
import { toastError } from "../../utils/toastutill";
import FileUpload from "../Utility/FileUpload";
import { errorToast, successToast } from "../Utility/Toast";
import { getUserById } from "../../services/User.service";

export default function AddFlashSale() {
  const navigate = useNavigate();
  let userObj = useSelector((state) => state.auth.user);
  let id = useSelector((state) => state.auth.user._id);
  const [isEditingModeOn, setIsEditingModeOn] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [productId, setProductId] = useState("");
  const [price, setprice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [updateObj, setupdateObj] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [flashSaleId, setFlashSaleId] = useState("");
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [description, setDescription] = useState("");
  const [pricetype, setpricetype] = useState("per Nos/sheet");

  const percentage = (percent, total) => {
    return (percent / 100) * total;
  };
  const [userDataObj, setUserDataObj] = useState({});

  const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);

  const handleGetUser = async () => {
    try {
      let { data: res } = await getUserById(id);
      if (res.data) {
        setUserDataObj(res.data);
        setUserSubscriptionExpired(res.data.userSubscriptionExpired);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const onSubmit = async () => {
    try {
      if (`${productId}` === "" || !productId) {
        errorToast("Please select a product");
        return 0;
      }
      if (`${salePrice}` === "" || parseInt(salePrice) < 0) {
        errorToast("Please Fill Sale Price");
        return 0;
      }
      if (`${price}` === "" || parseInt(price) < 0) {
        errorToast("Please Fill Price");
        return 0;
      }
      if (discountType == "Percentage" && discountValue > 100) {
        errorToast("Percentage discount cannot be more than 100%");
        return 0;
      }
      if (discountType == "Amount" && discountValue >= price) {
        errorToast("Amount discount cannot be more than price of the product");
        return 0;
      }

      if (description.length > 100) {
        errorToast("Description cannot be more than 100 characters");
        return 0;
      }

      let obj = {
        userId: userObj._id,
        productId,
        price: price,
        discountType,
          discountValue,
        pricetype,
        // salePrice: (discountType == "Percentage" ? percentage(discountValue, price) : price - discountValue).toFixed(2),
        salePrice,
        endDate,
        startDate,
        description,
      };

      console.log(obj, "v");
      if (isEditingModeOn) {
        let { data: res } = await updateFlashSalebyId(
          searchParams.get("id"),
          obj
        );
        if (res.message) {
          successToast(res.message);
          navigate(-1);
        }
      } else {
        let { data: res } = await createFlashSales(obj);
        console.log(res, "asd");
        if (res.message) {
          successToast(res.message);
        }
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetProducts = async () => {
    try {
      let query = `page=${1}&perPage=${10000}&userId=${userObj?._id}`;
      let { data: res } = await getAllProducts(query);
      if (res.data) {
        setProductArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetSaleById = async () => {
    try {
      let { data: res } = await getFlashSalebyId(searchParams.get("id"));
      if (res.data) {
        console.log(res.data, "getById");
        setProductId(res.data.productId._id);
        setDiscountType(res.data.discountType);
        setDiscountValue(res.data.discountValue);
        setprice(res.data.price);
        setSalePrice(res.data.salePrice);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
        setDescription(res.data.description);
        // setProductArr(res.data)
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleDisountValueChange = (value) => {
    console.log(
      discountType == "Percentage" && value < 100,
      discountType != "Percentage" && value < price,
      value,
      price
    );
    if (parseInt(value) >= 0) {
      let tempValue = 0;
      if (discountType == "Percentage" && value <= 100) {
        tempValue =
          parseInt(price) - percentage(parseInt(value), parseInt(price));
        setDiscountValue(value);
      } else if (
        discountType != "Percentage" &&
        parseInt(value) < parseInt(price)
      ) {
        tempValue = parseInt(price) - parseInt(value);
        setDiscountValue(value);
      }
      setSalePrice(tempValue);
    } else {
      toastError("Discount cannot be less than 0");
      return;
    }
  };

  useEffect(() => {
    console.log(userObj, "userObj");
    handleGetProducts();
    handleGetUser();
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setIsEditingModeOn(true);
      handleGetSaleById();
    }
  }, [searchParams.get("id")]);

  return (
    <div className="container">
      <div className="row pt-3">
        <h3 className="heading ">
          {isEditingModeOn ? "Edit" : "Add"} Flash sale
        </h3>

        {userDataObj?.numberOfSales > 0 &&
        !userSubscriptionExpired &&
        !userDataObj?.isBlocked ? (
          <div className="col-6 col-sm-4 justify-content-end"></div>
        ) : (
          userDataObj?.numberOfSales <= 0 &&
          userSubscriptionExpired &&
          !userDataObj?.isBlocked && (
            <div className="col-6 col-sm-4 justify-content-end">
              <div className="row d-flex justify-content-end">
                <button
                  className="theme-outline-button"
                  onClick={() => navigate("/Subscription")}
                >
                  Purchase a subscription
                </button>
              </div>
            </div>
          )
        )}
        {(userSubscriptionExpired || userDataObj?.numberOfSales <= 0) && (
          <div className="container">
            <div className="row">
              <div className="col-6  justify-content-end">
                You do not have a valid subscription , subscribe one to add a
                flash sale
              </div>
              <div className="col-6  justify-content-end">
                <div className="row d-flex justify-content-end">
                  <button
                    className="theme-outline-button"
                    onClick={() => navigate("/Subscription")}
                  >
                    Purchase a subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {userDataObj?.isBlocked && (
          <div className="subscription-description">
            Your subscription has been blocked by admin please contact admin for
            further details
          </div>
        )}
        <div className="col-12 col-md-12 mb-5">
          <div className="right">
            {!(userSubscriptionExpired || userDataObj?.numberOfSales <= 0) && (
              <form className="form row profile-section-container padingflashsales">
                <h4 style={{ color: "rgba(0,0,0,0.7)" }}>Product Details </h4>

                <div className="col-md-6">
                  <label>
                    Product <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-control "
                    value={productId}
                    onChange={(e) => {
                      setProductId(e.target.value);
                      let tempObj = productArr.find(
                        (el) => el._id == e.target.value
                      );
                      setprice(`${tempObj.sellingprice}`);
                      setDiscountValue(0);
                      setSalePrice(0);
                    }}
                  >
                    <option value="">Please Select Product</option>
                    {productArr &&
                      productArr.length > 0 &&
                      productArr.map((el) => (
                        <option key={el._id} value={`${el._id}`}>
                          {el.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Discount type <span className="text-danger">*</span>
                  </label>
                  <select 
                    onChange={(e) => {
                      setDiscountType(e.target.value);
                      setDiscountValue(0);
                      setSalePrice(0);
                    }}
                    value={discountType}
                    className="form-control" 
                  >
                    <option value={"Percentage"}>Percentage</option>
                    <option value={"Amount"}>Amount</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Discount Value <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => {
                      handleDisountValueChange(e.target.value);
                    }}
                    value={discountValue}
                    type={"number"}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label>
                    Price <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={`${price}`}
                    // disabled
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>
                    Sale Price <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={`${salePrice && salePrice.toFixed(2)}`}
                    disabled
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>Select Type</label>
                  <select
                    className="form-control"
                    value={pricetype}
                    onChange={(el) => setpricetype(el.target.value)}
                  >
                    <option value={"per Nos/sheet"}>per Nos/sheet</option>
                    <option value={"per sq.ft"}>per sq.ft</option>
                    <option value={"per sq.mt"}>per sq.mt</option>
                    <option value={" per Rn.ft"}> per Rn.ft</option>
                    <option value={"per Cu.ft"}>per Cu.ft</option>
                    <option value={"p per Cu.mt"}>p per Cu.mt</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Start Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={moment(startDate).format("YYYY-MM-DDThh:mm:ss")}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>
                    End Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={moment(endDate).format("YYYY-MM-DDThh:mm:ss")}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="col-md-12">
                  <button
                    type="button"
                    onClick={() => {
                      onSubmit();
                    }}
                    className="btn btn-custom btn-yellow mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
