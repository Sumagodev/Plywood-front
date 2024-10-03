import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { errorToast, successToast } from "../Utility/Toast";
import { getAllProducts } from '../../services/Product.service';
import { AddBannerImage, getBannerImageById, updateBannerImageApi } from '../../services/Bannerimsges.service';
import { useSelector } from 'react-redux';

function AddBannerimg() {
    const [productArr, setProductArr] = useState([]);
    const [productId, setProductId] = useState('');
    const [type, setType] = useState('');
    const [profileImage, setProfileImage] = useState(null); // For the image
    const userObj = useSelector((state) => state.auth.user);
    const [viewType, setViewType] = useState('profilebanner');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the id from the URL params (if available)

    // Check if editing or adding
    const isEditing = !!id; // Convert to boolean

    useEffect(() => {


        const fetchProducts = async (skipValue, limitValue, searchQuery) => {
            try {
                let query = `page=${skipValue}&perPage=${limitValue}&userId=${userObj?._id}`;

                if (searchQuery) {
                    query = `${query}&q=${searchQuery}`;
                }

                let { data: res } = await getAllProducts(query);
                if (res.data) {
                    
                    setProductArr(res.data);
                }
            } catch (err) {
                errorToast(err);
            }
        };


        // Fetch banner data if editing
        const fetchBannerData = async () => {
            if (isEditing) {
                try {
                    const { data: banner } = await getBannerImageById(id);
                    setProfileImage(banner.image);
                    setViewType(banner.type);
                    setProductId(banner.productId);
                } catch (error) {
                    errorToast('Error fetching banner data');
                    console.error(error);
                }
            }
        };

        fetchProducts();
        fetchBannerData();
    }, [id, isEditing]);

    const handleViewChange = (event) => {
        setViewType(event.target.value);
    };

    const handleProductChange = (e) => {
        setProductId(e.target.value); // Capture selected product ID
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfileImage(reader.result); // Save base64 string of the image
            };
        }
    };

    const handleSubmit = async () => {
        if (!profileImage) {
            errorToast('Please select an image');
            return;
        }

        const formData = {
            userId: userObj._id,
            type: viewType,
            productId: productId || null, // Ensure productId is null if not provided
            image: profileImage, // This is now a base64 string
        };

        try {
            if (isEditing) {
                await updateBannerImageApi(id, formData); // Update existing banner
                successToast('Banner image updated successfully');
            } else {
                await AddBannerImage(formData); // Add new banner
                successToast('Banner image added successfully');
            }
            navigate('/mybanner');
        } catch (error) {
            errorToast('Entry alredy exists');
            console.error(error);
        }
    };

    return (
        <div className="mt-3">
            <Container>
                <h3>{isEditing ? "Edit Banner Image" : "Add Banner Image"}</h3> {/* Dynamic title */}
                <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <label>Select Image:</label>
                        <input type="file" onChange={handleImageChange} />
                    </Col>

                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <div>
                            <b>Select Type</b>
                            <div className="mybanner_compo">
                                <Form.Check
                                    type="radio"
                                    aria-label="radio 1"
                                    name="viewType"
                                    value="profilebanner"
                                    onChange={handleViewChange}
                                    checked={viewType === 'profilebanner'}
                                    className="profileview_btn"
                                />
                                <p className="m-0 p-2">Profile View:</p>
                                <Form.Check
                                    type="radio"
                                    aria-label="radio 2"
                                    name="viewType"
                                    value="productbanner"
                                    onChange={handleViewChange}
                                    checked={viewType === 'productbanner'}
                                    className="productview_btn"
                                />
                                <p className="m-2">Product View:</p>
                            </div>
                        </div>

                        {viewType === 'productbanner' && (
                            <>
                                <p>Select Product:</p>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleProductChange}
                                    value={productId} // Pre-fill for editing
                                >
                                    <option value="">Select Product*</option>
                                    {productArr &&
                                        productArr.length > 0 &&
                                        productArr.map((el) => (
                                            <option key={el._id} value={el._id}>
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
                            onClick={handleSubmit}
                            className="btn btn-custom btn-yellow mt-2 submitbanner"
                        >
                            {isEditing ? "Update" : "Submit"} {/* Change button text dynamically */}
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddBannerimg;
