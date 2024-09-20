import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import { FaUser, FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;
const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/get-all-orders`, {
          headers,
        });
        setAllOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOptionClick = (i) => {
    setOptions(options === i ? null : i);
  };

  return (
    <>
      {AllOrders.length === 0 ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 capitalize">
            All Orders History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex flex-wrap gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[30%] md:w-[22%]">
              <h1 className="text-center">Books</h1>
            </div>
            <div className="md:w-[45%] w-full hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[30%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] hidden md:block">
              <h1>
                <FaUser />
              </h1>
            </div>
          </div>
          {AllOrders.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex flex-wrap gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[30%] md:w-[22%]">
                {items.book?._id ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title || "No Title Available"}
                  </Link>
                ) : (
                  <span className="text-red-500">Book Not Available</span>
                )}
              </div>
              <div className="md:w-[45%] w-full hidden md:block">
                <h1 className="">
                  {items.book?.desc
                    ? items.book.desc.slice(0, 50) + " ..."
                    : "No description available"}
                </h1>
              </div>

              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => handleOptionClick(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Cancelled" ? (
                      <div className="bg-red-500 text-white">
                        {items.status}
                      </div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  {options === i && (
                    <div className="flex items-center mt-2">
                      <select
                        name="status"
                        className="bg-gray-800 text-white border-gray-700"
                      >
                        {[
                          "Order Placed",
                          "Delivered",
                          "Out for Delivery",
                          "Cancelled",
                        ].map((option, j) => (
                          <option value={option} key={j}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <button className="text-green-500 hover:text-pink-600 mx-2">
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllOrders;
