/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CountdownTimer = ({ endDate, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  function calculateTimeLeft() {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference, // total time left in ms
      };
    } else {
      timeLeft = { total: 0 }; // No time left
    }

    return timeLeft;
  }

  return (
    <div>
      {timeLeft.total > 0 ? (
        <span>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </span>
      ) : (
        <span>Auction Ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;
