import React, { useEffect, useCallback, useState, useRef } from "react";
import { debounce } from "lodash";
import {
  // getUserNotifications,
  searchVendorFromDb,
  sentOtp,
} from "../services/User.service";
import {
  deleteProductbyId,
  getProducts, searchProduct
} from "../services/Product.service";
import { OverlayTrigger, Row, Tooltip, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getAllCategories } from "../services/Category.service";
import { getStates } from "../services/State.service";
import { getBrandApi } from "../services/brand.service";
import { getBrands } from '../services/brand.service';

import { getCityApi } from "../services/city.service";
import { toastError } from "../utils/toastutill";
import { ROLES } from "../utils/Roles.utils";
import { Col } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import {
  Link,

} from "react-router-dom";
import filter from '../assets/image/home/image 140.png'
function ProductFilter({ handleApplyFilter, handleClearFilter, handleClose }) {
  const navigate = useNavigate();
  let role = useSelector((state) => state.auth.role);
  const formRef = useRef(null);

  const [searchBy, setSearchBy] = useState(false);
  const [searchType, setSearchType] = useState("vendor");
  const [searchList, setSearchList] = useState([
    { name: "Search By keyword", checked: true, type: "vendor" },
    { name: "Search By Product", checked: false, type: "product" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [searchResultArr, setSearchResultArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [activeKey, setActiveKey] = useState(null); // This will control the open accordion

  const handleCheckItem = (obj) => {
    const updatedList = searchList.map((el) =>
      el.name === obj.name ? { ...el, checked: true } : { ...el, checked: false }
    );
    setSearchType(obj.type);
    setSearchText("");
    setSearchResultArr([]);
    setSearchList(updatedList);
  };
  useEffect(() => {
    if (searchText) debounceSearch(searchText);
  }, [searchType]);

  const checkSearchMode = () => {
    return searchList.find((el) => el.checked)?.name;
  };
  const handleSearchText = (value) => {
    setSearchText(value);
    debounceSearch(value);
  };
  const debounceSearch = useCallback(
    debounce((nextVal) => handleSearchFromDb(nextVal), 1000),
    [searchType]
  );

  const handleSearchFromDb = async (query) => {
    try {
      console.log(searchType, "handleSearchText");

      const { data: res } = await searchProduct(
        `name=${query}`
      );
      if (res) {
        console.log(res.data, "handleSearchText vendor");
        setShowSearchBar(true);
        setSearchResultArr(res.data);
      } else {
        setShowSearchBar(true);
        setDisplaySearchResults([]);
      }

    } catch (error) {
      toastError(error);
    }
  };

  const setValue = (rating) => {
    setSearchParams((searchParams) => {
      console.log(rating, "rating", parseInt(rating) >= 0);
      console.log(searchParams.get("rating"), "searchParams");

      if (searchParams.get("rating") == rating) {
        searchParams.delete("rating");
        return;
      }
      if (rating && parseInt(rating) >= 0) {
        searchParams.set("rating", `${rating}`);
      } else {
        searchParams.delete("rating");
      }
      return searchParams;
    });
  };

  const [usertypes, setUsertypes] = useState([
    {
      name: ROLES.MANUFACTURER,
      checked: false,
    },
    {
      name: ROLES.DISTRIBUTOR,
      checked: false,
    },
    {
      name: ROLES.DEALER,
      checked: false,
    },
  ]);

  const returnBooleanIfChecked = (value) => {
    let tempRating = searchParams.get("rating");
    if (tempRating == value) {
      return true;
    } else {
      return false;
    }
  };

  const toggleSelected = (index) => {
    let tempArr = usertypes;
    // tempArr[index].checked = !tempArr[index].checked
    tempArr[index].checked = !tempArr[index].checked;
    // let arr = [];
    // if (selected.some((el) => el === id)) {
    //   arr = selected.filter((el) => el !== id);
    // } else {
    //   arr = [...selected, usertypes];
    // }
    setUsertypes([...tempArr]);

    setSearchParams((searchParams) => {
      let categoryStr = tempArr
        .filter((el) => el.checked)
        .reduce(
          (acc, el, i) => acc + el.name + (i != tempArr?.length - 1 ? "," : ""),
          ""
        );
      if (categoryStr) {
        searchParams.set("userTypes", categoryStr);
      } else {
        searchParams.delete("userTypes");
      }
      return searchParams;
    });
  };
  const isChecked = (index) => {
    let tempArr = usertypes;
    return tempArr[index].checked;
  };
  const handleResetStates = () => {
    let tempArr = [
      {
        name: ROLES.MANUFACTURER,
        checked: false,
      },
      {
        name: ROLES.DISTRIBUTOR,
        checked: false,
      },
      {
        name: ROLES.DEALER,
        checked: false,
      },
    ].filter(
      (el) =>
        `${el.name}`.toLowerCase().trim() != `${role}`.toLowerCase().trim()
    );
    setUsertypes([...tempArr]);
    handleClearFilter();
  };

  useEffect(() => {
    if (role) {
      console.log(role);
      let tempArr = usertypes.filter(
        (el) =>
          `${el.name}`.toLowerCase().trim() != `${role}`.toLowerCase().trim()
      );
      console.log(
        role.toLowerCase(),
        usertypes.map((el) => `${el.name}`.toLowerCase()),
        "role"
      );
      setUsertypes([...tempArr]);
    }
  }, [role]);

  // const handelrating = (ratingvalue)=>{
  //    if (ratingvalue && ) {

  //   }
  // }

  return (
    <div className=" shopfilterposition" >


      <Row className=" d-flex  justify-content-center">
        <Col lg={11} className=" px-5 shop-filter py-3">
          <Accordion>
            <Row>

              <Col lg={2}>

                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    <div className="accordianHeading"> Brands</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <BrandFilter />
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
              <Col lg={2}>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {" "}
                    <div className="accordianHeading"> Categories</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <CategoryFilter />
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
              <Col lg={4} className="d-flex justify-content-centre align-items-center">
                <div className=" choosefilter d-flex justify-content-centre align-items-center rounded-5 Header">
                  <Form className=" d-flex serchform rounded-5  position-relative w-100"

                    onClick={() => {
                      setSearchBy(!searchBy);
                    }}
                    onFocus={() => setShowSearchBar(true)}
                    ref={formRef}
                  >





                    <div className="searchbar rounded-pill d-flex row">
                      <div className=" col-1">

                        <button
                          className={`searchicn position-absolute top-50  translate-middle-y me-1 text-white d-inline-flex align-items-center justify-content-center ${!searchText ? "disabled" : ""}`}
                          style={{ fontSize: 12 }}
                          type="button"
                          onClick={() => { handleApplyFilter(); handleClose && handleClose(); }}
                          disabled={!searchText} // This will also prevent the button from being clicked
                        >
                          <FiSearch />
                        </button>
                      </div>
                      <div className=" col-lg-7 col-6  d-flex align-items-center">
                        <Form.Control
                          type="search"
                          className="searchbar2"
                          placeholder={checkSearchMode()}
                          aria-label="Search"
                          value={searchText}
                          onChange={(e) =>
                            handleSearchText(e.target.value)
                          }

                        />
                      </div>

                      <div className="col-lg-4 col-5 d-flex  align-items-center justify-content-">



                        {/* <div>   <button className="btn btn-outline btn-outline-custom " style={{ fontSize: 12 }} type="button"
                          onClick={() => { handleApplyFilter();setActiveKey(null); handleClose && handleClose() }}>
                          Apply
                        </button></div>

                        <div>  <button
                          className="btn btn-outline btn-outline-custom"
                          style={{ fontSize: 12 }}
                          type="button"
                          onClick={() => {
                            navigate("/product-details");
                            handleResetStates();
                            handleClose && handleClose();
                          }}
                        >
                          Clear
                        </button></div> */}
                        <div>
                          <button
                            className="btn btn-outline btn-outline-custom"
                            style={{ fontSize: 12 }}
                            type="button"
                            onClick={() => {
                              handleApplyFilter();
                              setActiveKey(null);
                              handleClose && handleClose();
                            }}
                          >
                            Apply
                          </button>
                        </div>

                        <div>
                          <button
                            className="btn btn-outline btn-outline-custom"
                            style={{ fontSize: 12, marginLeft: 3 }} // Adjust the value as needed
                            type="button"
                            onClick={() => {
                              navigate("/product-details");
                              handleResetStates();
                              handleClose && handleClose();
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>

                    {searchText != "" && showSearchBar && (
                      <div className="searchBox listsearch">
                        <div
                          className="searchBoxCloseIcon"
                          onClick={() => {
                            setShowSearchBar(false);
                          }}
                        >
                          X
                        </div>
                        {searchResultArr &&
                          searchResultArr.length > 0 ? (
                          searchResultArr.map((el, index) => {
                            return (
                              <div key={index}>
                                <Link
                                  to={`/ShopDetail/${el?.slug}`}
                                  onClick={() =>
                                    setShowSearchBar(false)
                                  }
                                  onFocus={() => setShowSearchBar(true)}
                                >
                                  <p>{el?.name}</p>
                                </Link>
                              </div>
                            );
                          })
                        ) : (
                          <div>
                            {/* <Link to={`/ShopDetail/${el?.slug}`} onFocus={() => setShowSearchBar(true)}> */}
                            <p>No results found</p>
                            {/* </Link> */}
                          </div>
                        )}
                      </div>
                    )}
                  </Form>
                  {/* <img src={filter} alt="" /> */}
                  {/* <h5 className="title">Choose Filters</h5> */}

                  {/* <button
                    className="clear_filter"
                    // style={{ fontSize: 12 }}
                    type="button"
                    onClick={() => {
                      navigate("/product-details");
                      handleResetStates();
                      handleClose && handleClose();
                    }}
                  >
                    Clear
                  </button> */}
                </div>
              </Col>
              <Col lg={2}>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <div className="accordianHeading">Rating </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="box">
                      {/* <h5 className="title">Rating </h5> */}
                      <div className="price-range" onClick={() => setValue(4)}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          // onChange={() => toggleSelected(el._id)}
                          checked={returnBooleanIfChecked(4)}
                        />
                        <ReactStars
                          edit={false}
                          count={5}
                          size={24}
                          value={4}
                          activeColor="#ffd700"
                        />{" "}
                        & Up
                      </div>
                      <div className="price-range" onClick={() => setValue(3)}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          // onChange={() => toggleSelected(el._id)}
                          checked={returnBooleanIfChecked(3)}
                        />
                        <ReactStars
                          edit={false}
                          count={5}
                          size={24}
                          value={3}
                          activeColor="#ffd700"
                        />{" "}
                        & Up
                      </div>
                      <div className="price-range" onClick={() => setValue(2)}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          // onChange={() => toggleSelected(el._id)}
                          checked={returnBooleanIfChecked(2)}
                        />
                        <ReactStars
                          edit={false}
                          count={5}
                          size={24}
                          value={2}
                          activeColor="#ffd700"
                        />{" "}
                        & Up
                      </div>
                      <div className="price-range" onClick={() => setValue(1)}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          // onChange={() => toggleSelected(el._id)}
                          checked={returnBooleanIfChecked(1)}
                        />
                        <ReactStars
                          edit={false}
                          count={5}
                          size={24}
                          value={1}
                          activeColor="#ffd700"
                        />{" "}
                        & Up
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
              <Col lg={2}>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <div className="accordianHeading">Price Range</div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <PriceFilter />
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
            </Row>
          </Accordion>
        </Col>
      </Row>

      {/* <div className="row">
        <div className="col-12">
          btn btn-outline btn-outline-custom
          <button
            className="apply_buttn "
            type="button"
            onClick={() => {
              handleApplyFilter();
              handleClose && handleClose();
            }}
          >
            Apply
          </button>
        </div>
      </div> */}

      {/* <LocationFilter /> */}
    </div>
  );
}
const BrandFilter = () => {
  const [brandArr, setBrandArr] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const getBrand = async () => {
    try {
      const { data: res } = await getBrands();
      if (res) setBrandArr(res.data);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  const toggleSelectedBrand = (id) => {
    setSelectedBrands((prevSelectedBrands) => {
      const updatedSelectedBrands = prevSelectedBrands.includes(id)
        ? prevSelectedBrands.filter((el) => el !== id)
        : [...prevSelectedBrands, id];

      // Update search params
      setSearchParams((searchParams) => {
        const brandStr = updatedSelectedBrands.join(",");
        if (brandStr) {
          searchParams.set("brand", brandStr);
        } else {
          searchParams.delete("brand");
        }
        return searchParams;
      });

      return updatedSelectedBrands;
    });
  };

  const isBrandChecked = (id) => selectedBrands.includes(id);

  useEffect(() => {
    if (searchParams.get("brands")) {
      setSelectedBrands(searchParams.get("brands").split(","));
    } else {
      setSelectedBrands([]);
    }
  }, [searchParams]);

  const clearBrandFilters = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("brands");
      return searchParams;
    });
  };

  return (
    <div className="box">
      <ul className="list comm-list">
        {brandArr?.map((brand) => (
          <li key={brand._id}>
            <label>
              <input
                type="checkbox"
                className="form-check-input"
                onChange={() => toggleSelectedBrand(brand._id)}
                checked={isBrandChecked(brand._id)}
              />
              {brand?.name}
            </label>
          </li>
        ))}
      </ul>
      {/* <button onClick={clearBrandFilters}>Clear Brand Filters</button> */}
    </div>
  );
};




const VendorTypesFilter = () => {
  const [manufacturersArr, setManufacturersArr] = useState([]);
  const [dealersArr, setDealersArr] = useState([]);
  const [distributorArr, setDistributorArr] = useState([]);

  const [brandsArr, setBrandsArr] = useState([]);
  const [selected, setSelected] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSelected = (id) => {
    let arr = [];
    if (selected.some((el) => el === id)) {
      arr = selected.filter((el) => el !== id);
    } else {
      arr = [...selected, id];
    }
    console.log(arr, "array", id);
    setSearchParams((searchParams) => {
      let categoryStr = arr.reduce(
        (acc, el, i) => acc + el + (i != arr?.length - 1 ? "," : ""),
        ""
      );
      if (categoryStr) {
        searchParams.set("users", categoryStr);
      } else {
        searchParams.delete("users");
      }
      return searchParams;
    });
    setSelected(arr);
  };

  const isChecked = (id) => {
    return selected.some((el) => el === id);
  };

  const location = useLocation();

  useEffect(() => {
    if (searchParams.get("users")) {
      let categoryArr = searchParams.get("users").split(",");
      setSelected(categoryArr);
    } else {
      setSelected([]);
    }
  }, [searchParams, location.search]);

  return (
    <>
      <div className="box">
        <h5 className="title">Manufacturers</h5>
        <ul className="list comm-list">
          {manufacturersArr &&
            manufacturersArr.length > 0 &&
            manufacturersArr.map((el, index) => {
              return (
                <li key={el._id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => toggleSelected(el?._id)}
                      checked={isChecked(el._id)}
                      className="form-check-input"
                    />
                    {el?.name}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="box">
        <h5 className="title">Dealers</h5>
        <ul className="list comm-list">
          {dealersArr &&
            dealersArr.length > 0 &&
            dealersArr.map((el, index) => {
              return (
                <li key={el._id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => toggleSelected(el?._id)}
                      checked={isChecked(el._id)}
                      className="form-check-input"
                    />
                    {el?.name}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="box">
        <h5 className="title">Distributors</h5>
        <ul className="list comm-list">
          {distributorArr &&
            distributorArr.length > 0 &&
            distributorArr.map((el, index) => {
              return (
                <li key={el._id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => toggleSelected(el?._id)}
                      checked={isChecked(el._id)}
                      className="form-check-input"
                    />
                    {el?.name}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

const VendorFilter = () => {
  const [brandArr, setBrandArr] = useState([]);

  const getBrands = async () => {
    try {
      const { data: res } = await getBrandApi();
      if (res) {
        setBrandArr(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const [selected, setSelected] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSelected = (id) => {
    let arr = [];
    if (selected.some((el) => el === id)) {
      arr = selected.filter((el) => el !== id);
    } else {
      arr = [...selected, id];
    }
    setSearchParams((searchParams) => {
      let categoryStr = arr.reduce(
        (acc, el, i) => acc + el + (i != arr?.length - 1 ? "," : ""),
        ""
      );
      if (categoryStr) {
        searchParams.set("vendors", categoryStr);
      } else {
        searchParams.delete("vendors");
      }
      return searchParams;
    });
    setSelected(arr);
  };

  const isChecked = (id) => {
    return selected.some((el) => el === id);
  };

  const location = useLocation();

  useEffect(() => {
    if (searchParams.get("vendors")) {
      let categoryArr = searchParams.get("vendors").split(",");
      setSelected(categoryArr);
    } else {
      setSelected([]);
    }
  }, [searchParams, location.search]);

  return (
    <div className="box">
      <h5 className="title">Brands</h5>
      <ul className="list comm-list">
        {brandArr &&
          brandArr.length > 0 &&
          brandArr.map((el, index) => {
            return (
              <li key={el._id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleSelected(el?._id)}
                    checked={isChecked(el._id)}
                    className="form-check-input"
                  />
                  {el?.name}
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const CategoryFilter = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState([]);

  const getCategory = async () => {
    try {
      const { data: res } = await getAllCategories();
      if (res) {
        console.log(res.data, "filter");
        setCategoryData(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const toggleSelected = (id) => {
    let arr = [];
    if (selected.some((el) => el === id)) {
      arr = selected.filter((el) => el !== id);
    } else {
      arr = [...selected, id];
    }

    console.log("ARR", arr);

    setSearchParams((searchParams) => {
      let categoryStr = arr.reduce(
        (acc, el, i) => acc + el + (i != arr?.length - 1 ? "," : ""),
        ""
      );
      if (categoryStr) {
        searchParams.set("categoryId", categoryStr);
      } else {
        searchParams.delete("categoryId");
      }
      return searchParams;
    });

    setSelected(arr);
  };

  const isChecked = (id) => {
    return selected.some((el) => el === id);
  };

  const location = useLocation();

  useEffect(() => {
    if (searchParams.get("categories")) {
      let categoryArr = searchParams.get("categories").split(",");
      setSelected(categoryArr);
    } else {
      setSelected([]);
    }
  }, [searchParams, location.search]);

  const clearCategoryFilters = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("categories");

      return searchParams;
    });
  };

  return (
    <div className="box">
      <div className="d-flex">
        <div className="flex-1"></div>
      </div>

      <ul className="list comm-list">
        {categoryData &&
          categoryData?.map((el, i) => {
            return (
              <li key={el._id}>
                <label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={() => toggleSelected(el._id)}
                    checked={isChecked(el._id)}
                  />
                  {el?.name}
                </label>
                {isChecked(el._id) &&
                  el?.subCategoryArr &&
                  el?.subCategoryArr.map((elx) => (
                    <div className="ms-2" key={elx._id}>
                      <label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={elx._id}
                          onChange={() => toggleSelected(elx._id)}
                          checked={isChecked(elx._id)}
                        />
                        {elx?.name}
                      </label>
                      {isChecked(elx._id) &&
                        elx.subCategoryArr.map((ele) => (
                          <div key={ele._id} className="ms-2">
                            <label>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                onChange={() => toggleSelected(ele._id)}
                                checked={isChecked(ele._id)}
                              />
                              {ele?.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  ))}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const LocationFilter = () => {
  const [citiesArr, setCitiesArr] = useState([]);
  const [statesArr, setStatesArr] = useState([]);

  const [mainCitiesArr, setMainCitiesArr] = useState([]);
  const [mainStatesArr, setMainStatesArr] = useState([]);

  const [locationExpand, setLocationExpand] = useState(false);
  const [selectedStateArr, setSelectedStateArr] = useState([]);
  const [selected, setSelected] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSelected = (id) => {
    let arr = [];
    if (selected.some((el) => el === id)) {
      arr = selected.filter((el) => el !== id);
    } else {
      arr = [...selected, id];
    }
    setSearchParams((searchParams) => {
      let categoryStr = arr.reduce(
        (acc, el, i) => acc + el + (i != arr?.length - 1 ? "," : ""),
        ""
      );
      if (categoryStr) {
        searchParams.set("locations", categoryStr);
      } else {
        searchParams.delete("locations");
      }
      return searchParams;
    });
    setSelected(arr);
  };

  const toggleStateSelected = (id) => {
    let arr = [];
    if (selectedStateArr.some((el) => el === id)) {
      arr = selectedStateArr.filter((el) => el !== id);
    } else {
      arr = [id];
    }
    setSearchParams((searchParams) => {
      let categoryStr = arr.reduce(
        (acc, el, i) => acc + el + (i != arr?.length - 1 ? "," : ""),
        ""
      );
      if (categoryStr) {
        searchParams.set("state", categoryStr);
      } else {
        searchParams.delete("state");
      }
      return searchParams;
    });

    console.log(arr, "arrarrarrarrarrarrarrarrarrarr");
    setSelectedStateArr(arr);
  };

  const isChecked = (id) => {
    return selected.some((el) => el === id);
  };

  const isStateChecked = (id) => {
    return selectedStateArr.some((el) => el === id);
  };

  const location = useLocation();

  useEffect(() => {
    if (searchParams.get("locations")) {
      let categoryArr = searchParams.get("locations").split(",");
      setSelected(categoryArr);
    } else {
      setSelected([]);
    }
  }, [searchParams, location.search]);

  const handleGetStates = async () => {
    try {
      let { data: res } = await getStates();
      if (res.data) {
        setStatesArr(res.data);
        setMainStatesArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetCities = async (stateId) => {
    try {
      let { data: res } = await getCityApi("stateId=" + stateId);
      if (res.data) {
        // console.log(res.data,"res.datares.datares.datares.datares.datares.data")
        setCitiesArr(res.data);
        // setMainCitiesArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedStateArr && selectedStateArr?.length > 0) {
      let staId = selectedStateArr[0];
      handleGetCities(staId);
      // setCitiesArr(stateCityArr);

      // let stateCityArr = mainCitiesArr.map((el) => {
      //   if(selectedStateArr.includes(el.stateId)){
      //     return el
      //   }
      // })

      // console.log(stateCityArr,"stateCityArrstateCityArrstateCityArr")
      //  setCitiesArr(stateCityArr)
    }
  }, [selectedStateArr]);

  useEffect(() => {
    handleGetStates();
  }, []);

  const handleSearchState = (value) => {
    let tempArr = mainStatesArr.filter((el) =>
      `${el.name}`.toLowerCase().includes(`${value}`.toLowerCase())
    );

    setStatesArr([...tempArr]);
  };

  const handleSearchCity = (value) => {
    let stateCityArr = mainCitiesArr.filter((el) =>
      selectedStateArr.includes(el.stateId)
    );
    let tempArr = stateCityArr.filter((el) =>
      `${el.name}`.toLowerCase().includes(`${value}`.toLowerCase())
    );

    setCitiesArr([...tempArr]);
  };
  return (
    <div className="box">
      <h5 className="title">State</h5>
      <input
        type="text"
        placeholder="Search state"
        className="form-control mb-3"
        onChange={(e) => handleSearchState(e.target.value)}
      />
      <ul className="list comm-list">
        {statesArr &&
          statesArr.length > 0 &&
          statesArr.map((el, index) => {
            return (
              <li key={el._id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleStateSelected(el?._id)}
                    checked={isStateChecked(el._id)}
                    className="form-check-input"
                  />
                  {el?.name}
                </label>
              </li>
            );
          })}
      </ul>
      <h5 className="title mt-3">City</h5>
      <input
        type="text"
        placeholder="Search city"
        className="form-control mb-3"
        onChange={(e) => handleSearchCity(e.target.value)}
      />

      <ul className="list comm-list">
        {citiesArr &&
          citiesArr.length > 0 &&
          citiesArr.map((el, index) => {
            return (
              <li key={el._id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => toggleSelected(el?._id)}
                    checked={isChecked(el._id)}
                    className="form-check-input"
                  />
                  {el?.name}
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const MinPrize = () => {
  const [minPrice, setMinPrice] = useState(0);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const minPrizeTooltip = (props) => <Tooltip {...props}>{minPrice}</Tooltip>;

  useEffect(() => {
    if (searchParams.get("minPrice")) {
      let minvall = searchParams.get("minPrice");
      setMinPrice(minvall);
    } else {
      setMinPrice(0);
    }
  }, [searchParams, location.search]);

  const setValue = (min = 0) => {
    setSearchParams((searchParams) => {
      if (min != 0) {
        searchParams.set("minPrice", min);
      } else {
        searchParams.delete("minPrice");
      }
      return searchParams;
    });
  };

  return (
    <div>
      <label className="fs-15 fw-semibold line-height-normal">Min</label>

      <input
        type="range"
        className="form-range"
        step="100"
        min="0"
        max="500"
        onChange={(e) => setValue(e.target.value)}
        value={minPrice}
      />

    </div>
  );
};

const MaxPrize = () => {
  const [maxPrice, setMaxPrice] = useState(0);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const maxPrizeTooltip = (props) => <Tooltip {...props}>{maxPrice}</Tooltip>;

  useEffect(() => {
    if (searchParams.get("maxPrice")) {
      let minvall = searchParams.get("maxPrice");
      setMaxPrice(minvall);
    } else {
      setMaxPrice(0);
    }
  }, [searchParams, location.search]);

  const setValue = (min = 0) => {
    setSearchParams((searchParams) => {
      if (min != 0) {
        searchParams.set("maxPrice", min);
      } else {
        searchParams.delete("maxPrice");
      }
      return searchParams;
    });
  };

  return (
    <div>
      <label className="fs-15 fw-semibold line-height-normal">Max</label>

      <input
        type="range"
        className="form-range"
        step="100"
        min="0"
        max="55000"
        onChange={(e) => setValue(e.target.value)}
        value={maxPrice}
      />
    </div>
  );
};
const PriceFilter = () => {
  const [priceRanges, setPriceRanges] = useState([
    { label: "0 to 1000", min: 0, max: 9999, checked: false },
    { label: "1000 to 2000", min: 1000, max: 1999, checked: false },
    { label: "2000 to 3000", min: 2000, max: 2999, checked: false },
    { label: "3000 to 4000", min: 3000, max: 3999, checked: false },
    { label: "4000 to 5000", min: 4000, max: 5000, checked: false },
  ]);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Initialize selected price ranges from URL parameters if available
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    if (minPriceParam && maxPriceParam) {
      const updatedRanges = priceRanges.map((range) => {
        return {
          ...range,
          checked:
            range.min == minPriceParam && range.max == maxPriceParam,
        };
      });
      setPriceRanges(updatedRanges);
    }
  }, [searchParams, location.search]);

  const handleCheckboxChange = (index) => {
    let updatedRanges = [...priceRanges];
    updatedRanges = updatedRanges.map((range, i) => ({
      ...range,
      checked: i === index ? !range.checked : false, // Only allow one checkbox to be selected at a time
    }));

    setPriceRanges(updatedRanges);

    const selectedRange = updatedRanges[index];
    if (selectedRange.checked) {
      setSearchParams((searchParams) => {
        searchParams.set("minPrice", selectedRange.min);
        searchParams.set("maxPrice", selectedRange.max);
        return searchParams;
      });
    } else {
      // Clear price range if unchecked
      setSearchParams((searchParams) => {
        searchParams.delete("minPrice");
        searchParams.delete("maxPrice");
        return searchParams;
      });
    }
  };

  return (
    <div>
      <label className="fs-15 fw-semibold line-height-normal">Price Range</label>
      <div>
        {priceRanges.map((range, index) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`priceRange${index}`}
              checked={range.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <label className="form-check-label" htmlFor={`priceRange${index}`}>
              {range.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProductFilter;
