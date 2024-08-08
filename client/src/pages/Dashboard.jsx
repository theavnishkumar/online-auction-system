import Card from "../components/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctions } from "../store/auction/auctionSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { auctions, loading, error } = useSelector((state) => state.auctions);

  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

  if (loading || auctions.length === 0) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );

  // const user = useSelector((state) => state.auth.user);
  return (
    <div className="min-h-[calc(100svh-9rem)] px-4 py-4 w-full">
      {/* Hi, {user.name}
      <br />
      your email is : {user.email} */}

      {auctions.auctions.map((auction) => (
        <Card
          key={auction._id}
          itemName={auction.itemName}
          itemDescription={auction.itemDescription}
          itemPrice={auction.itemPrice}
          itemPostDate={auction.createdAt}
          itemStartDate={auction.itemStartDate}
          itemEndDate={auction.itemEndDate}
          itemPhoto={auction.itemPhoto}
        />
      ))}
    </div>
  );
};

export default Dashboard;
