import { FaClock, FaArrowRight, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";
// import { AdsComponent } from "../AdsComponent";

export const Auction = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Live Auctions</h2>
          <Link
            to="/signup"
            className="text-gray-700 hover:text-gray-900 flex items-center"
          >
            View all <FaChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {/* Auction Item 1 */}
          <div className="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644725/miekytfqgwnlj4jqai5k.png"
                alt="Vintage Camera"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                <FaClock className="inline h-3 w-3 mr-1" />
                2h 15m
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                Vintage Film Camera - Excellent Condition
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-lg font-bold text-gray-900">$245.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Bids</p>
                  <p className="text-sm font-medium text-gray-700">12</p>
                </div>
              </div>
              <Link to='/signup'>
              <div className="w-full bg-indigo-900 hover:bg-indigo-800 text-white text-center py-2 px-4 rounded-sm font-medium transition-colors">
                Place Bid
              </div>
              </Link>
            </div>
          </div>

          {/* Auction Item 2 */}
          <div className="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644637/lk7l3ar3sptniptieyo3.png"
                alt="Antique Watch"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                <FaClock className="inline h-3 w-3 mr-1" />
                5h 42m
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                Luxury Swiss Watch - Gold Plated
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-lg font-bold text-gray-900">$1,250.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Bids</p>
                  <p className="text-sm font-medium text-gray-700">28</p>
                </div>
              </div>
              <Link to='/signup'>
              <div className="w-full bg-indigo-900 hover:bg-indigo-800 text-white text-center py-2 px-4 rounded-sm font-medium transition-colors">
                Place Bid
              </div>
              </Link>
            </div>
          </div>

          {/* Auction Item 3 */}
          <div className="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644675/tatznfsoekfp3vsoeswd.png"
                alt="Art Painting"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                <FaClock className="inline h-3 w-3 mr-1" />
                1d 3h
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                Original Oil Painting - Abstract Art
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-lg font-bold text-gray-900">$890.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Bids</p>
                  <p className="text-sm font-medium text-gray-700">7</p>
                </div>
              </div>
              <Link to='/signup'>
              <div className="w-full bg-indigo-900 hover:bg-indigo-800 text-white text-center py-2 px-4 rounded-sm font-medium transition-colors">
                Place Bid
              </div>
              </Link>
            </div>
          </div>
        </div>
        {/* <AdsComponent dataAdSlot="5537585913" /> */}
      </div>
    </section>
  );
};
