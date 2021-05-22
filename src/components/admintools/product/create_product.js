import React, { useState } from "react";
import Base from "../../base/base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../actions/user_actions";
import { createCategory } from "../../../util/product_api_util";
import Select from "react-select";
// import { Select } from "@material-ui/core";

/**
 * @author
 * @function AddCategory
 **/

const AddCategory = props => {
  const [names, setName] = useState({
    name: "",
    description: "",
    type: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //   const { token } = isToken();
  const user = isAuthenticated();
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-small btn-info mb-3" to="/">
        Admin Home
      </Link>
    </div>
  );

  const { name, description, type } = names;
  const handleChange = name => event => {
    setName({ ...names, [name]: event.target.value });
  };
  const handleTypeChange = data => {
    setName({ ...names, type: data });
  };
  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend req fired
    const values = {
      name : name,
      description : description,
      type : type.value
    }
    createCategory(user.id, values).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName({ name: "", description: "" });
      }
    });
  };
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">product created successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create product</h4>;
    }
  };
  const options = [
    { label: "Product", value: "product" },
    { label: "Service", value: "service" }
  ];
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <div>
          <p className="lead">Enter name</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("name")}
            value={name}
            autoFocus
            required
          />
        </div>
        <div>
          <p className="lead">Enter description</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("description")}
            value={description}
            // autoFocus
            required
          />
          <label for="type">Type</label>
          <p style={{ backgroundColor: "color" }}>
            <Select
              style={{ color: "black" }}
              id="type"
              value={type}
              options={options}
              placeholder="Select Type"
              onChange={handleTypeChange}
            />
          </p>
          {/* <select name="type" id="type" value = {type} onChange={handleChange("type")} required>
          <option value="product">select</option>
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select> */}
          <br />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
  return (
    <Base
      title="create a product"
      description="by the order of POHULABS"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
