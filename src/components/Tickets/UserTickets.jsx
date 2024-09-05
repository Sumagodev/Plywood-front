import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/Product.service";
import { getTicketsbyUserId } from "../../services/UserTicket.service";
import { errorToast } from "../Utility/Toast";
import Accordion from "react-bootstrap/Accordion";
import "../../assets/css/help.css";
import { HiPlus } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Table } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export default function UserTickets() {
  let userObj = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const [totalElements, setTotalElements] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [ticketsArr, setProductArr] = useState([]);
  const [userId, setUserId] = useState("");
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  const [searchQuery, setSearchQuery] = useState("");

  const customStyles = {
    tableWrapper: {
      style: {
        // borderRadius: '10px',
        // boxShadow: '15px 18px 35px 0px #00000040',
        // border: '1px solid #c4b7b7',
        // textAlign: 'center',
        // overflow: 'hidden',
      },
    },
    headCells: {
      style: {
        backgroundColor: "#6c4f37",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.3rem",
        display: "flex",
        justifyContent: "center",
        padding: "1vw 0",
      },
    },
    cells: {
      style: {
        backgroundColor: "#f5f1e8",
        color: "black",
        fontWeight: "bold",
        fontSize: "1.05rem",
        display: "flex",
        justifyContent: "center",
        padding: "0.5vw 0",
        // textWrap: 'pretty',
      },
    },
  };

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "10%",
    },
    {
      name: "Name",
      selector: (row, index) => row.name,
      sortable: false,
      width: "60%",
    },
    {
      name: "Action",
      cell: (row, index) => (
        <>
          <button
            type="button"
            onClick={() => navigate(`/View/View-Ticket/${row._id}`)}
            className="btn btn-custom btn-yellow action-button"
          >
            View Messages
          </button>
          <button
            type="button"
            // onClick={() => handleDelteProduct(`${row._id}`)}
            className="btn btn-custom btn-yellow ms-2 action-button"
          >
            <FaTrash />
          </button>
        </>
      ),
      sortable: false,
    },
  ];

  const handleGetUserTickets = async (skipValue, limitValue, searchQuery) => {
    try {
      let query = `page=${skipValue}&perPage=${limitValue}&userId=${userObj?._id}`;

      if (searchQuery) {
        query = `${query}&q=${searchQuery}`;
      }

      let { data: res } = await getTicketsbyUserId(query);
      if (res.data) {
        setTotalElements(res.totalElements);
        setProductArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handlePerRowsChange = (newPerPage, page) => {
    handleGetUserTickets(page, newPerPage);
    setLimit(newPerPage);
  };
  const handlePageChange = (page) => {
    // alert("Asd")
    if (totalElements / page > 1) {
      setPage(page);
      handleGetUserTickets(page, limit);
    }
  };

  const debouncedSave = useCallback(
    // skipValue, limitValue, filterCondition, searchQueryValue, school, company
    debounce(
      (nextValue) => handleGetUserTickets(page, limit, nextValue)(),
      1000
    ),

    [] // will be created only once initially
  );

  // highlight-ends

  const handleChange = (event) => {
    const nextValue = event;

    setSearchQuery(nextValue);

    // Even though handleChange is created on each render and executed

    // it references the same debouncedSave that was created initially

    debouncedSave(nextValue);
  };

  useEffect(() => {
    if (isAuthorized) {
      handleGetUserTickets(1, limit);
    }
  }, [isAuthorized]);

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-10 mb-5 ticket-faq-container">
          {isAuthorized && (
            <>
              <div
                className="row d-flex mt-5 align-items-center justify-content-between"
                style={{ gap: "2vw 0" }}
              >
                <h4 className="col-lg-6 col-sm-12 yellow h4">Your Tickets</h4>
                <div className="col-lg-4 col-sm-6 search-box-button-container">
                  <input
                    type="text"
                    placeholder="Search tickets here ..."
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-control"
                  />
                  <button>
                    <IoSearch />
                  </button>
                </div>
                <div className="col-lg-2 col-sm-6 d-flex justify-content-end create-button-plus-container">
                  <Link
                    to="/View/Add-Ticket"
                    className="yellow-bg btn text-white subsctiption-card-button"
                  >
                    Create a new ticket
                  </Link>
                  <Link to="/View/Add-Ticket" className="hi-plus-icon">
                    <HiPlus />
                  </Link>
                </div>
              </div>
              <div className="react-dataTable">
                <DataTable
                  noHeader
                  subHeader
                  sortServer
                  pagination
                  responsive
                  columns={columns}
                  sortIcon={<BiChevronDown />}
                  className="react-dataTable main-datatable-container"
                  data={ticketsArr}
                  paginationServer
                  paginationTotalRows={totalElements}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  customStyles={customStyles}
                  // subHeaderComponent={
                  //     // <CustomHeader
                  //     //     store={store}
                  //     //     searchTerm={searchTerm}
                  //     //     rowsPerPage={rowsPerPage}
                  //     //     handleFilter={handleFilter}
                  //     //     handlePerPage={handlePerPage}
                  //     //     toggleSidebar={toggleSidebar}
                  //     // />
                  // }
                />

                {/* <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            pageCount={totalPages || 1}
                            // activeClassName='active'
                            forcePage={page !== 0 ? page - 1 : 0}
                            // onPageChange={page => handlePagination(page)}
                            // pageClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            // nextClassName={'page-item'}
                            // previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            pageLinkClassName={'page-link'}
                            containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
                        /> */}
              </div>

              {/* <div className="ticket-table-container">
                <Table className="ticket-table">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th className="td-1">Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="td-1">Plywood</td>
                      <td>
                        <button>View Message</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td className="td-1">Plywood</td>
                      <td>
                        <button>View Message</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td className="td-1">Plywood</td>
                      <td>
                        <button>View Message</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td className="td-1">Plywood</td>
                      <td>
                        <button>View Message</button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div> */}
            </>
          )}

          <div className="row d-flex mt-5 align-items-center justify-content-between"></div>
          <div className="row justify-content-center faq-container1">
            <div className="col-12">
              <h1>FAQ</h1>
            </div>
            <div className="col-12">
              <Accordion className="mt-3" defaultActiveKey="1">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {" "}
                    <div className="accordianHeading">
                      What is plywoodbazar.com{" "}
                    </div>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Plywood bazar. com is India's largest online B2B market
                      place brought a platform to interact with Manufacturers,
                      Distributors, Dealers, Wholesalers and Retailers of
                      Furniture, Plywood, Hardware & Interior- Exterior
                      Industries.{" "}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {" "}
                    <div className="accordianHeading">
                      How to Register{" "}
                    </div>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <strong>
                        {" "}
                        Click Profile Icon right side corner at the top of
                        website{" "}
                      </strong>{" "}
                    </p>
                    <p>Then Click on Register here option.</p>
                    <p>
                      Then Select radio button for Who are you? i.e.
                      MANUFACTURER/IMPORTER, DISTRIBUTOR Or DEALER.{" "}
                    </p>
                    <p>
                      Then Fill other information like Name Of Organization ,
                      Email , Name Of Authorised Person , Contact No. What’s App
                      No. Address , Upload Profile Photo , Banner photo etc.{" "}
                    </p>
                    <p>Then click on the Register Button. </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    {" "}
                    <div className="accordianHeading">
                      What is the Subscription{" "}
                    </div>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      An amount of money that you pay, usually once a year, to
                      receive a membership for connecting to our website as a
                      MANUFACTURER/IMPORTER, DISTRIBUTOR Or DEALER. regularly or
                      to belong to an organization.{" "}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    {" "}
                    <div className="accordianHeading">
                      What is flash sale{" "}
                    </div>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      A sale of goods at greatly reduced prices, lasting for
                      only a short period of time. A discount or promotion
                      offered by an ecommerce store for a short period of time. 
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
