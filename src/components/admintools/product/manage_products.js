import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import Base from "../../base/base";
import Default from "../../../assets/images/Default.png";
import { getAllCategories } from "../../../util/product_api_util";
/**
 * @author
 * @function ManageCategories
 **/

const ManageCategories = props => {
  const [categories, setCategories] = useState([]);
  const preload = () => {
    getAllCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data.data);
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Base title="Welcome Admin" description="Manage your products"></Base>
      <div className="manage-product">
        <Link className="btn btn-info" to={`/`}>
          <span className="">Admin Home</span>
        </Link>
        &nbsp;
        <Link className="btn btn-info" to="/admin/create/product">
          Create Product
        </Link>
        <div className="category-map">
          {categories.map((category, index) => {
            return (
              <>
                {/* <Card.Group> */}
                <div className="row">
                  <Link to={`/admin/manage/${category._id}`}>
                    <Card
                      style={{ height: "120px", marginBottom: "40px" }}
                      key={index}
                    >
                      <Card.Content>
                        <Image floated="right" size="small" src={Default} />
                        <Card.Header>{category.name}</Card.Header>
                        <Card.Meta>{category.type}</Card.Meta>
                        {/* <Card.Description>
                          {category.description}
                        </Card.Description> */}
                      </Card.Content>
                    </Card>
                  </Link>
                </div>
                {/* </Card.Group> */}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
