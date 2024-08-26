import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

/* eslint-disable react/prop-types */
const Card = ({
  auction_id,
  item_id,
  itemName,
  itemDescription,
  itemPostDate,
  itemStartDate,
  itemPrice,
  itemEndDate,
  itemPhoto,
  // itemCategory,
  sellerName,
}) => {
  const handleTimeUp = () => {};

  return (
    <div className="lg:max-w-4xl lg:flex lg:items-center lg:max-h-96 max-w-sm sm:max-w-md p-2 gap-2 mx-auto max-lg:space-y-2">
      {/* Card Image */}
      <div className="lg:w-2/5 h-2/5">
        <img
          src={
            itemPhoto ||
            "https://images.nobroker.in/images/8a9f92838c14fea9018c164ceec204bc/8a9f92838c14fea9018c164ceec204bc_88172_940514_medium.jpg"
          }
          alt="Picture of the author"
          className="rounded-lg w-full aspect-[3/2] object-cover object-center hover:scale-105 transition-all ease-out duration-300"
        />
      </div>
      <div className="lg:w-3/5 h-3/5 lg:px-4 px-2 space-y-2 relative">
        <div className="text-xl font-bold text-gray-900">
          {itemName || "Card Title"}
        </div>
        <span className="text-gray-600 font-normal -mt-4">
          by{" "}
          {item_id && item_id.length > 0 ? (
            <Link to={`/auction/user/${item_id}`} className="text-blue-700">
              {sellerName}
            </Link>
          ) : (
            sellerName
          )}
          &nbsp;on&nbsp;{itemPostDate.slice(0, 10) || "Post date"}
        </span>
        <div className="text-gray-600 font-normal -mt-2">
          {itemDescription.slice(0, 196) || "Card Description"}...
        </div>
        <div>
          <div className="text-gray-900 font-semibold">
            Current Bid:{" "}
            <span className="text-green-600">{itemPrice || "Price"}</span>
          </div>
          <div className="text-gray-600 font-normal">
            Started on{" "}
            <span className="text-red-600">
              {itemStartDate.slice(0, 10) || "End date"}
            </span>
          </div>
          <div className="text-gray-600 font-normal">
            Ends on{" "}
            <span className="text-red-600">
              {itemEndDate.slice(0, 10) || "End date"}
            </span>
          </div>
          <div className="text-base font-normal text-red-500 flex">
            <span className="text-gray-600 font-normal">Time Left :</span>&nbsp;
            <CountdownTimer endDate={itemEndDate} onTimeUp={handleTimeUp} />
          </div>
        </div>
        {/* Card Buttons */}
        <div className="absolute bottom-2 right-3">
          <Link to={`/auction/${auction_id}`}>
            <button className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 ">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">View</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
