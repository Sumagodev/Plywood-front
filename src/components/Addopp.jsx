import React from 'react'
import '../assets/css/addOpp.css'
import { Container } from 'react-bootstrap'
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import addoppp_img1 from '../assets/image/home/Mask Group.png'
import addoppp_img2 from '../assets/image/home/image 135.png'

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function Addopp() {


    const addopp_details = [
        {
            oppimg: addoppp_img2,
            NameOfOrganization: 'Abc',
            Brand: 'xyz',
            Category: 'fgf',
            EmailId: 'jehgf@gmail.com',
            Country: 'India',
            State: 'maharashtra',
            City: 'Pune'

        },
        {
            oppimg: addoppp_img2,
            NameOfOrganization: 'dhbsjh',
            Brand: 'jdhschg',
            Category: 'dhbjvhd',
            EmailId: 'nbdch@gmail.com',
            Country: 'India',
            State: 'maharashtra',
            City: 'Nashik'

        }
        
    ]

    return (
        <>
            <div className='backimg'>
                <Container>
                    <div className='d-flex align-items-center pt-3'>
                        <h1 className='mb-0'>Added Opportunity</h1>
                        <Link
                            to="/AddDealership"
                            className="yellow-bg btn text-white subsctiption-card-button ms-3 rounded-circle"
                        >
                            <FaPlus />
                        </Link>
                    </div>
                    {/* <Row>
                        <Col lg={4} md={6} sm={12}>cdbfb</Col>
                        <Col lg={4} md={6} sm={12}>bdf</Col>
                        <Col lg={4} md={6} sm={12}>fbd</Col>
                    </Row> */}
                    <Row className='mt-5'>
                        {
                            addopp_details.map((a) => {
                                return (
                                    <>
                                        <Col lg={4} md={6} sm={12}>
                                            <Card className='addopp_card mb-5'>
                                                <div className=' d-flex justify-content-end my-2'>
                                                    <button className='yellow-bg btn text-white mx-2   rounded-5'>   <FaTrash /></button>
                                                    <Link to='/edit-oppotunity'><button className='yellow-bg btn text-white  mx-2  rounded-5'><FaPencilAlt /></button></Link>
                                                </div>
                                                <Container>

                                                    <Card.Img variant="top" src={a.oppimg} height={'200px'} />
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <div className="row pt-4">
                                                                <div className="col-6 my-1 clr">
                                                                    Name Of Organization:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.NameOfOrganization}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 my-1 clr">
                                                                    Brand:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.Brand}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 my-1 clr">
                                                                    Category:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.Category}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 my-1 clr">
                                                                    Email Id:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.EmailId}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 my-1 clr">
                                                                    Country:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.Country}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 my-1 clr">
                                                                    State:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.State}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6 my-1 clr">
                                                                    City:
                                                                </div>
                                                                <div className="col-6  my-1 clr">
                                                                    {a.City}
                                                                </div>
                                                            </div>
                                                            {/* <Row>
                                                                <Col lg={6} md={6} sm={6}>Name Of Organization</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.NameOfOrganization}</Col>


                                                                <Col lg={6} md={6} sm={6}>Brand</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.Brand}</Col>


                                                                <Col lg={6} md={6} sm={6}>Category</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.Category}</Col>

                                                                <Col lg={6} md={6} sm={6}>Email Id</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.EmailId}</Col>

                                                                <Col lg={6} md={6} sm={6}>Country</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.Country}</Col>

                                                                <Col lg={6} md={6} sm={6}>State</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.State}</Col>

                                                                <Col lg={6} md={6} sm={6}>City</Col>
                                                                <Col lg={6} md={6} sm={6}>{a.City}</Col>
                                                            </Row> */}

                                                        </Card.Text>
                                                    </Card.Body>

                                                </Container>
                                            </Card>
                                        </Col >
                                    </>
                                )
                            })
                        }

                    </Row>
                </Container>
            </div >
        </>
    )
}


// onClick={() => handleDeleteFlashSale(el?._id)}
// onClick={() => handleRedirectToEditScreen(el?._id)} 