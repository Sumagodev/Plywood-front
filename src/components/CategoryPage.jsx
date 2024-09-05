import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import Category from "./Category";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";

function CategoryPage() {


  return (
    <main>
      <PageBanner
        img={images.top_banner}
        title="All Categories"
        className="mt-4 mb-80"
      />

     <Category />

      <section className="ptb-80 contact-us">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="right">
                <h1 className="heading col-12 col-md-6 mb-4">Tell us what you need, and we’ll help you get quotes</h1>
                <form className="form row">
                  <div className="col-12 col-md-6">
                    <label>Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>I want quotes for</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Mobile No.</label>
                    <input type="tel" className="form-control" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Phone no.</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-12">
                    <label>Message</label>
                    <textarea rows="5" className="form-control"></textarea>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-custom btn-yellow mt-2">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;
