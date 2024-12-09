import { useState } from "react";
import SearchIcom from "./assets/search.svg";
import ExchangeIcom from "./assets/exchange.svg";

function App() {
  const [tripType, setTripType] = useState("Round Trip"); // Default trip type
  const [classType, setClassType] = useState("Economy"); // Default class type
  const [initialPlace, setInitialPlace] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-screen justify-center">
        <form
          //onSubmit={handleSubmit}
          className="relative mx-4 mt-4 flex w-full flex-col rounded-lg bg-flight-gray px-4 pb-12 pt-2 shadow-md shadow-neutral-900 selection:gap-x-4"
        >
          <div className="flex mb-1">
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="rounded bg-flight-gray px-4 py-2 text-white outline-0 hover:bg-[#3d3e3e]"
            >
              <option value="round_trip">Round Trip</option>
              <option value="one_way">One Way</option>
            </select>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="hover: rounded bg-flight-gray px-4 py-2 text-white outline-0 hover:bg-[#3d3e3e]"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <div className="flex w-full">
              <input
                className="w-full overflow-hidden rounded border border-[#5f6368] bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:border-[#a3a8ae]"
                type="text"
                placeholder="Where from?"
                value={initialPlace}
                onChange={(e) => setInitialPlace(e.target.value)}
              />
              <div className="flex h-14 w-2 items-center justify-center">
                <div className="absolute rounded-full border border-[#5f6368] bg-flight-gray p-2 hover:bg-[#3d3e3e]">
                  <img className="size-4" src={ExchangeIcom} />
                </div>
              </div>
              <input
                className="w-full overflow-hidden rounded border border-[#5f6368] bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:border-[#a3a8ae]"
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex w-full">
              <input
                className="w-full rounded-l border-y border-l border-[#5f6368] bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:rounded hover:border hover:border-[#a3a8ae]"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className="w-full rounded-r border-y border-r border-[#5f6368] border-l-transparent bg-flight-gray px-6 py-4 text-[#e8eaed] placeholder-[#e8eaed] outline-0 hover:rounded hover:border hover:border-[#a3a8ae]"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="absolute -bottom-5 flex items-center gap-x-2 rounded-3xl bg-[#8ab4f8] px-4 py-2 shadow-md shadow-neutral-900">
              <img className="size-4" src={SearchIcom} />
              <span className="font-medium text-[#202124]">Search</span>
            </div>
          </div>
        </form>
        <div
          //onSubmit={handleSubmit}
          className="relative border border-[#5f6368] mx-4 mt-12 flex w-full flex-col rounded-lg px-4 py-4"
        >
          
        </div>
      </div>
    </div>
  );
}

export default App;

//o usuário vai e coloca o nome da cidade inicial - ele vai verificar se a localização condiz com o nome - vai retornar todos as informações como SkyID (NYCA) e EntityID (19858320)
//Mesma coisa com o nome onde ele quer ir

/*
What I need for final result
1. duration
2. airport code departure and destiny
3. maybe how many stops
4. price
5. company
*/
