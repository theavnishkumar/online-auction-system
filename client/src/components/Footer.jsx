import { Link } from "react-router";

export const Footer = () => {
  return (
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">
                Online Auction System
              </h3>
              <p className="text-gray-400 text-sm">
                Your trusted marketplace since 2024
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/about"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                About
              </Link>
              <Link
                to="/legal"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Legal
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Online Auction System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
};
