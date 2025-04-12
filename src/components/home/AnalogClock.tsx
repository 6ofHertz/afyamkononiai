
import { useEffect, useState } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours + minutes / 60) * 30;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  return (
    <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center mx-auto">
      {/* Clock face */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-gray-800"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-21px) sm:translateY(-45px)`,
              top: "50%",
              left: "calc(50% - 0.5px)",
              transformOrigin: "bottom",
            }}
          />
        ))}

        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-primary rounded-full z-10"></div>

        {/* Hour hand */}
        <div
          className="absolute w-1.5 h-10 sm:h-16 bg-gray-800 rounded-full origin-bottom"
          style={{
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        ></div>

        {/* Minute hand */}
        <div
          className="absolute w-1 h-14 sm:h-20 bg-gray-600 rounded-full origin-bottom"
          style={{
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        ></div>

        {/* Second hand */}
        <div
          className="absolute w-0.5 h-16 sm:h-22 bg-primary rounded-full origin-bottom"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        ></div>
      </div>

      {/* Current time text */}
      <div className="absolute -bottom-8 left-0 right-0 text-center text-sm font-medium">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default AnalogClock;
