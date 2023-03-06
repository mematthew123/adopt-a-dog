import React from "react";
import Image from "next/image";

const cats = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className=" py-2 font-bold underline-offest-1 text-3xl text-center ">
        Coming Soon, Cats!
      </h2>
      <div className=" m-4 mx-auto items-center flex justify-center container border-2 shadow-md rounded-sm">
        <Image
          src="https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1638481741/adhcqgo2sadh0sqskunk.jpg"
          width={1300}
          height={500}
          alt="Cats"
        />
      </div>
    </div>
  );
};

export default cats;
