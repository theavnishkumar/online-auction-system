import Product from "../models/product.model.js";

// Track users in auction rooms: { auctionId: Map<socketId, { userId, userName }> }
const auctionRooms = new Map();

export const registerAuctionHandlers = (io, socket) => {
  // Use verified identity from socket auth middleware
  const userId = socket.user.id;
  const userName = socket.user.name;

  // Join auction room
  socket.on("auction:join", ({ auctionId }) => {
    if (!auctionId) return;

    socket.join(auctionId);

    if (!auctionRooms.has(auctionId)) {
      auctionRooms.set(auctionId, new Map());
    }

    const room = auctionRooms.get(auctionId);
    room.set(socket.id, { userId, userName });

    // Broadcast to all users in room
    io.to(auctionId).emit("auction:userJoined", {
      userName,
      userId,
      activeUsers: getActiveUsers(auctionId),
    });

    console.log(`${userName} joined auction: ${auctionId}`);
  });

  // Leave auction room
  socket.on("auction:leave", ({ auctionId }) => {
    handleLeaveAuction(io, socket, auctionId);
  });

  // Place bid via socket — uses authenticated userId, not client-supplied
  socket.on("auction:bid", async ({ auctionId, bidAmount }) => {
    try {
      if (!auctionId || bidAmount == null) return;

      // Coerce to number to prevent string comparison bugs
      const amount = Number(bidAmount);
      if (isNaN(amount)) {
        socket.emit("auction:error", { message: "Invalid bid amount" });
        return;
      }

      // Atomic findOneAndUpdate to prevent race conditions
      const product = await Product.findById(auctionId);
      if (!product) {
        socket.emit("auction:error", { message: "Auction not found" });
        return;
      }

      if (new Date(product.itemEndDate) < new Date()) {
        socket.emit("auction:error", {
          message: "Auction has already ended",
        });
        return;
      }

      // Prevent seller from bidding on own auction
      if (product.seller.toString() === userId) {
        socket.emit("auction:error", {
          message: "You cannot bid on your own auction",
        });
        return;
      }

      const minBid = Math.max(product.currentPrice, product.startingPrice) + 1;
      const maxBid = Math.max(product.currentPrice, product.startingPrice) + 10;

      if (amount < minBid) {
        socket.emit("auction:error", {
          message: `Bid must be at least Rs ${minBid}`,
        });
        return;
      }

      if (amount > maxBid) {
        socket.emit("auction:error", {
          message: `Bid must be at max Rs ${maxBid}`,
        });
        return;
      }

      // Use findOneAndUpdate with price condition to prevent race conditions
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: auctionId,
          currentPrice: product.currentPrice, // Only update if price hasn't changed
          itemEndDate: { $gt: new Date() },
        },
        {
          $set: { currentPrice: amount },
          $push: {
            bids: {
              bidder: userId,
              bidAmount: amount,
            },
          },
        },
        { new: true },
      )
        .populate("seller", "name")
        .populate("bids.bidder", "name");

      if (!updatedProduct) {
        socket.emit("auction:error", {
          message: "Bid failed — price changed. Please try again.",
        });
        return;
      }

      updatedProduct.bids.sort(
        (a, b) => new Date(b.bidTime) - new Date(a.bidTime),
      );

      // Broadcast updated auction data to all users in the room
      io.to(auctionId).emit("auction:bidPlaced", {
        auction: updatedProduct,
        bidderName: userName,
        bidAmount: amount,
        message: `${userName} placed a bid of Rs ${amount}`,
      });
    } catch (error) {
      console.error("Socket bid error:", error.message);
      socket.emit("auction:error", {
        message: "Error placing bid",
      });
    }
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    cleanupSocket(io, socket);
  });
};

const handleLeaveAuction = (io, socket, auctionId) => {
  if (!auctionId || !auctionRooms.has(auctionId)) return;

  const room = auctionRooms.get(auctionId);
  const userData = room.get(socket.id);

  if (userData) {
    room.delete(socket.id);

    // Remove empty rooms
    if (room.size === 0) {
      auctionRooms.delete(auctionId);
    }

    socket.leave(auctionId);

    io.to(auctionId).emit("auction:userLeft", {
      userName: userData.userName,
      userId: userData.userId,
      activeUsers: getActiveUsers(auctionId),
    });

    console.log(`${userData.userName} left auction: ${auctionId}`);
  }
};

const cleanupSocket = (io, socket) => {
  for (const [auctionId, room] of auctionRooms.entries()) {
    if (room.has(socket.id)) {
      handleLeaveAuction(io, socket, auctionId);
    }
  }
};

const getActiveUsers = (auctionId) => {
  const room = auctionRooms.get(auctionId);
  if (!room) return [];

  const users = [];
  const seen = new Set();

  for (const { userId, userName } of room.values()) {
    if (!seen.has(userId)) {
      seen.add(userId);
      users.push({ userId, userName });
    }
  }

  return users;
};
