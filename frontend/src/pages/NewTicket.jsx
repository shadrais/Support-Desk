import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { createTicket, reset } from "../features/ticket/ticketSlice";
const products = [
  "Select Product",
  "Laptop",
  "Mobile",
  "Camera",
  "Television",
  "Headphone",
  "Speaker",
  "Watch",
  "Tablet",
  "Other",
];

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    product: "",
    description: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/tickets");
      toast.success("Ticket Created Successfully");
    }
    return () => dispatch(reset());
  }, [isError, isSuccess, message]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.description) {
      return toast.error("Please fill in all fields");
    }
    console.log(formData);
    dispatch(createTicket(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please Fill the Form</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user?.name}
            disabled
          />
          <label htmlFor="email">Customer Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={user?.email}
            disabled
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select name="product" id="product" onChange={handleChange}>
              {products.map((product) => (
                <option
                  key={product}
                  value={product === "Select Product" ? "" : product}
                >
                  {product}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
