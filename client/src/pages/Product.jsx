import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuctionById } from "../store/auction/auctionSlice";
import Skeleton from "../components/Skeleton";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import CountdownTimer from "../components/CountdownTimer";
const VITE_API = import.meta.env.VITE_API;

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [bid, setBid] = useState("");
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [errorLine, setErrorLine] = useState("");
  const { auctionById, loading, error } = useSelector(
    (state) => state.auctions
  );
  const { user } = useSelector((state) => state.auth);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleTimeUp = () => {
    setIsDisabled(true);
  };

  const handleBid = async (e) => {
    e.preventDefault();
    setLoadingAnimation(true);
    try {
      if (bid <= auctionById.itemPrice) {
        setErrorLine(`Enter bid greater than`);
        setLoadingAnimation(false);
        return;
      }
      setErrorLine("");

      await axios.post(`${VITE_API}/api/auction/${productId}`, {
        bid,
        bidder: user.userId,
      });
      setBid("");

      dispatch(fetchAuctionById(productId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAnimation(false);
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchAuctionById(productId));
    }
  }, [dispatch, productId]);

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
    <section className="bg-white py-4 antialiased  md:py-8">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            {auctionById.itemName || "Product Name"}
          </h2>
          <div className="my-8 xl:mb-10 xl:mt-12 w-3/5 bg-red-200 mx-auto">
            <img className="w-full" src={auctionById.itemPhoto} alt="" />
          </div>
          <div className="mx-auto max-w-2xl space-y-2">
            <p className="text-base font-semibold text-gray-900">
              Product Description:
            </p>
            <p className="text-base font-normal text-gray-500 ">
              {auctionById.itemDescription || "Product Description"}
            </p>

            <div className="mx-auto max-w-2xl space-y-2">
              <p className="text-base font-semibold text-gray-900">Price:</p>
              <p className="text-base font-normal text-gray-500">
                {auctionById.itemPrice || "Product Price"}
              </p>

              <p className="text-base font-semibold text-gray-900">
                Auction Start Date:
              </p>
              <p className="text-base font-normal text-gray-500">
                {auctionById.itemStartDate || "Start Date"}
              </p>

              <p className="text-base font-semibold text-gray-900">
                Auction End Date:
              </p>
              <p className="text-base font-normal text-gray-500">
                {auctionById.itemEndDate || "End Date"}
              </p>

              <p className="text-base font-semibold text-gray-900">
                Time Left:
              </p>
              <div className="text-base font-normal text-red-500">
                <CountdownTimer
                  endDate={auctionById.itemEndDate}
                  onTimeUp={handleTimeUp}
                />
              </div>
            </div>

            {/* <p className="text-base font-semibold text-gray-900 ">
              Key Features and Benefits:
            </p>
            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 ">
              <li>
                <span className="font-semibold text-gray-900 ">
                  {" "}
                  Brilliant 4.5K Retina display:{" "}
                </span>
                see the big picture and all the detailsSee it all in sharp,
                glorious detail on the immersive 24-inch 4.5K Retina display.
                The P3 wide color gamut brings what you&apos;re watching to life
                in over a billion colors. Images shine with a brilliant 500 nits
                of brightness. Industry-leading anti-reflective coating delivers
                greater comfort and readability. And True Tone technology
                automatically adjusts the color temperature of your display to
                the ambient light of your environment, for a more natural
                viewing experience. So whether you&apos;re editing photos,
                working on presentations, or watching your favorite shows and
                movies, everything looks incredible on iMac.
              </li>
              <li>
                <span className="font-semibold text-gray-900 ">
                  {" "}
                  1080p FaceTime HD camera:{" "}
                </span>
                ready for your close-upIt&apos;s the best camera system ever in
                a Mac. Double the resolution for higher-quality video calls. A
                larger sensor that captures more light. And the advanced image
                signal processor (ISP) of M1 greatly improves image quality. So
                from collaborating with coworkers to catching up with friends
                and family, you&apos;ll always look your best.
              </li>

              <li>
                <span className="font-semibold text-gray-900 ">
                  {" "}
                  Studio-quality mics for high-quality conversations:{" "}
                </span>
                whether you&apos;re on a video call with a friend, cutting a
                track, or recording a podcast, the microphones on iMac make sure
                you come through loud, crisp, and clear. The studio-quality
                three-mic array is designed to reduce feedback, so conversations
                flow more naturally and you interrupt each other less. And
                beamforming technology helps the mics ignore background noise.
                Which means everyone hears you - not what&apos;s going on around
                you.
              </li>

              <li>
                <span className="font-semibold text-gray-900 ">
                  {" "}
                  Six-speaker sound system: audio that really fills a room:{" "}
                </span>
                the sound system on iMac brings incredible, room-filling audio
                to any space. Two pairs of force-canceling woofers create rich,
                deep bass without unwanted vibrations. And each pair is balanced
                with a high-performance tweeter. The result is a massive,
                detailed soundstage that takes your movies, music, and more to
                the next level.
              </li>

              <li>
                <span className="font-semibold text-gray-900 ">
                  {" "}
                  M1 chip: with great power comes great capability:{" "}
                </span>
                M1 is the most powerful chip Apple has ever made. macOS Big Sur
                is an advanced desktop operating system. Combined, they take
                iMac to entirely new levels of performance, efficiency, and
                security. iMac wakes from sleep almost instantly, apps launch in
                a flash, and the whole system feels fluid, smooth, and snappy.
                With up to 85 percent faster CPU performance and up to two times
                faster graphics performance than standard 21.5-inch iMac models,
                you can use apps like Xcode and Affinity Photo to compile code
                in a fraction of the time or edit photos in real time. And it
                runs cool and quiet even while tackling these intense workloads.
                That&apos;s the power of hardware, software, and silicon - all
                designed together.
              </li>
            </ul> */}
          </div>
          <div className="mx-auto mb-6 max-w-3xl space-y-6 md:mb-12">
            <form onSubmit={handleBid}>
              <label
                htmlFor="helper-text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your price
              </label>
              <input
                type="number"
                aria-describedby="bid price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
                placeholder="Enter your price"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                disabled={isDisabled}
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700"
                disabled={loadingAnimation || isDisabled}
              >
                {loadingAnimation ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Bid"
                )}
              </button>
              {errorLine && (
                <p className="text-base font-normal text-red-500 ">
                  {errorLine} {auctionById.itemPrice}
                </p>
              )}
            </form>
            <p className="text-base font-semibold text-gray-900 ">
              Bidder History:
            </p>

            <div className="relative overflow-x-auto">
              {auctionById && auctionById.bids ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Bidder Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctionById.bids.map((bid, index) => (
                      <tr className="bg-white border-b" key={index}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {bid.bidder.name}
                        </td>
                        <td className="px-6 py-4">{bid.bid}</td>
                        <td className="px-6 py-4">{bid.time.slice(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            {/* <p className="text-base font-normal text-gray-500 ">
              A-Grade/CR: iMacs are in 9/10 Cosmetic Condition and are 100%
              Fully Functional. iMacs will be shipped in generic packaging and
              will contain generic accessories. 90 Days Seller Warranty
              Included. iMacs may show signs of wear like scratches, scuffs and
              minor dents.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
