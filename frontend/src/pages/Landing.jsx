// Landing.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Landing() {
  const [active, setActive] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [step, setStep] = useState("checkin");
  const [dates, setDates] = useState([
    { startDate: null, endDate: null, key: "selection" },
  ]);

  const handleClick = (section) => {
    setActive(section);

    if (section === "checkin" || section === "checkout") {
      setShowCalendar(true);
      setStep(section);
    } else {
      setShowCalendar(false);
    }
  };

  const handleDateChange = (item) => {
    const sel = item.selection;
    setDates([sel]);
    if (step === "checkin" && !sel.endDate) setStep("checkout");
    else if (step === "checkout") setShowCalendar(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
      {/* 🌄 Hero background */}
      <img
        src="https://source.unsplash.com/1600x900/?indian,village,sunrise"
        alt="Village landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 dark:from-black/60" />

      {/* 🏷️ Headline */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Discover Rural Gems
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-100">
          Book authentic village stays directly from local hosts.
        </p>
      </div>

      {/* 🔍 Search bar */}
      <div className="relative z-10 mt-10 w-full max-w-5xl px-4">
        <div className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-xl ring-1 ring-black/10 dark:ring-white/10">
          {/* Where */}
          <button
            onClick={() => handleClick("where")}
            className={`flex-1 px-6 py-4 text-left rounded-full ${
              active === "where" &&
              "bg-gray-200 dark:bg-gray-700 shadow-inner ring-2 ring-green-500/60"
            }`}
          >
            <h4 className="text-xs font-semibold uppercase">Where</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Search destinations
            </span>
          </button>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Check‑in */}
          <button
            onClick={() => handleClick("checkin")}
            className={`flex-1 px-6 py-4 text-left rounded-full ${
              active === "checkin" &&
              "bg-gray-200 dark:bg-gray-700 shadow-inner ring-2 ring-green-500/60"
            }`}
          >
            <h4 className="text-xs font-semibold uppercase">Check‑in</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {dates[0].startDate
                ? dates[0].startDate.toLocaleDateString()
                : "Add dates"}
            </span>
          </button>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Check‑out */}
          <button
            onClick={() => handleClick("checkout")}
            className={`flex-1 px-6 py-4 text-left rounded-full ${
              active === "checkout" &&
              "bg-gray-200 dark:bg-gray-700 shadow-inner ring-2 ring-green-500/60"
            }`}
          >
            <h4 className="text-xs font-semibold uppercase">Check‑out</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {dates[0].endDate
                ? dates[0].endDate.toLocaleDateString()
                : "Add dates"}
            </span>
          </button>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Guests */}
          <button
            onClick={() => handleClick("who")}
            className={`flex-1 px-6 py-4 text-left rounded-full ${
              active === "who" &&
              "bg-gray-200 dark:bg-gray-700 shadow-inner ring-2 ring-green-500/60"
            }`}
          >
            <h4 className="text-xs font-semibold uppercase">Guests</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Add guests
            </span>
          </button>

          {/* Search button */}
          <button className="mx-3 my-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <button className="ml-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* 📅 Date picker */}
      {showCalendar && (
        <div className="absolute top-[70%] lg:top-[65%] z-20">
          <DateRange
            editableDateInputs
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            months={2}
            direction="horizontal"
            minDate={new Date()}
            rangeColors={["#16a34a"]}
            className="shadow-xl rounded-xl"
          />
        </div>
      )}

      <h2 className="text-4xl font-bold mb-4 text-center">Welcome to VillageStay</h2>
      <p className="text-lg mb-8 text-center">Experience peaceful and authentic village stays.</p>
    </section>
  );
}

export default Landing;
