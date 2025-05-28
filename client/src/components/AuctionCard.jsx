import { Link } from "react-router";

export default function AuctionCard({ auction }) {
  const daysLeft = Math.ceil(auction.timeLeft / (1000 * 60 * 60 * 24));
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img
          src={auction.itemPhoto || "https://picsum.photos/300"}
          alt={auction.itemName}
          className="object-contain aspect-[4/3] w-96"
        />
        <div className="absolute top-2 right-2 bg-blue-200 px-2 py-1 rounded-md text-xs font-medium">
          {auction.itemCategory}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">
          {auction.itemName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {auction.itemDescription}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Current Price:</span>
            <span className="font-semibold text-lg text-green-600">
              ${auction.currentPrice || auction.startingPrice}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Bids:</span>
            <span className="text-sm font-medium">{auction.bidsCount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Time Left:</span>
            <span className="text-sm font-medium text-red-600">
              {daysLeft > 0 ? `${daysLeft} days` : "Ended"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-500 mb-3">
            Seller: {auction?.sellerName || auction?.seller?.name}
          </p>
          <Link to={`/auction/${auction._id}`}>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
