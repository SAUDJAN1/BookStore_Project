import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
const url = import.meta.env.VITE_BACKEND_URL;
const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const Fetch = async () => {
      const res = await axios.get(`${url}/api/v1/get-recent-books`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setData(res.data.data);
    };
    Fetch();
  }, []);
  return (
    <>
      <div className="mt-8 px-4">
        <h4 className="text-4xl text-yellow-100 capitalize">
          recently added books
        </h4>

        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {data &&
            data.map((items, i) => {
              return (
                <div key={i}>
                  {" "}
                  <BookCard bookData={items} />{" "}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default RecentlyAdded;
