import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-50">
      <footer>
        <div className=" bg-gray-50 max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          ></nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 Adopt MT. All rights reserved.
          </p>
          <p className="mt-8 text-center text-base text-gray-400">
            Made with ❤️ by{" "}
            <a
              href="https://zephyrpixels.dev"
              className="underline"
            >
              Zephyr Pixels
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
