import React from "react";
import { Link } from "react-router";

export const CTA = () => {
  return (
    <section className="bg-blue-600 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Auction Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join our community today and discover amazing deals or turn your items
          into cash. Getting started is quick and easy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auction">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium text-lg">
              Explore Auctions
            </button>
          </Link>
          <Link to="/create">
            <button className="bg-blue-700 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-colors font-medium text-lg border-2 border-blue-700">
              List Your Item
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
