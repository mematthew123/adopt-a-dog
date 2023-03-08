/* eslint-disable react/no-unescaped-entities */
import React from "react";

const About = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="text-lg mb-4">
          At our site, we're dedicated to helping people in Montana find their
          perfect furry friend. We specialize in dog adoptions and believe that
          every animal deserves a loving home. We're committed to making the
          adoption process as easy and stress-free as possible.
        </p>
        <p className="text-lg mb-4">
          Our site was founded by after a trip to the local animal shelter, Pet
          Tracs in Thompsan Falls. That day we adopted and took home the
          sweetest, sensetive dog, Bernice.
        </p>
        <p className="text-lg mb-4">
          Our goal is to get as many animals adopted as possible. Pretty simple
          right? We think so too. We're not here to make a profit, we're here to
          help animals find their forever homes.
        </p>
        <p className="text-lg mb-4">
          Thank you for choosing our site for your adoption needs. We're honored
          to be a part of your journey, and we can't wait to help you find your
          perfect companion!
        </p>
      </div>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-8 underline">Drop us a line </h2>
        <form
          className="w-full max-w-lg"
          action="https://getform.io/f/3f93f241-ab82-42bf-9218-a7e7664618db"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="first-name"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-name"
                type="text"
                name="name"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                name="email"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-message"
              >
                Message
              </label>
              <textarea
                className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="grid-message"
                name="message"
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Send
              </button>
            </div>
            <div className="md:w-2/3" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;
