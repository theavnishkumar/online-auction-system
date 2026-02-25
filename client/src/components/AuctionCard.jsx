import { Link } from "react-router";
import { usePrefetchHandlers } from "../hooks/useAuction.js";

export default function AuctionCard({ auction }) {
  const daysLeft = Math.ceil(auction.timeLeft / (1000 * 60 * 60 * 24));
  const isActive = daysLeft > 0;
  const { prefetchAuction } = usePrefetchHandlers();

  return (
    <Link
      to={`/auction/${auction._id}`}
      viewTransition
      onMouseEnter={() => prefetchAuction(auction._id)}
      className="group block w-full bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={auction.itemPhoto || "https://picsum.photos/300"}
          alt={auction.itemName}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[11px] font-medium text-indigo-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
            {auction.itemCategory}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm ${
              isActive
                ? "bg-emerald-500/90 text-white"
                : "bg-gray-700/80 text-white"
            }`}
          >
            {isActive ? `${daysLeft}d left` : "Ended"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-semibold text-sm text-gray-900 mb-0.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {auction.itemName}
        </h3>
        <p className="text-gray-400 text-[11px] mb-3 line-clamp-1 leading-relaxed">
          {auction.itemDescription}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Current Bid
            </p>
            <p className="text-lg font-bold text-gray-900 tabular-nums">
              Rs {auction.currentPrice || auction.startingPrice}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {auction.bidsCount} bids
            </span>
          </div>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-400">
            by {auction?.sellerName || auction?.seller?.name}
          </p>
          <span className="text-[11px] font-medium text-indigo-500 group-hover:text-indigo-600 transition-colors">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
