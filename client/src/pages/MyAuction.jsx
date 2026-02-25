import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuctionCard from "../components/AuctionCard";
import LoadingScreen from "../components/LoadingScreen";
import { useGetMyAuctions } from "../hooks/useAuction";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const MyAuction = () => {
  useDocumentTitle("My Auctions");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyAuctions(page);

  if (isLoading) return <LoadingScreen />;

  const rawData = data || {};
  const auctions = Array.isArray(rawData) ? rawData : rawData.auctions || [];
  const pagination = Array.isArray(rawData) ? {} : rawData.pagination || {};

  const categories = [
    "all",
    ...new Set(auctions?.map((auction) => auction.itemCategory)),
  ];
  const filteredAuctions =
    filter === "all"
      ? auctions
      : auctions?.filter((auction) => auction.itemCategory === filter);

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition mb-6 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Auctions</h1>
            <p className="text-sm text-gray-400 mt-1">
              {pagination.total || 0} listing
              {(pagination.total || 0) !== 1 && "s"}
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-[0.97] transition-all shadow-sm shadow-indigo-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Auction
          </Link>
        </div>

        {/* Filters */}
        {categories.length > 1 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {filteredAuctions.length > 0 && (
          <p className="text-sm text-gray-400 mb-5">
            {filter === "all" ? "All listings" : filter}
            <span className="ml-1 text-gray-300">
              ({filteredAuctions.length})
            </span>
          </p>
        )}

        {filteredAuctions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
            <svg
              className="w-12 h-12 text-gray-200 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400 mb-4">
              {filter === "all"
                ? "You haven't created any auctions yet"
                : "No auctions in this category"}
            </p>
            {filter === "all" && (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
              >
                Create your first auction
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
                    p === page
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={page === pagination.totalPages}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
