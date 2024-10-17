import React, { useEffect, useState } from 'react'
import FileInput from './Utility/FileUploadCropper'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../assets/css/mybanner.css'
import { errorToast } from './Utility/Toast';
import { getAllProducts, } from '../services/Product.service';
import { useSelector } from 'react-redux';
function Mybanner() {

    const [productArr, setProductArr] = useState([]);

    let userObj = useSelector((state) => state.auth.user);
    const [viewType, setViewType] = useState('profile-view');

    const handleViewChange = (event) => {
        setViewType(event.target.value);
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
      useEffect(() => {
        console.log(userObj, "userObj");
        handleGetProducts();
        
      }, []);


    function onSubmit() {
        alert('Submit button clicked')
    }


    return (
        <>
            <div className='backimgbanner m-0 p-0'>
                <Container className='pt-4'>
                    <Row>
                        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                            <label className='p-2'>Select Image : </label>
                            {/* <FileInput type="image" /> */}
                             <input type='file' />
                        </Col>

                        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                            <div>
                                <b>Select Type</b>
                                <div className='mybanner_compo'>
                                    <Form.Check
                                        type="radio"
                                        aria-label="radio 1"
                                        name="viewType"
                                        value="profile-view"
                                        onChange={handleViewChange}
                                        checked={viewType === 'profile-view'}

                                        className='profileview_btn'
                                    />
                                    <p className='m-0 p-2'>Profile View  </p>
                                    <Form.Check
                                        type="radio"
                                        aria-label="radio 2"
                                        name="viewType"
                                        value="product-view"
                                        onChange={handleViewChange}
                                        checked={viewType === 'product-view'}
                                        className='productview_btn'
                                    />
                                    <p className='m-2'>Product View  </p>

                                </div>
                            </div>
                            {viewType === 'product-view' && (
                                <>
                                    <p>Selecte Product : </p>
                                    <Form.Select aria-label="Default select example">
                                        <option>Product*</option>
                                        {/* <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option> */}
                                        {productArr &&
                                            productArr.length > 0 &&
                                            productArr.map((el) => (
                                                <option key={el._id} value={`${el._id}`}>
                                                    {el.name}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </>
                            )}
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-2 mb-3 pb-3">
                        <Col xs="auto">
                            <button
                                type="button"
                                onClick={() => onSubmit()}
                                className="btn btn-custom btn-yellow mt-2 submitbanner"
                            >
                                Submit
                            </button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Mybanner
