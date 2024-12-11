const FlightCard = ({ flight }) => {
  const leg = flight.legs[0];
  const {
    carriers: { marketing },
    durationInMinutes,
    departure,
    arrival,
    origin: { displayCode: originCode },
    destination: { displayCode: destinationCode },
    stopCount,
  } = leg;

  const { logoUrl, name: airlineName } = marketing[0];
  const { formatted: totalPrice } = flight.price;

  const formattedDuration = `${Math.floor(durationInMinutes / 60)} hrs ${durationInMinutes % 60} min`;

  return (
    <div className="flex min-h-[42px] w-full text-nowrap rounded-bl-lg rounded-br-lg py-4 pl-4 pr-8 md:pr-12">
      {/* Airline Logo */}
      <div className="hidden items-center pr-6 md:flex">
        <img
          className="max-h-9 min-h-9 min-w-9 max-w-9"
          src={logoUrl}
          alt={airlineName}
        />
      </div>

      {/* Flight Time and Airline Name */}
      <div className="flex w-full max-w-[289px] flex-col items-start justify-start truncate md:pr-2">
        <span className="text-base font-medium">
          {new Date(departure).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          –
          {new Date(arrival).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="text-xs text-[#9aa0a6]">{airlineName}</span>
        <span className="text-xs text-base font-medium md:hidden">
            {stopCount === 0
              ? "Non-stop"
              : `${stopCount} stop${stopCount > 1 ? "s" : ""}`}
          </span>
      </div>

      {/* Duration and Route */}
      <div className="flex w-full max-w-[142px] flex-col items-start justify-start md:pr-10">
        <span className="text-base font-medium">{formattedDuration}</span>
        <span className="text-xs text-[#9aa0a6]">
          {originCode}–{destinationCode}
        </span>
      </div>

      {/* Stops */}
      <div className="flex items-start justify-start">
        <span className="hidden text-left text-base font-medium md:flex">
          {stopCount === 0
            ? "Non-stop"
            : `${stopCount} stop${stopCount > 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Price */}
      <div className="flex grow items-center justify-end">
        <span className="text-base font-medium">{totalPrice}</span>
      </div>
    </div>
  );
};

export default FlightCard;

/*

*/
