import { useState } from "react";
import SearchIcon from "./assets/search.svg";
import ExchangeIcon from "./assets/exchange.svg";
import FlightCard from "./components/flightCard.tsx";
import { fetchFlights } from "./api/searchFlights.ts";

function App() {
  const [sortBy, setSortBy] = useState("best");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("one_way"); // Default trip type
  const [classType, setClassType] = useState("economy");
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState(""); //unused

  const fetchSortedFlights = async (sortType) => {
    if (!originCity || !destinationCity || !date) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setSortBy(sortType);

    try {
      // Use the same fetchFlights function that's used in form submission
      await fetchFlights(
        originCity,
        destinationCity,
        date,
        classType,
        sortType,
        setFlights,
      );
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(originCity, destinationCity, date, classType, sortBy);

    if (!originCity || !destinationCity || !date) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true); // Start loading
    try {
      await fetchFlights(
        originCity,
        destinationCity,
        date,
        classType,
        sortBy,
        setFlights,
      );
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false); // Stop loading AFTER API call finishes
    }
  };

  const swapValues = () => {
    setOriginCity(destinationCity);
    setDestinationCity(originCity);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative mt-4 flex w-full min-w-0 flex-col rounded-lg bg-flight-gray px-2 pb-8 pt-2 shadow-md shadow-neutral-900 selection:gap-x-4 md:min-w-[734px] md:px-4 md:pb-12 md:pt-2 lg:min-w-[1024px]"
        >
          <div className="mb-1 flex">
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="rounded bg-flight-gray px-4 py-2 text-white outline-0 hover:bg-[#3d3e3e]"
            >
              <option value="one_way">One Way</option>
              <option value="round_trip">Round Trip</option>
            </select>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="hover: rounded bg-flight-gray px-4 py-2 text-white outline-0 hover:bg-[#3d3e3e]"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-2 md:flex-row">
            <div className="flex w-full">
              <input
                className="w-full overflow-hidden rounded border border-[#5f6368] bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:border-[#a3a8ae]"
                type="text"
                placeholder="Where from?"
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
              />
              <div
                onClick={swapValues}
                className="flex h-14 w-2 items-center justify-center"
              >
                <div className="absolute rounded-full border border-[#5f6368] bg-flight-gray p-2 hover:bg-[#3d3e3e]">
                  <img className="size-4" src={ExchangeIcon} />
                </div>
              </div>
              <input
                className="w-full overflow-hidden rounded border border-[#5f6368] bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:border-[#a3a8ae]"
                type="text"
                placeholder="Where to?"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
              />
            </div>
            <div className="flex w-full">
              <input
                className={`w-full rounded-l ${tripType === "one_way" ? "border" : "border-y border-l"} border-[#5f6368] bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:rounded hover:border hover:border-[#a3a8ae]`}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {tripType !== "one_way" && (
                <input
                  className="w-full rounded-r border-y border-r border-[#5f6368] border-l-transparent bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:rounded hover:border hover:border-[#a3a8ae]"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              )}
            </div>
            <button
              type="submit"
              className="absolute -bottom-5 flex cursor-pointer items-center gap-x-2 rounded-3xl bg-[#8ab4f8] px-4 py-2 shadow-md shadow-neutral-900"
            >
              <img className="size-4" src={SearchIcon} />
              <span className="font-medium text-[#202124]">Search</span>
            </button>
          </div>
        </form>
        <div className="mt-12 flex w-full">
          <div
            className={`flex min-h-14 w-full cursor-pointer items-center justify-center rounded-l-lg border border-[#5f6368] px-6 py-[10px] text-center ${
              sortBy === "best"
                ? "border-[#8ab4f8] bg-[#394457] text-white"
                : "hover:bg-gray-600"
            }`}
            onClick={() => fetchSortedFlights("best")}
          >
            <span className="font-medium">Best</span>
          </div>
          <div
            className={`flex min-h-14 w-full cursor-pointer items-center justify-center rounded-r-lg border-y border-r border-[#5f6368] border-l-transparent px-6 py-[10px] text-center ${
              sortBy === "price_high"
                ? "border-[#8ab4f8] bg-[#394457] text-white"
                : null
            }`}
            onClick={() => fetchSortedFlights("price_high")}
          >
            <span className="font-medium">Cheapest</span>
            {sortBy === "price_high" && (
              <span className="ml-2 text-xs text-green-400">from R$2,531</span>
            )}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col rounded-lg border border-[#5f6368] last:border-b">
          {loading ? (
            <div className="my-4 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          ) : flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                isLast={index === flights.length - 1}
              />
            ))
          ) : (
            <div className="my-4 text-center text-white">No flights found.</div> // ✅ Prevent UI from disappearing
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
