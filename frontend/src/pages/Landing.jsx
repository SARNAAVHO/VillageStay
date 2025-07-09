import React, { useState } from "react";
import { Search } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Landing = () => {
  const [active, setActive] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [step, setStep] = useState("checkin");
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
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
    const selection = item.selection;
    setDates([selection]);

    if (step === "checkin" && !selection.endDate) {
      setStep("checkout");
    } else if (step === "checkout") {
      setShowCalendar(false);
    }
  };

  return (
    <section className="min-h-screen bg-inherit dark:bg-inherit dark:text-white flex flex-col items-center mt-10 px-4 relative">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 shadow-lg rounded-full pr-2 mb-10 w-full max-w-5xl border dark:border-none">
        {/* Where */}
        <div
          className={`flex-1 px-5 py-3 cursor-pointer transition-all rounded-full ${
            active === "where" ? "bg-white shadow-lg dark:bg-gray-700" : ""
          }`}
          onClick={() => handleClick("where")}
        >
          <h4 className="text-sm font-semibold">Where</h4>
          <p className="text-gray-500 text-sm dark:text-gray-400">Search destinations</p>
        </div>

        {/* Separator */}
        {!["where", "checkin"].includes(active) && (
          <div className="w-px h-8 bg-gray-300 mx-2" />
        )}

        {/* Check-in */}
        <div
          className={`flex-1 px-5 py-3 cursor-pointer transition-all rounded-full ${
            active === "checkin" ? "bg-white shadow-lg dark:bg-gray-700" : ""
          }`}
          onClick={() => handleClick("checkin")}
        >
          <h4 className="text-sm font-semibold">Check in</h4>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {dates[0].startDate ? dates[0].startDate.toLocaleDateString() : "Add dates"}
          </p>
        </div>

        {/* Separator */}
        {!["checkin", "checkout"].includes(active) && (
          <div className="w-px h-8 bg-gray-300 mx-2" />
        )}

        {/* Check-out */}
        <div
          className={`flex-1 px-5 py-3 cursor-pointer transition-all rounded-full ${
            active === "checkout" ? "bg-white shadow-lg dark:bg-gray-700" : ""
          }`}
          onClick={() => handleClick("checkout")}
        >
          <h4 className="text-sm font-semibold">Check out</h4>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {dates[0].endDate ? dates[0].endDate.toLocaleDateString() : "Add dates"}
          </p>
        </div>

        {/* Separator */}
        {!["checkout", "who"].includes(active) && (
          <div className="w-px h-8 bg-gray-300 mx-2" />
        )}

        {/* Who */}
        <div
          className={`flex-1 px-5 py-3 cursor-pointer transition-all rounded-full ${
            active === "who" ? "bg-white shadow-lg dark:bg-gray-700" : ""
          }`}
          onClick={() => handleClick("who")}
        >
          <h4 className="text-sm font-semibold">Who</h4>
          <p className="text-gray-500 text-sm dark:text-gray-400">Add guests</p>
        </div>

        {/* Search Button */}
        <button className="ml-6 bg-green-600 hover:bg-green-700 text-white px-5 py-4 rounded-full font-medium flex items-center gap-2">
          <Search className="h-5 w-5" />
          <span className="text-sm">Search</span>
        </button>
      </div>

      {/* Date Picker */}
      {showCalendar && (
        <div className="absolute top-[240px] z-50 bg-white rounded-xl shadow-xl">
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            months={2}
            direction="horizontal"
            minDate={new Date()}
            rangeColors={["#16a34a"]}
          />
        </div>
      )}

      {/* Hero Content */}
      <h2 className="text-4xl font-bold mb-4 text-center">Welcome to <span className="text-green-600">VillageStay</span></h2>
      <p className="text-lg mb-8 text-center">Experience peaceful and authentic village stays.</p>
    </section>
  );
};

export default Landing;
