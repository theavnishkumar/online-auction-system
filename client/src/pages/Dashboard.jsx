import React, { useEffect, useState } from "react";
import { mockAuctions } from "../auction.js";
import AuctionCard from "../components/AuctionCard.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    setAuctions(mockAuctions);
  });

  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-sm shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">
              Total Auctions
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {auctions.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">
              Active Auctions
            </h3>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {
                auctions.filter((a) => new Date(a.itemEndDate) > new Date())
                  .length
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Your Auctions</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {auctions.length}
            </p>
          </div>
        </div>

        {/* All Auctions Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Auctions</h2>
            <Link
              to="/auction"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
            >
              View More →
            </Link>
          </div>

          {auctions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-sm shadow-sm border">
              <p className="text-gray-500 text-lg">
                No auctions available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
              {auctions.slice(0, 3).map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </div>

        {/* Your Auctions Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Auctions</h2>
            <Link
              href="/auctions/my-auctions"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
            >
              View More →
            </Link>
          </div>

          {auctions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-sm shadow-sm border">
              <p className="text-gray-500 text-lg">
                You haven't created any auctions yet.
              </p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-sm hover:bg-blue-700 transition-colors">
                Create Your First Auction
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
              {auctions.slice(0, 3).map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
