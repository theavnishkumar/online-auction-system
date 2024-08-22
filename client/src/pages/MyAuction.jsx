import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndProducts } from "../store/auction/auctionSlice";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import UserProfile from "../components/UserProfile";
import { useParams } from "react-router-dom";

const MyAuction = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userData, userProducts, loading, error } = useSelector(
    (state) => state.auctions
  );

  useEffect(() => {
    dispatch(fetchUserAndProducts(userId));
  }, [dispatch, userId]);

  if (loading)
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100svh-9rem)] px-4 py-4 md:flex">
      <UserProfile name={userData?.name} bids={"6"} />
      <div>
        {userProducts && userProducts.length > 0 ? (
          userProducts.map((auction) => (
            <Card
              key={auction._id}
              auction_id={auction._id}
              itemName={auction.itemName}
              itemDescription={auction.itemDescription}
              itemPrice={auction.itemPrice}
              itemPostDate={auction.createdAt}
              itemStartDate={auction.itemStartDate}
              itemEndDate={auction.itemEndDate}
              itemPhoto={auction.itemPhoto}
              sellerName={auction.seller.name}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-100 rounded-lg shadow-md my-2 max-w-md max-md:mx-auto">
            <svg
              className="w-12 h-12  text-gray-700"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="File_Off">
                <g>
                  <path d="M4,3.308a.5.5,0,0,0-.7.71l.76.76v14.67a2.5,2.5,0,0,0,2.5,2.5H17.44a2.476,2.476,0,0,0,2.28-1.51l.28.28c.45.45,1.16-.26.7-.71Zm14.92,16.33a1.492,1.492,0,0,1-1.48,1.31H6.56a1.5,1.5,0,0,1-1.5-1.5V5.778Z"></path>
                  <path d="M13.38,3.088v2.92a2.5,2.5,0,0,0,2.5,2.5h3.07l-.01,6.7a.5.5,0,0,0,1,0V8.538a2.057,2.057,0,0,0-.75-1.47c-1.3-1.26-2.59-2.53-3.89-3.8a3.924,3.924,0,0,0-1.41-1.13,6.523,6.523,0,0,0-1.71-.06H6.81a.5.5,0,0,0,0,1Zm4.83,4.42H15.88a1.5,1.5,0,0,1-1.5-1.5V3.768Z"></path>
                </g>
              </g>
            </svg>
            <h3 className="text-xl font-medium mt-4 text-gray-700 ">
              Product not found
            </h3>
            <p className="text-gray-500  mt-2">
              {/* The Product you are looking for could not be found.
              <br /> */}
              {userData?.name} has not listed any products yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAuction;
