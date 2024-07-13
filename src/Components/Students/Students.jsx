import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from 'react-fullscreen-loading';

export default function Students() {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  let [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending

  async function getAllProducts() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <>
      <div className="container py-2">
        <div className="d-flex justify-content-center">
          <h2 className="">All Students</h2>
        </div>

        <input
          type="text"
          placeholder="Search for name"
          value={searchQuery}
          onChange={handleInputChange}
          className="form-control w-75 my-5 mx-auto"
        />

        <div className="d-flex justify-content-between mb-3">
          <button
            className="btn btn-primary"
            onClick={() => handleSort("asc")}
          >
            Ascending
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSort("desc")}
          >
            Descending
          </button>
        </div>

        <div className="row">
          {isLoading ? (
            <Loading loading background="#3B3B3B" loaderColor="#D0D0D0" />
          ) : (
            <>
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-md-2 cursor-pointer">
                  <div className="product p-3">
                    <Link to={`/SpecificProducts/${product.id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <span className="text-main fw-bolder font-sm">
                        {product.category.name}
                      </span>
                      <h3 className="h6">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between mx-1">
                        <span>{product.price} EGP</span>
                        <span>
                          <i className="fas fa-star rating-color"></i>{" "}
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    {/* Add your delete button or any other actions */}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
