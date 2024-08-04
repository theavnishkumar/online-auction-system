const Card = () => {
  return (
    <div className="lg:max-w-4xl lg:flex lg:items-center lg:max-h-96 max-w-sm sm:max-w-md p-2 gap-2 mx-auto max-lg:space-y-2">
      {/* Card Image */}
      <div className="lg:w-2/5 h-2/5">
        <img
          src="https://images.nobroker.in/images/8a9f92838c14fea9018c164ceec204bc/8a9f92838c14fea9018c164ceec204bc_88172_940514_medium.jpg"
          alt="Picture of the author"
          className="rounded-lg w-full h-full object-cover object-center hover:scale-105 transition-all ease-out duration-300"
        />
      </div>
      <div className="lg:w-3/5 h-3/5 lg:px-4 px-2 space-y-2 relative">
        <div className="text-xl font-bold text-gray-900">
          2BHK Flat on Auction
        </div>
        <span className="text-gray-600 font-normal -mt-4">by Avnish Kumar</span>
        <div className="text-gray-600 font-normal -mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, minus
          repudiandae ipsa consequatur similique, incidunt suscipit possimus
          veritatis temporibus necessitatibus consectetur magnam doloremque,
          tempore odio!
        </div>
        <div>
          <div className="text-gray-900 font-semibold">
            Current Bid: <span className="text-green-600">$2000</span>
          </div>
          <div className="text-gray-600 font-normal">
            Ends in <span className="text-red-600">3 days</span>
          </div>
        </div>
        {/* Card Buttons */}
        <div className="absolute bottom-2 right-3">
          <button
            href="#_"
            className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Bid Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
