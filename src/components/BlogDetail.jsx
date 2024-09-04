import React, { useEffect, useState } from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { images } from "./Utility/Images";
import { getBlogBySlugApi } from "../services/Blog.service";
import { generateImageUrl } from "../services/url.service";
import "../assets/css/Blog.css"

export default function BlogDetail() {
    const [blogDetails, setBlogDetails] = useState({});
    const params = useParams()


    const handleGetBlogDetail = async () => {
        try {
            let { data: res } = await getBlogBySlugApi(params.id)
            if (res.data) {
                setBlogDetails(res.data)
            }
        }
        catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        handleGetBlogDetail()
    }, [params])



    return (
        <main className="border-top pt-5">
            <section className="blog-detail mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="blog-box">
                                <div className="header-blog-news">
                                    <div>BLOG / NEWS</div>
                                </div>
                                <div className="image">
                                    <img
                                        src={generateImageUrl(blogDetails.image)}
                                        alt=""
                                        className="w-100 img-cover h-100"
                                    />
                                </div>
                                <div>
                                    <h3 className="heading mt-3">
                                        {blogDetails?.name}
                                    </h3>
                                    <ul className="tags mb-3">
                                        <li>
                                            <span className="icon yellow">
                                                <BsCalendarWeekFill />
                                            </span>
                                            {new Date(blogDetails.createdAt).toDateString()}
                                        </li>
                                        <li>
                                            <span className="icon yellow">
                                                <FaUserAlt />
                                            </span>
                                            Admin
                                        </li>
                                    </ul>
                                    <div className="content" dangerouslySetInnerHTML={{ __html: blogDetails?.description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    )
}
