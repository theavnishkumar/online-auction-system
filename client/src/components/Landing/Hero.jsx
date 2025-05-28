import React from "react";
import { Link } from "react-router";

export const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Premier
            <span className="text-blue-600 block">Online Auction</span>
            Destination
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover unique items, place competitive bids, and sell your
            treasures to a global audience. Join thousands of buyers and sellers
            in our trusted marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg">
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-colors font-medium text-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
