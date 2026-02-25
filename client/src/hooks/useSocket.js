import { useEffect, useState, useRef } from "react";
import { connectSocket } from "../config/socket.js";
import toast from "react-hot-toast";

export const useSocket = (auctionId) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [liveAuction, setLiveAuction] = useState(null);
  const [socketError, setSocketError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const joinedRef = useRef(false);

  useEffect(() => {
    if (!auctionId) return;

    const socket = connectSocket();

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      if (!joinedRef.current) {
        socket.emit("auction:join", { auctionId });
        joinedRef.current = true;
      }
    };

    const handleUserJoined = ({ userName, activeUsers: users }) => {
      console.log("User joined:", userName, "Active users:", users);
      setActiveUsers(users || []);
      if (userName) {
        toast(`${userName} joined the auction`, { icon: "\uD83D\uDC4B" });
      }
    };

    const handleUserLeft = ({ userName, activeUsers: users }) => {
      setActiveUsers(users || []);
      if (userName) {
        toast(`${userName} left the auction`, { icon: "\uD83D\uDEAA" });
      }
    };

    const handleBidPlaced = ({ auction, bidderName, bidAmount }) => {
      console.log("Bid placed via socket:", bidderName, bidAmount);
      setLiveAuction(auction);
      if (bidderName) {
        toast.success(`${bidderName} placed a bid of Rs ${bidAmount}`);
      }
    };

    const handleError = ({ message }) => {
      setSocketError(message);
      toast.error(message);
      setTimeout(() => setSocketError(null), 5000);
    };

    const handleDisconnect = (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      joinedRef.current = false;
    };

    const handleConnectError = (err) => {
      console.error("Socket connect_error:", err.message);
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("auction:userJoined", handleUserJoined);
    socket.on("auction:userLeft", handleUserLeft);
    socket.on("auction:bidPlaced", handleBidPlaced);
    socket.on("auction:error", handleError);
    socket.on("disconnect", handleDisconnect);

    // If already connected (singleton reuse), join immediately
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      if (socket.connected) {
        socket.emit("auction:leave", { auctionId });
      }
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("auction:userJoined", handleUserJoined);
      socket.off("auction:userLeft", handleUserLeft);
      socket.off("auction:bidPlaced", handleBidPlaced);
      socket.off("auction:error", handleError);
      socket.off("disconnect", handleDisconnect);
      joinedRef.current = false;
    };
  }, [auctionId]);

  return { activeUsers, liveAuction, socketError, isConnected };
};
