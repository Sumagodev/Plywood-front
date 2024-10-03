import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllCategories } from "../../services/Category.service";
import {
  AddProduct,
  getProductById,
  updateProductApi,
} from "../../services/Product.service";
import { addBrandApi, getBrandApi } from "../../services/brand.service";
import { generateImageUrl } from "../../services/url.service";
import { convertFileToBase64 } from "../Utility/FileConverterToBase64";
import FileInput from "../Utility/FileUploadCropper";
import { errorToast, successToast } from "../Utility/Toast";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function AddProducts() {
  const [brandName, setBrandName] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [productId, setProductId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditingModeOn, setIsEditingModeOn] = useState(false);
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [name, setname] = useState("");
  const [thickness, setthickness] = useState("");
  const [application, setapplication] = useState("");
  const [grade, setgrade] = useState("");
  const [color, setcolor] = useState("");
  const [size, setsize] = useState("");
  const [wood, setwood] = useState("");
  const [glue, setglue] = useState("");
  const [price, setprice] = useState("");
  const [pricetype, setpricetype] = useState("per Nos/sheet");
  const [sellingprice, setsellingprice] = useState("");
  const [warranty, setwarranty] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setLongDescription] = useState();
  const [image, setimage] = useState();
  const [status, setstatus] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [updateObj, setupdateObj] = useState({});
  const [imageArr, setimageArr] = useState([
    {
      image: "",
    },
  ]);

  useEffect(() => {
    handleGetBrands();
    handleGetCategory();
  }, []);

  const [mainCategoryArr, setmainCategoryArr] = useState([]);

  const handleFileSet = (value, index) => {
    const tempArr = imageArr;

    tempArr[index].image = value;
    setimageArr([...tempArr]);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //     if (productRedux !== null) {
  //         setname(productRedux?.name)
  //         setprice(productRedux?.price)
  //         setsellingprice(productRedux?.sellingprice)
  //         setcategory(productRedux?.categoryId)
  //         setbrand(productRedux?.brand)
  //         setthickness(productRedux?.specification?.thickness)
  //         setapplication(productRedux?.specification?.application)
  //         setgrade(productRedux?.specification?.grade)
  //         setcolor(productRedux?.specification?.color)
  //         setwood(productRedux?.specification?.wood)
  //         setglue(productRedux?.specification?.glue)
  //         setwarranty(productRedux?.specification?.warranty)
  //         setshortDescription(productRedux?.shortDescription)
  //         setLongDescription(productRedux?.longDescription)
  //         setimage(productRedux?.mainImage)
  //         setstatus(productRedux?.status)
  //         setisUpdated(true)
  //         setupdateObj(productRedux)
  //         setimageArr(productRedux?.imageArr)
  //         setmainCategoryArr(productRedux?.categoryArr)

  //     }
  // }, [productRedux])

  const handleCategoryEvent = (id) => {
    const tempCategoryArr = [];
    categoryArr.map((el) => {
      if (el._id === id) {
        tempCategoryArr.push({ categoryId: el._id });
      } else {
        if (el.subCategoryArr && el.subCategoryArr.length > 0) {
          el.subCategoryArr.map((elx) => {
            if (elx._id === id) {
              tempCategoryArr.push({ categoryId: el._id });
              tempCategoryArr.push({ categoryId: elx._id });
            }
          });
        }
      }
    });

    setcategory(id);
    setmainCategoryArr([...tempCategoryArr]);
  };

  const onSubmit = async () => {
    try {
      if (`${name}` === "") {
        errorToast("Please Fill Name");
        return 0;
      }
      if (`${category}` === "") {
        errorToast("Please Fill Category");
        return 0;
      }
      if (`${sellingprice}` === "") {
        errorToast("Please Fill Long price");
        return 0;
      }

      if (`${longDescription}` === "") {
        errorToast("Please Fill Long Description");
        return 0;
      }

      if (`${image}` === "") {
        errorToast("Please add main imgae");
        return 0;
      }
      // if (imageArr && imageArr.length > 1) {
      //   if (imageArr.some((el) => !el.image || el.image == "")) {
      //     errorToast("canot upload blank image");
      //     return 0;
      //   }
      // }

      let obj = {
        name: name,
        categoryId: category,
        brand: brand,
        price: price,
        sellingprice: sellingprice + " " + pricetype,
        specification: {
          thickness,
          application,
          grade,
          // color,
          wood,
          glue,
          warranty,
        },
        shortDescription: shortDescription,
        longDescription: longDescription,
        status: status,
        image: image,
        imageArr: imageArr,
        categoryArr: mainCategoryArr,
      };

      if (isEditingModeOn) {
        let { data: res } = await updateProductApi(obj, productId);
        if (res.message) {
          successToast(res.message);
        }
      } else {
        let { data: res } = await AddProduct(obj);
        if (res.message) {
          successToast(res.message);
        }
      }
    } catch (err) {
      errorToast(err);
    }
  };
  const subcategoryRender = (cateArr, dash) => {
    dash += "- ";
    console.log(cateArr && cateArr?.length);
    return (
      cateArr &&
      cateArr.length > 0 &&
      cateArr.map((cat) => {
        return (
          <>
            <option key={cat._id} value={cat._id}>
              {dash}
              {cat.name}
            </option>
            {subcategoryRender(cat.subCategoryArr, dash)}
          </>
        );
      })
    );
  };

  const handleImageAdd = () => {
    if (imageArr && imageArr.length < 3) {
      setimageArr([...imageArr, { image: "" }]);
    }
  };
  const handleImagesRemove = (removeIndex) => {
    if (imageArr.length > 1) {
      setimageArr([
        ...imageArr.filter((el, index) => index != imageArr.length - 1),
      ]);
    }
  };

  const [categoryArr, setCategoryArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);

  const handleGetBrands = async () => {
    try {
      let { data: res } = await getBrandApi("status=true&page=1&perPage=1000");
      if (res.data) {
        setBrandArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetCategory = async () => {
    try {
      let { data: res } = await getAllCategories();
      if (res.data) {
        setCategoryArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetProductById = async () => {
    try {
      let { data: res } = await getProductById(searchParams.get("productId"));
      if (res.data) {
        console.log(res.data);
        setname(res?.data?.name);
        setProductId(res?.data?._id);
        setprice(res.data?.price);
        setsellingprice(res.data?.sellingprice);
        setcategory(res.data?.categoryId);
        setbrand(res.data?.brand);
        setthickness(res.data?.specification?.thickness);
        setapplication(res.data?.specification?.application);
        setgrade(res.data?.specification?.grade);
        setcolor(res.data?.specification?.color);
        setwood(res.data?.specification?.wood);
        setglue(res.data?.specification?.glue);
        setwarranty(res.data?.specification?.warranty);
        setshortDescription(res.data?.shortDescription);
        setLongDescription(res.data?.longDescription);
        setimage(res.data?.mainImage);
        setstatus(res.data?.status);
        // setisUpdated(true)
        setupdateObj(res.data);
        setimageArr(res.data?.imageArr);
        setmainCategoryArr(res.data?.categoryArr);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleCtegoryEvent = (id) => {
    const tempCategoryArr = [];
    categoryArr.map((el) => {
      if (el._id === id) {
        tempCategoryArr.push({ categoryId: el._id });
      } else {
        if (el.subCategoryArr && el.subCategoryArr?.length > 0) {
          el.subCategoryArr.map((elx) => {
            if (elx._id === id) {
              tempCategoryArr.push({ categoryId: el._id });
              tempCategoryArr.push({ categoryId: elx._id });
            }
          });
        }
      }
    });

    setcategory(id);
    setmainCategoryArr([...tempCategoryArr]);
  };

  useEffect(() => {
    if (searchParams.get("productId")) {
      setIsEditingModeOn(true);
      handleGetProductById();
    }
  }, [searchParams.get("productId")]);

  useEffect(() => {
    console.log(image, "image");
  }, [image]);

  const HandleAddBrand = async () => {
    try {
      if (`${brandName}` === "") {
        errorToast("Please Fill Brand Name");
        return 0;
      }

      let obj = {
        name: brandName,
        status: true,
      };

      let { data: res } = await addBrandApi(obj);
      if (res.message) {
        successToast(res.message);
        handleGetBrands();
        handleClose();
      }
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <div className="container mt-3 mb-3">
      <div className="row pt-3">
        <div className="col-12 col-md-12">
          <div className="right frormcontainer px-5 py-4">
            <h3 className="heading formheading yellow mb-4">
              {isEditingModeOn ? "Edit" : "Add"} Product
            </h3>
            <form className="form row">
              <h4 className="yellow">Product Details </h4>
              <div className="col-md-6">
                <label>
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>
                  Category <span className="text-danger">*</span>
                </label>

                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => handleCtegoryEvent(e.target.value)}
                >
                  <option value="">Please Select Category</option>
                  {categoryArr &&
                    categoryArr.length > 0 &&
                    subcategoryRender(categoryArr, "-")}
                </select>

                {/* <ReactSelect onChange={(e) => setcategory(e.value)} value={category} defaultInputValue={categoryArr.find(el => el._id == category) ? categoryArr.find(el => el._id == category) : {}} options={categoryArr && categoryArr.length > 0 && categoryArr.map(el => ({ label: el.name, value: el._id }))} /> */}

                {/* <input
                                    type="tel"
                                    className="form-control"
                                    value={mobile}
                                    onChange={(e) => setmobile(e.target.value)}
                                    maxLength="10"
                                /> */}
              </div>
              <div className="col-md-6">
                <div className="row d-flex">
                  <div className="col-4">
                    <label>Brand</label>
                  </div>
                  <div className="col">
                    <div
                      className="row d-flex justify-content-end"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        className="d-flex justify-content-end"
                        style={{ width: "max-content", margin: 0, padding: 0 }}
                      >
                        <label>Didn't find your brand ? </label>
                      </div>
                      <div
                        className="d-flex justify-content-end"
                        style={{ width: "max-content" }}
                      >
                        <button
                          type="button"
                          onClick={handleOpen}
                          className="btn btn-custom btn-link-yellow"
                        >
                          Add Brand now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <select
                  className="form-control"
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                >
                  <option value="">Please Select Brand</option>
                  {brandArr &&
                    brandArr.length > 0 &&
                    brandArr.map((el) => (
                      <option value={el._id}>{el.name}</option>
                    ))}
                </select>
                {/* <ReactSelect onChange={(e) => setbrand(e.value)} options={brandArr && brandArr.length > 0 && brandArr.map(el => ({ label: el.name, value: el._id }))} /> */}

                {/* <input
                                    type="tel"
                                    className="form-control"
                                    value={whatsapp}
                                    onChange={(e) => setwhatsapp(e.target.value)}
                                    maxLength="10"
                                /> */}
              </div>
              <div className="col-md-6">
                <label>
                  Price <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Selling Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={sellingprice}
                  onChange={(e) => setsellingprice(e.target.value)}
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
              <hr className="my-4" />
              <h4 className="yellow">Specification</h4>
              <div className="col-md-6">
                <label>Thickness</label>
                <input
                  type="text"
                  className="form-control"
                  value={thickness}
                  onChange={(e) => setthickness(e.target.value)}
                // maxLength="10"
                />
              </div>
              <div className="col-md-6">
                <label>Usage/Application</label>
                <input
                  className="form-control"
                  value={application}
                  onChange={(e) => setapplication(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Grade</label>
                <input
                  type="text"
                  className="form-control"
                  value={grade}
                  onChange={(e) => setgrade(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Wood Type </label>
                <input
                  type="tel"
                  className="form-control"
                  value={wood}
                  onChange={(e) => setwood(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Glue Used</label>
                <input
                  className="form-control"
                  value={glue}
                  onChange={(e) => setglue(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Warranty</label>
                <input
                  type="text"
                  className="form-control"
                  value={warranty}
                  onChange={(e) => setwarranty(e.target.value)}
                />
              </div>
              <hr className="my-4" />
              <h4 className="yellow">Description</h4>

              <div className="col-md-6">
                <label>
                  Long Description <span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                />
              </div>

              <hr className="my-4" />
              <h4 className="yellow">Product Images</h4>

              <div className="col-md-6">
                <label>Main Image (width:610px and height:400px) </label>
                {image && image != "" && image.includes("base64") ? (
                  <img style={{ height: 100 }} src={image} alt="" />
                ) : (
                  <img
                    src={generateImageUrl(image)}
                    style={{ height: 100 }}
                    alt=""
                  />
                )}
                <FileInput
                  setFile={async (e) => {
                    let base64 = await convertFileToBase64(e);
                    setimage(base64);
                  }}
                  file={image}
                  type="image"
                  previousFile={
                    isEditingModeOn &&
                      image &&
                      image != "" &&
                      image.includes("base64")
                      ? image
                      : null
                  }
                />
              </div>

              <hr />

              <div className="col-md-12 col-12">
                <div className="row">
                  <label className="col-md-6 col- mt-2">
                    Multiple Image (width:92px and height:92px){" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-6">
                    <p
                      type="button"
                      onClick={() => {
                        handleImageAdd();
                      }}
                      className="btn btn-custom btn-yellow mt-2 "
                    >
                      +
                    </p>
                    <p
                      type="button"
                      onClick={() => {
                        handleImagesRemove();
                      }}
                      className="btn btn-custom btn-yellow ms-2 mt-2"
                    >
                      -
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row mt-4">
                    {imageArr &&
                      imageArr.length > 0 &&
                      imageArr.map((el, index) => {
                        return (
                          <div className={"col-md-4"}>
                            <div style={{ height: 100 }}>
                              {el.image.includes("base64") ? (
                                <img
                                  style={{ height: 100 }}
                                  src={el?.image}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={generateImageUrl(el?.image)}
                                  style={{ height: 100 }}
                                  alt=""
                                />
                              )}
                            </div>

                            {/* {
                                                        el.image && el.image != "" && el.image.includes("base64") ?
                                                            <img style={{ height: 100 }} src={el.image} alt="" />
                                                            :
                                                            <img src={generateImageUrl(el.image)} style={{ height: 100 }} alt="" />
                                                    } */}
                            <FileInput
                              setFile={async (e) => {
                                let base64 = await convertFileToBase64(e);
                                handleFileSet(base64, index);
                              }}
                              key={index}
                              file={el.image}
                              type="image"
                              previousFile={
                                isEditingModeOn &&
                                  el.image &&
                                  el.image != "" &&
                                  el.image.includes("base64")
                                  ? el.image
                                  : null
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              

              <div className="col-md-12">
                <button
                  type="button"
                  onClick={() => {
                    onSubmit();
                  }}
                  className="btn btn-custom btn-yellow mt-2"
                style={{width:'100px'}}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Add Brand</h3>

          <label>
            Brand Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              HandleAddBrand();
            }}
            className="btn btn-custom btn-yellow mt-2"
          >
            Submit
          </button>
        </Box>
      </Modal> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Add Brand</h3>
            {/* Cancel Button */}
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>

          <label>
            Brand Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              HandleAddBrand();
            }}
            className="btn btn-custom btn-yellow mt-2"
          >
            Submit
          </button>
        </Box>
      </Modal>

    </div>
  );
}
