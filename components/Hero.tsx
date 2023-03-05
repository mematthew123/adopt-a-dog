import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center lg:justify-between">
        <div className="lg:w-1/2 w-full lg:py-0 py-12 text-center lg:text-left lg:pr-12">
          <h1 className="text-4xl font-bold leading-tight mb-4">Adopt a dog</h1>
          <p className="text-xl leading-relaxed mb-8">
            Dog adoption made easy in Montana
          </p>
          <Link
            href="/dogs"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            boop!
          </Link>
        </div>
        <div className="lg:w-1/2 w-full lg:py-0 py-12 lg:text-right">
          {/* WE WANT TO ADD AN IMAGE HERE OF A DOG */}
          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
