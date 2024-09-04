import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../services/Product.service';
import { errorToast } from '../Utility/Toast';
import { getUserNotifications, markReadNotifications } from '../../services/User.service';

export default function UserNotifications() {
    let userObj = useSelector(state => state.auth.user)

    const navigate = useNavigate()
    const [totalElements, setTotalElements] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [productArr, setProductArr] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: false,
            width: "5%"
        },
        {
            name: "Title",
            selector: (row, index) => row.title,
            sortable: false,
        },
        {
            name: "Content",
            selector: (row, index) => row.content,
            sortable: false,
        },
        {
            name: "Date",
            selector: (row, index) => new Date(row.createdAt).toDateString(),
            sortable: false,
        },

    ]

    const handleMarkkProducts = async (skipValue, limitValue, searchQuery) => {
        try {
    
            let query = `?userId=${userObj?._id}`
            let { data: res } = await markReadNotifications(query)
            if (res.data) {
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    const handleGetProducts = async (skipValue, limitValue, searchQuery) => {
        try {

            let query = `?page=${skipValue}&perPage=${limitValue}&userId=${userObj?._id}`



            let { data: res } = await getUserNotifications(query)
            if (res.data) {
                setTotalElements(res.totalElements)
                setProductArr(res.data)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }


    const handlePerRowsChange = (newPerPage, page) => {
        handleGetProducts((page), newPerPage)
        setLimit(newPerPage)
    }
    const handlePageChange = (page) => {
        // alert("Asd")
        if ((totalElements / page) > 1) {
            setPage((page))
            handleGetProducts((page), limit)
        }
    }



    const debouncedSave = useCallback(
        // skipValue, limitValue, filterCondition, searchQueryValue, school, company
        debounce((nextValue) => handleGetProducts(page, limit, nextValue)(), 1000),

        [] // will be created only once initially

    )

    // highlight-ends



    const handleChange = (event) => {

        const nextValue = event

        setSearchQuery(nextValue)

        // Even though handleChange is created on each render and executed

        // it references the same debouncedSave that was created initially

        debouncedSave(nextValue)

    }




    useEffect(() => {
        handleGetProducts(1, limit)
        handleMarkkProducts()
    }, [])


    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-10 mb-5">
                        <div className="row d-flex mt-5 align-items-center justify-content-between">
                            <div className="col-6 col-sm-4">
                                <h4 className='yellow'>Your Notifications</h4>
                            </div>

                        </div>



                        <div className='react-dataTable'>

                            <DataTable
                                noHeader
                                subHeader
                                sortServer
                                pagination
                                responsive
                                columns={columns}
                                sortIcon={<BiChevronDown />}
                                className='react-dataTable'
                                data={productArr}
                                paginationServer
                                paginationTotalRows={totalElements}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}

                            />


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




