import React from "react";
import { FaClock, FaGavel, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaGavel className="text-xl text-indigo-600" />,
    bg: "bg-indigo-50",
    title: "Easy Bidding",
    desc: "Place bids with confidence using our intuitive interface. Track your bids and get real-time updates.",
  },
  {
    icon: <FaShieldAlt className="text-xl text-emerald-600" />,
    bg: "bg-emerald-50",
    title: "Secure & Trusted",
    desc: "Your transactions are protected with industry-standard security. Buy and sell with peace of mind.",
  },
  {
    icon: <FaClock className="text-xl text-amber-600" />,
    bg: "bg-amber-50",
    title: "24/7 Auctions",
    desc: "Never miss an opportunity. Our platform runs around the clock so you can bid whenever you want.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Why us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Buyers & Sellers
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Everything you need for a seamless auction experience, all in one
            place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative bg-white rounded-2xl border border-gray-200/80 p-7 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all group"
            >
              <div
                className={`${f.bg} w-11 h-11 rounded-xl flex items-center justify-center mb-5`}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
