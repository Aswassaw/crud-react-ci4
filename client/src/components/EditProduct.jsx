import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const history = useHistory();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
  });

  useEffect(() => {
    const getProductById = async () => {
      const product = await axios.get("http://localhost:8080/products/" + id);
      setFormData(product.data);
    };

    getProductById();
  }, [id]);

  const onChangehandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8080/products/" + id, formData);
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Edit Product</h1>
      <hr />
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>
          Title
        </label>
        <input
          type='text'
          className='form-control'
          id='title'
          name='title'
          value={formData.title}
          onChange={onChangehandler}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='price' className='form-label'>
          Price
        </label>
        <input
          type='number'
          className='form-control'
          id='price'
          name='price'
          value={formData.price}
          onChange={onChangehandler}
          required
        />
      </div>
      <button type='submit' className='btn btn-primary mx-1'>
        Submit
      </button>
      <Link type='submit' className='btn btn-danger mx-1' to='/'>
        Back
      </Link>
    </form>
  );
};

export default EditProduct;
