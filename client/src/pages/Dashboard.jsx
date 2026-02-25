import AuctionCard from "../components/AuctionCard.jsx";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useDashboardStats } from "../hooks/useAuction.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

const statConfig = [
  {
    key: "totalAuctions",
    label: "Total Auctions",
    color: "text-gray-900",
    bg: "bg-white",
    icon: (
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    key: "activeAuctions",
    label: "Active Now",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    key: "userAuctionCount",
    label: "Your Listings",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

const Dashboard = () => {
  useDocumentTitle("Dashboard");
  const { data, isLoading } = useDashboardStats();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Overview of marketplace activity
            </p>
          </div>
          <Link
            to="/create"
            className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-[0.97] transition-all shadow-sm shadow-indigo-200"
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {statConfig.map((stat) => (
            <div
              key={stat.key}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex items-center gap-4"
            >
              <div className={`${stat.bg} p-3 rounded-xl`}>{stat.icon}</div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p
                  className={`text-2xl font-bold ${stat.color} tabular-nums mt-0.5`}
                >
                  {data[stat.key]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* All Auctions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Latest Auctions
            </h2>
            <Link
              to="/auction"
              className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition"
            >
              View all &rarr;
            </Link>
          </div>

          {data.latestAuctions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
              <p className="text-gray-400">No auctions available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.latestAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </section>

        {/* Your Auctions */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Auctions
            </h2>
            <Link
              to="/myauction"
              className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition"
            >
              View all &rarr;
            </Link>
          </div>

          {data.latestUserAuctions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
              <p className="text-gray-400 mb-4">
                You haven&apos;t listed anything yet.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
              >
                Create your first auction
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.latestUserAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </section>

        {/* Mobile FAB */}
        <Link
          to="/create"
          className="sm:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all z-50"
        >
          <svg
            className="w-6 h-6"
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
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
