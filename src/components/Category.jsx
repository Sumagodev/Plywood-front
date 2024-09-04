import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { getNestedCategories } from "../services/Category.service";
import { generateImageUrl } from "../services/url.service";
import { images } from "./Utility/Images";

function Category() {
  const [category, setCategory] = useState([
    {
      name: "Plywood & MDF",
      active: false,
      img: images.category_1,
      child: [
        {
          name: "Brand",
          active: false,
        },
        {
          name: "Commercial Plywood",
          active: false,
        },
        {
          name: "Block Boards",
          active: false,
        },
        {
          name: "Waterproof Plywood",
          active: false,
        },
        {
          name: "Water Resistant Plywood",
          active: false,
        },
        {
          name: "Shuttering Plywood",
          active: false,
        },
        {
          name: "Flush Doors",
          active: false,
        },
        {
          name: "WPC Sheets",
          active: false,
        },
        {
          name: "MDF",
          active: false,
        },
        {
          name: "Interior Grade MDF",
          active: false,
        },
        {
          name: "Exterior Grade MDF",
          active: false,
        },
        {
          name: "Birch Plywood",
          active: false,
        },
        {
          name: "Fire Resistant Plywood",
          active: false,
        },
        {
          name: "E.0 Plywood. Finger Joint Panels",
          active: false,
        },
        {
          name: "Particle Board",
          active: false,
        },
      ],
    },
    {
      name: "Laminates/Veneers",
      active: false,
      img: images.category_2,
      child: [
        {
          name: "Brand",
          active: false,
        },
        {
          name: "Commercial Plywood",
          active: false,
        },
        {
          name: "Block Boards",
          active: false,
        },
        {
          name: "Waterproof Plywood",
          active: false,
        },
        {
          name: "Water Resistant Plywood",
          active: false,
        },
        {
          name: "Shuttering Plywood",
          active: false,
        },
        {
          name: "Flush Doors",
          active: false,
        },
        {
          name: "WPC Sheets",
          active: false,
        },
        {
          name: "MDF",
          active: false,
        },
        {
          name: "Interior Grade MDF",
          active: false,
        },
        {
          name: "Exterior Grade MDF",
          active: false,
        },
        {
          name: "Birch Plywood",
          active: false,
        },
        {
          name: "Fire Resistant Plywood",
          active: false,
        },
        {
          name: "E.0 Plywood. Finger Joint Panels",
          active: false,
        },
        {
          name: "Particle Board",
          active: false,
        },
      ],
    },
    {
      name: "Hardware/Furniture Fixtures",
      active: false,
      img: images.category_3,
      child: [
        {
          name: "Brand",
          active: false,
        },
        {
          name: "Commercial Plywood",
          active: false,
        },
        {
          name: "Block Boards",
          active: false,
        },
        {
          name: "Waterproof Plywood",
          active: false,
        },
        {
          name: "Water Resistant Plywood",
          active: false,
        },
        {
          name: "Shuttering Plywood",
          active: false,
        },
        {
          name: "Flush Doors",
          active: false,
        },
        {
          name: "WPC Sheets",
          active: false,
        },
        {
          name: "MDF",
          active: false,
        },
        {
          name: "Interior Grade MDF",
          active: false,
        },
        {
          name: "Exterior Grade MDF",
          active: false,
        },
        {
          name: "Birch Plywood",
          active: false,
        },
        {
          name: "Fire Resistant Plywood",
          active: false,
        },
        {
          name: "E.0 Plywood. Finger Joint Panels",
          active: false,
        },
        {
          name: "Particle Board",
          active: false,
        },
      ],
    },
    {
      name: "Surface Designer Sheets & Panels",
      active: false,
      img: images.category_4,
      child: [
        {
          name: "Brand",
          active: false,
        },
        {
          name: "Commercial Plywood",
          active: false,
        },
        {
          name: "Block Boards",
          active: false,
        },
        {
          name: "Waterproof Plywood",
          active: false,
        },
        {
          name: "Water Resistant Plywood",
          active: false,
        },
        {
          name: "Shuttering Plywood",
          active: false,
        },
        {
          name: "Flush Doors",
          active: false,
        },
        {
          name: "WPC Sheets",
          active: false,
        },
        {
          name: "MDF",
          active: false,
        },
        {
          name: "Interior Grade MDF",
          active: false,
        },
        {
          name: "Exterior Grade MDF",
          active: false,
        },
        {
          name: "Birch Plywood",
          active: false,
        },
        {
          name: "Fire Resistant Plywood",
          active: false,
        },
        {
          name: "E.0 Plywood. Finger Joint Panels",
          active: false,
        },
        {
          name: "Particle Board",
          active: false,
        },
      ],
    },
    {
      name: "Adhesive",
      active: false,
      img: images.category_5,
      child: [
        {
          name: "Brand",
          active: false,
        },
        {
          name: "Commercial Plywood",
          active: false,
        },
        {
          name: "Block Boards",
          active: false,
        },
        {
          name: "Waterproof Plywood",
          active: false,
        },
        {
          name: "Water Resistant Plywood",
          active: false,
        },
        {
          name: "Shuttering Plywood",
          active: false,
        },
        {
          name: "Flush Doors",
          active: false,
        },
        {
          name: "WPC Sheets",
          active: false,
        },
        {
          name: "MDF",
          active: false,
        },
        {
          name: "Interior Grade MDF",
          active: false,
        },
        {
          name: "Exterior Grade MDF",
          active: false,
        },
        {
          name: "Birch Plywood",
          active: false,
        },
        {
          name: "Fire Resistant Plywood",
          active: false,
        },
        {
          name: "E.0 Plywood. Finger Joint Panels",
          active: false,
        },
        {
          name: "Particle Board",
          active: false,
        },
      ],
    },
    {
      name: "Wood",
      active: false,
      img: images.category_6,
      child: [
        {
          name: "Brand",
          active: false,
        },
        {
          name: "Commercial Plywood",
          active: false,
        },
        {
          name: "Block Boards",
          active: false,
        },
        {
          name: "Waterproof Plywood",
          active: false,
        },
        {
          name: "Water Resistant Plywood",
          active: false,
        },
        {
          name: "Shuttering Plywood",
          active: false,
        },
        {
          name: "Flush Doors",
          active: false,
        },
        {
          name: "WPC Sheets",
          active: false,
        },
        {
          name: "MDF",
          active: false,
        },
        {
          name: "Interior Grade MDF",
          active: false,
        },
        {
          name: "Exterior Grade MDF",
          active: false,
        },
        {
          name: "Birch Plywood",
          active: false,
        },
        {
          name: "Fire Resistant Plywood",
          active: false,
        },
        {
          name: "E.0 Plywood. Finger Joint Panels",
          active: false,
        },
        {
          name: "Particle Board",
          active: false,
        },
      ],
    },
  ]);
  const [categoryArr, setcategoryArr] = useState([]);


  const handleNestedcategories = async () => {
    try {
      let { data: res } = await getNestedCategories();
      if (res.data) {
        let category = res.data.map(el => ({ ...el, active: false }))
        setcategoryArr(category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleNestedcategories
      ()
  }, [])

  const ActiveCategory = (i) => {
    const temp = categoryArr.map((item, index) => {
      if (i === index) {
        item.active = !item.active;
      } else {
        item.active = false;
      }
      return item;
    });
    setCategory([...temp]);
    // console.log(category);
  };

  return (
    <section className="category-page mb-80">
      <div className="container">
        <div className="row gy-4">
          {categoryArr && categoryArr.map((item, i) => {
            return (
              <div className="col-12 col-md-4" key={i}>
                <div className="box">
                  <img src={generateImageUrl(item.image)} alt="" />
                
                  <h5 className="title brown">{item.name}</h5>
                  <ul className="sub-category">
                    {item.subCategoryArr.length > 0 &&
                      item.subCategoryArr.map((child, index) => {
                        if (index < 5) {
                          return <li>{child.name}</li>;
                        }
                      })}
                    {item.subCategoryArr.length >= 5 &&
                      item.subCategoryArr.map((child, index) => {
                        if (index >= 5) {
                          return (
                            <Collapse in={item.active}>
                              <li>{child.name}</li>
                            </Collapse>
                          );
                        }
                      })}
                    <li
                      onClick={() => ActiveCategory(i)}
                      className="brown fw-semibold pointer"
                    >
                      {item.active ? "Shrink" : "Expand"}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Category;
