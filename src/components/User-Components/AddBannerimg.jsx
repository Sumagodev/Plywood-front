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
function AddBannerimg() {

    const [productArr, setProductArr] = useState([]);

    let userObj = useSelector((state) => state.auth.user);
    const [viewType, setViewType] = useState('profile-view');

    const handleViewChange = (event) => {
        setViewType(event.target.value);
    };


    // Fetch when dealershipId changes

    const handleSubmit = async (e) => {

        const formData = {
            userId: userObj._id,
            type: type,
            Brand: brandNames,
            productId: productId,
            image: profileImage,


        };

        try {

            // Add new dealership
            const { data: response } = await Adddealership(formData);
            successToast("Dealership added successfully");
            navigate('/mydealerships');  // Redirect after successful submission
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };


    return (
        <>
            <div className='mt-3'>
                <Container>
                    <Row>
                        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                            <label>Select Image:</label>
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
                                    <p className='m-0 p-2'>Profile View : </p>
                                    <Form.Check
                                        type="radio"
                                        aria-label="radio 2"
                                        name="viewType"
                                        value="product-view"
                                        onChange={handleViewChange}
                                        checked={viewType === 'product-view'}
                                        className='productview_btn'
                                    />
                                    <p className='m-2'>Product View : </p>

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

                    <Row className="justify-content-center mt-2 mb-3">
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

export default AddBannerimg
