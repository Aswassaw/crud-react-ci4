import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const products = await axios.get("http://localhost:8080/products");
    setProducts(products.data);
  };

  const onClickHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/products/" + id).then(() => {
          getProducts();

          Swal.fire("Deleted!", "That data has been deleted.", "success");
        });
      }
    });
  };

  return (
    <>
      <h1>Product List</h1>
      <Link className='btn btn-success mb-2' to='/add-product'>
        Add Product
      </Link>
      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead className='table-dark'>
            <tr>
              <th scope='col'>No</th>
              <th scope='col'>Title</th>
              <th scope='col'>Price</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={product.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link
                      to={`/edit-product/${product.id}`}
                      className='btn btn-primary btn-sm mx-1'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onClickHandler(product.id)}
                      className='btn btn-danger btn-sm mx-1'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
