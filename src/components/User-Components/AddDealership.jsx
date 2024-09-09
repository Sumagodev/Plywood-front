
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../assets/css/AddDealership.css";
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from "../../services/location.service";

const AddDealership = () => {
    const [countryId, setcountryId] = useState("");
    const [countryArr, setcountryArr] = useState([]);
    return (
        <div>
            <Container>
                <Row>
                    <Col lg={12} className='dealrship-heading d-flex align-items-center justify-content-center my-5 py-2' > <h1 style={{ color: "#603200", fontSize: "2rem" }}>Add Dealership</h1></Col>
                </Row>

                <h2> Providing dealership Form</h2>
                <Row >
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Organisation name
                                </Form.Label>
                                <Form.Control type="string" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Type</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>

                            {/* <Button variant="primary" type="submit">
                                Submit
                            </Button> */}
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="email" placeholder=" " />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>



                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder=" " />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Location</Form.Label>
                                {
                                    countryArr && (
                                        <select className="form-control" onChange={(e) => setcountryId(e.target.value)}>
                                            <option value="">Please Select Country</option>
                                            {countryArr.map((country) => (
                                                <option value={country._id} >{country.name}</option>
                                            ))}
                                        </select>
                                    )
                                }
                            </Form.Group>
                            {/* <Button variant="primary" type="submit">
                                Submit
                            </Button> */}
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Container>


                <h2> Applying For Dealership</h2>
                <Row >
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Organisation name
                                </Form.Label>
                                <Form.Control type="string" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Type</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>

                            {/* <Button variant="primary" type="submit">
                                Submit
                            </Button> */}
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="email" placeholder=" " />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder=" " />

                            </Form.Group>
                            {/* <Button variant="primary" type="submit">
                                Submit
                            </Button> */}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddDealership
