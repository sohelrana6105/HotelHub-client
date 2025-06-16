import React from "react";
import NotFound from "../assets/page-not-found-11.jpg";

const Notfound = () => {
  return (
    <div className="text-5xl min-h-screen  flex flex-col  justify-center items-center gap-7 font-bold text-red-500">
      <div>
        <img
          className=" w-[360px] md:w-[500px] md:h-[400px]  rounded-2xl"
          src={`${NotFound}`}
          alt=""
        />
      </div>
      <h1> 4O4 Not Found</h1>
    </div>
  );
};

export default Notfound;
