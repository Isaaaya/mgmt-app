import React from "react";
import { TiWarning } from "react-icons/ti";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center mt-[70px] gap-[13px]">
      <TiWarning size={100} className="text-red-500" />
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-lg">Sorry, this page does not exist...</p>
      <Link to="/">
        <button className="bg-pink-500 text-white px-3 py-1 rounded-md font-semibold">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
