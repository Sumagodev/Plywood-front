import React, { useState } from 'react'
import { useEffect } from 'react';
import { BsCalendarWeekFill } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { images } from "./Utility/Images";
import { getBlogApi } from '../services/Blog.service';
import { generateImageUrl } from '../services/url.service';
import PageBanner from './Utility/PageBanner';
import { getBlogVideoApi } from '../services/BlogVideo.service';
import "../assets/css/Blog.css"

export default function Blogs() {
    const [blogsArr, setBlogsArr] = useState([]);
    const [showBlogs, setShowBlogs] = useState(true);
    const [blogVideoArr, setBlogVideoArr] = useState([]);

    const handleGetBlogs = async () => {
        try {
            let { data: res } = await getBlogApi();
            if (res.data) {
                setBlogsArr(res.data);
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleGetBlogVideo = async () => {
        try {
            let { data: res } = await getBlogVideoApi();
            if (res.data) {
                setBlogVideoArr(res.data);
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        handleGetBlogs()
        handleGetBlogVideo()
    }, [])

























    return (
        <main className="main-blog">
            <PageBanner img={images.top_banner} title="We connect Buyers & Sellers" desp="Plywood bazar is India's largest online B2B marketplace, connecting buyers with suppliers." className="mx-0" />

            <div className="blog2 new_blog2 blog_container top-banner ptb-80">
                <div className="container-fluid d-flex justify-content-center align-items-center">
                    <div className="row overlayflowscroll">
                        <div className={`tab col-lg-2 col-12 ${showBlogs == true ? "active-tab" : "in-active"}`} onClick={() => setShowBlogs(true)}>
                            <div className="blog2_heading">
                                News
                            </div>
                        </div>
                        &nbsp;
                        <div className={`tab col-lg-2 col-12 ${showBlogs == false ? "active-tab" : "in-active"}`} onClick={() => setShowBlogs(false)}>
                            <div className="blog2_heading">
                                Video
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="blog2 new_blog2 blog_container ">
                <div className="container-fluid">
                    {
                        showBlogs ?
                            <div className="row news-1">
                                {
                                    blogsArr && blogsArr.length > 0 && blogsArr.map((el, index) => {
                                        return (
                                            <div key={index} className="col-xxl-3 col-xl-6 col-lg-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                                                <div className="blog_listing">
                                                    <div className="blog_listing_img">
                                                        <img src={generateImageUrl(el.image)} alt="" className="img-fluid blogImage" />
                                                    </div>
                                                    <div className="list_content_blog">
                                                        <h6>{el?.name}</h6>
                                                        {/* <h4> How to Secure Your Ecommerce Website from Cyberattacks</h4> */}
                                                        <div dangerouslySetInnerHTML={{ __html: el?.description.slice(0, 100) }}></div>
                                                        <Link to={`/blog-detail/${el._id}`} className="btn blog_readmore">Read More <BsArrowRight className="blog_arrow" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            :
                            <div className="row video-2">
                                {
                                    blogVideoArr && blogVideoArr.length > 0 && blogVideoArr.map((el, index) => {
                                        return (
                                            <div key={index} className="col-xxl-4 col-xl-6 col-lg-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                                                <div className="blog_listing">
                                                    <div className="blog_listing_img">
                                                        {/* {el.url} */}
                                                        {
                                                            el.url && el.url.includes("http") &&
                                                            <iframe src={(el.url)} allowFullScreen frameborder="0" className="img-fluid blogImage"></iframe>
                                                        }
                                                        {/* <img src={generateImageUrl(el.image)} alt="" className="img-fluid blogImage" /> */}
                                                    </div>
                                                    {/* <div className="list_content_blog">
                                                        <h6>{el?.name}</h6>
                                                        <div dangerouslySetInnerHTML={{ __html: el?.description.slice(0, 100) }}></div>
                                                        <Link to={`/blog-detail/${el._id}`} className="btn blog_readmore">Read More <BsArrowRight className="blog_arrow" /></Link>
                                                    </div> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                    }
                </div>
            </div>





            {/* <section className="blog blog_container mb-80">
                <div className="container-fluid">

                    <div className="row gy-5 mt-5">
                        <div className="col-12 col-md-4">
                            <div className="blog-box">
                                <Link to="/Secureecommercewebsite" className="overflow-hidden">
                                    <div className="image">
                                        <img
                                            src={images.blogimg}
                                            alt=""
                                            className="w-100 img-cover h-100"
                                        />
                                    </div>
                                </Link>
                                <div>

                                    <h4 className="poppin">
                                        <Link to="#">
                                            How to Secure Your Ecommerce Website from Cyberattacks
                                        </Link>
                                    </h4>
                                    <p className="desp">
                                        Concerns regarding privacy and security are growing as the eCommerce business expands. According to research,
                                    </p>
                                    <ul className="tags">
                                        <li>
                                            Prateek Saxena
                                        </li>
                                        <li>

                                            November 25, 2022
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-box">
                                <Link to="/Developingmobileapps" className="overflow-hidden">
                                    <div className="image">
                                        <img
                                            src={images.blogimg1}
                                            alt=""
                                            className="w-100 img-cover h-100"
                                        />
                                    </div>
                                </Link>
                                <div>

                                    <h4 className="poppin">
                                        <Link to="/Developingmobileapps">
                                            The Ultimate Guide to Developing Mobile Apps in 2023
                                        </Link>
                                    </h4>
                                    <p className="desp">
                                        We'll start with the basics, so if you're more advanced,
                                        just skip ahead, but don't miss the common mistakes portion!
                                    </p>
                                    <ul className="tags">
                                        <li>
                                            Prateek Saxena
                                        </li>
                                        <li>

                                            November 25, 2022
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="blog-box">
                                <Link to="/Ecommerceplatformforyourbusiness" className="overflow-hidden">
                                    <div className="image">
                                        <img
                                            src={images.blogimg2}
                                            alt=""
                                            className="w-100 img-cover h-100"
                                        />
                                    </div>
                                </Link>
                                <div>

                                    <h4 className="poppin">
                                        <Link to="/Ecommerceplatformforyourbusiness">
                                            How to Choose the Best E-commerce Platform for Your Business
                                        </Link>
                                    </h4>
                                    <p className="desp">
                                        Regardless of launching an online business,
                                        bringing an offline brand into the digital space, or you've reached the stage where

                                    </p>
                                    <ul className="tags">
                                        <li>
                                            Prateek Saxena
                                        </li>
                                        <li>

                                            November 25, 2022
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="blog-box">
                                <Link to="/Iosappperformance" className="overflow-hidden">
                                    <div className="image">
                                        <img
                                            src={images.blogimg3}
                                            alt=""
                                            className="w-100 img-cover h-100"
                                        />
                                    </div>
                                </Link>
                                <div>
                                    <ul className="tags">
                                        <li>
                                            <span className="icon yellow">
                                                <BsCalendarWeekFill />
                                            </span>
                                            November 30, 2022
                                        </li>
                                        <li>
                                            <span className="icon yellow">

                                            </span>
                                            Admin
                                        </li>
                                    </ul>
                                    <h4 className="poppin">
                                        <Link to="/Iosappperformance">
                                            How the New iOS update Affects Your App Performance

                                        </Link>
                                    </h4>
                                    <p className="desp">
                                        Operating system (OS) upgrades are routine in the computing industry, but they frequently have consequences for the software that runs on top of them.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="blog-box">
                                <Link to="/Ecommerceplatformforyourbusiness" className="overflow-hidden">
                                    <div className="image">
                                        <img
                                            src={images.blogimg4}
                                            alt=""
                                            className="w-100 img-cover h-100"
                                        />
                                    </div>
                                </Link>
                                <div>
                                    <ul className="tags">
                                        <li>
                                            <span className="icon yellow">
                                                <BsCalendarWeekFill />
                                            </span>
                                            November 30, 2022
                                        </li>
                                        <li>
                                            <span className="icon yellow">

                                            </span>
                                            Admin
                                        </li>
                                    </ul>
                                    <h4 className="poppin">
                                        <Link to="/Ecommerceplatformforyourbusiness">
                                            How to Choose the Best E-commerce Platform for Your Business
                                        </Link>
                                    </h4>
                                    <p className="desp">
                                        Regardless of launching an online business,
                                        bringing an offline brand into the digital space, or you've reached the stage where
                                        your online presence takes in thousands of orders each week or month,
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="blog-box">
                                <Link to="/EcommercewebsiteforSEO" className="overflow-hidden">
                                    <div className="image">
                                        <img
                                            src={images.blogimg5}
                                            alt=""
                                            className="w-100 img-cover h-100"
                                        />
                                    </div>
                                </Link>
                                <div>
                                    <ul className="tags">
                                        <li>
                                            <span className="icon yellow">
                                                <BsCalendarWeekFill />
                                            </span>
                                            November 30, 2022
                                        </li>
                                        <li>
                                            <span className="icon yellow">

                                            </span>
                                            Admin
                                        </li>
                                    </ul>
                                    <h4 className="poppin">
                                        <Link to="/EcommercewebsiteforSEO">
                                            How to Optimize Your Ecommerce Website for SEO
                                        </Link>
                                    </h4>
                                    <p className="desp">
                                        If you want to increase traffic and sales to your e-commerce website, on-page SEO is a must.
                                        There are numerous how-to articles and tutorials available on the internet that provide general SEO guidance,

                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-12 mb-4">
                            <div className="heading"><h1>Latest</h1></div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row blog_card">
                                <div className="col-lg-6">
                                    <div className="blog_card_img">
                                        <img src={images.blogimg7} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="blog_page_heading">
                                        <h5>AI-ML</h5>
                                        <h3>Navigating the Complexities of Business: How Generative AI Tools like ChatGPT can Solve Top Industry Challenges</h3>
                                        <p>Generative AI has made its way into the business world, with a notable 35% of...</p>
                                        <ul>
                                            <li>Sudeep Srivastava</li>
                                            <li>26 Apr 2023</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="row blog_card">
                                <div className="col-lg-6">
                                    <div className="blog_card_img">
                                        <img src={images.blogimg7} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="blog_page_heading">
                                        <h5>AI-ML</h5>
                                        <h3>Navigating the Complexities of Business: How Generative AI Tools like ChatGPT can Solve Top Industry Challenges</h3>
                                        <p>Generative AI has made its way into the business world, with a notable 35% of...</p>
                                        <ul>
                                            <li>Sudeep Srivastava</li>
                                            <li>26 Apr 2023</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="row blog_card">
                                <div className="col-lg-6">
                                    <div className="blog_card_img">
                                        <img src={images.blogimg7} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="blog_page_heading">
                                        <h5>AI-ML</h5>
                                        <h3>Navigating the Complexities of Business: How Generative AI Tools like ChatGPT can Solve Top Industry Challenges</h3>
                                        <p>Generative AI has made its way into the business world, with a notable 35% of...</p>
                                        <ul>
                                            <li>Sudeep Srivastava</li>
                                            <li>26 Apr 2023</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4">
                            <div className="category_blog sticky-top">
                                <h4>Category</h4>
                                <Link to="" className="btn">Healtcare & Fitness</Link>
                                <Link to="" className="btn">Restaurant App Development</Link>
                                <Link to="" className="btn">React Native Development</Link>
                                <Link to="" className="btn">Digital Transformation</Link>
                                <Link to="" className="btn">Data Science & Analytics</Link>
                                <Link to="" className="btn">Fintech</Link>
                                <Link to="" className="btn">IOT Development</Link>
                                <Link to="" className="btn">Education</Link>
                                <Link to="" className="btn">Cloud Computing</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


            {/* <section className="banner mb-80">
                <div className="container">
                    <div className="outer-box">
                        <div className="row justify-content-between gx-5">
                            <div className="col-12 col-lg-6">
                                <div className="box">
                                    <div className="icon">
                                        <img src={images.banner_1} alt="" />
                                    </div>
                                    <div className="content flex-1">
                                        <h4 className="heading">
                                            Want to kick start your project right now? Talk to
                                            Experts.
                                        </h4>
                                        <Link to="/" className="yellow fw-semibold fs-5">
                                            Get Free Quote
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="box">
                                    <div className="icon">
                                        <img src={images.banner_2} alt="" />
                                    </div>
                                    <div className="content flex-1">
                                        <h4 className="heading">
                                            What you are looking for ? Website, Mobile App or Digital
                                            Maketing?
                                        </h4>
                                        <Link to="/" className="yellow fw-semibold fs-5">
                                            Request Call Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


        </main>
    );
}

