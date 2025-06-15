import { useRef, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { placeBid, viewAuction } from "../api/auction.js";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useSocket } from "../hooks/useSocket.js";
export const ViewAuction = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const socket = useSocket();

  const { data, isLoading } = useQuery({
    queryKey: ["viewAuctions", id],
    queryFn: () => viewAuction(id),
    staleTime: 30 * 1000,
    placeholderData: () => undefined,
  });

  useEffect(() => {
    if (!socket || !id) return;

    // Join the auction room
    socket.emit('joinAuction', id);

    // Listen for new bids
    const handleNewBid = (bidData) => {
      // Update the cache with new bid data
      queryClient.setQueryData(["viewAuctions", id], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          currentPrice: bidData.bidAmount,
          bids: [bidData, ...oldData.bids] // Add new bid to the beginning
        };
      });

      // Clear input if this user placed the bid
      if (bidData.bidder._id === user.user._id && inputRef.current) {
        inputRef.current.value = "";
      }
    };

    // Listen for auction updates (price, bid limits, etc.)
    const handleAuctionUpdate = (updateData) => {
      queryClient.setQueryData(["viewAuctions", id], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          currentPrice: updateData.currentPrice,
          totalBids: updateData.totalBids
        };
      });
    };

    // Listen for auction end
    const handleAuctionEnd = (auctionData) => {
      queryClient.setQueryData(["viewAuctions", id], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          itemEndDate: auctionData.endDate,
          winner: auctionData.winner
        };
      });
    };

    socket.on('newBid', handleNewBid);
    socket.on('auctionUpdate', handleAuctionUpdate);
    socket.on('auctionEnded', handleAuctionEnd);

    // Cleanup
    return () => {
      socket.off('newBid', handleNewBid);
      socket.off('auctionUpdate', handleAuctionUpdate);
      socket.off('auctionEnded', handleAuctionEnd);
      socket.emit('leaveAuction', id);
    };
  }, [socket, id, queryClient, user.user._id]);

  const placeBidMutate = useMutation({
    mutationFn: ({ bidAmount, id }) => placeBid({ bidAmount, id }),
    onSuccess: () => {      
      if (socket) {
        socket.emit('placeBid', {
          auctionId: id,
          bidAmount: response.bidAmount,
          bidder: {
            _id: user.user._id,
            name: user.user.name
          },
          bidTime: new Date().toISOString()
        });
      }
      if (inputRef.current) inputRef.current.value = "";
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  if (isLoading) return <LoadingScreen />;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    let bidAmount = e.target.bidAmount.value.trim();
    placeBidMutate.mutate({ bidAmount, id });
  };

  const daysLeft = Math.ceil(
    Math.max(0, new Date(data.itemEndDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isActive = Math.max(0, new Date(data.itemEndDate) - new Date()) > 0;

  return (
    <div className="min-h-screen bg-gray-50 mx-auto container">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4 grid grid-cols-1 place-items-center content-start">
            <div className="max-w-xl aspect-square bg-white rounded-md shadow-md border border-gray-200 overflow-hidden flex items-center justify-center">
              <img
                src={data.itemPhoto || "https://picsum.photos/601"}
                alt={data.itemName}
                className="h-full w-full object-fill"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">
                  {data.itemCategory}
                </span>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isActive ? "Active" : "Ended"}
                </span>
                {/* Live indicator */}
                {isActive && (
                  <span className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {data.itemName}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {data.itemDescription}
              </p>
            </div>

            {/* Pricing Info */}
            <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Starting Price</p>
                  <p className="text-lg font-semibold text-gray-900">
                    $ {data.startingPrice}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="text-2xl font-bold text-green-600 transition-all duration-300">
                    $ {data.currentPrice}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Bids</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.bids.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Left</p>
                  <p
                    className={`text-lg font-semibold ${
                      isActive ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {isActive ? `${daysLeft} days` : "Ended"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bid Form */}
            {data.seller._id != user.user._id && isActive && (
              <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Place Your Bid</h3>
                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="bidAmount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bid Amount (minimum: $ {data.currentPrice + 1} maximum: $ {data.currentPrice + 10})
                    </label>
                    <input
                      type="number"
                      name="bidAmount"
                      id="bidAmount"
                      ref={inputRef}
                      min={data.currentPrice + 1}
                      max={data.currentPrice + 10}
                      step="1"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your bid amount"
                      required
                      disabled={placeBidMutate.isPending}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={placeBidMutate.isPending}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colo$ font-medium disabled:opacity-50 disabled:cu$or-not-allowed"
                  >
                    {placeBidMutate.isPending ? "Placing Bid..." : "Place Bid"}
                  </button>
                </form>
              </div>
            )}

            {/* Seller Info */}
            <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
              <p className="text-gray-900 font-medium">{data.seller.name}</p>
            </div>
          </div>
        </div>

        {/* Bid History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Bid History
            {isActive && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Updates in real-time)
              </span>
            )}
          </h2>
          <div className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden">
            {data.bids.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No bids yet. Be the fi$t to bid!
              </div>
            ) : (
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {data.bids.map((bid, index) => (
                  <div
                    key={`${bid.bidder?._id}-${bid.bidTime}-${index}`}
                    className={`p-4 flex justify-between items-center transition-all duration-500 ${
                      index === 0 ? 'bg-green-50 border-l-4 border-green-500' : ''
                    }`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {bid.bidder?.name}
                        {bid.bidder?._id === user.user._id && (
                          <span className="text-blue-600 text-sm ml-1">(You)</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(bid.bidTime).toLocaleDateString()} at{" "}
                        {new Date(bid.bidTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">
                        $ {bid.bidAmount}
                      </p>
                      {index === 0 && (
                        <p className="text-xs text-green-600 font-medium">
                          Highest Bid
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
