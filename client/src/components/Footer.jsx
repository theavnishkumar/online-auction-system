import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container flex flex-col items-center justify-between px-6 py-6 mx-auto lg:flex-row">
        <span className="md:text-xl max-lg:hidden font-semibold text-blue-600 underline font-serif">
          Kipa Auction
        </span>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <Link
            to="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500"
          >
            Home
          </Link>

          <Link
            to="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Features
          </Link>

          <Link
            to="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            FAQ
          </Link>

          <Link
            to="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500"
          >
            Help
          </Link>

          <Link
            to="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Privacy
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500 lg:mt-0">
          © Copyright 2024 Kipa Auction.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
