import axios from "axios";

async function getOriginAndDestinationIds(originCity, destinationCity) {
  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
    headers: {
      "x-rapidapi-key": "2d01140b49mshbfae649fb78da2bp156bb6jsn3f7a5c0c26c2",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    // Fetch origin data
    options.params = { query: originCity, locale: "en-US" };
    const originResponse = await axios.request(options);
    const originData = originResponse.data.data.find(
      (entity) => entity.navigation.relevantHotelParams.entityType === "CITY",
    );

    // Fetch destination data
    options.params = { query: destinationCity, locale: "en-US" };
    const destinationResponse = await axios.request(options);
    const destinationData = destinationResponse.data.data.find(
      (entity) => entity.navigation.relevantHotelParams.entityType === "CITY",
    );

    return {
      originEntityId: originData?.navigation.relevantHotelParams.entityId,
      destinationEntityId:
        destinationData?.navigation.relevantHotelParams.entityId,
    };
  } catch (error) {
    console.error("Error fetching entity IDs:", error.message);
    return null;
  }
}

async function getFlightDetails(originEntityId, destinationEntityId, date) {
  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete",
    params: {
      originSkyId: "N/A",
      destinationSkyId: "N/A",
      originEntityId,
      destinationEntityId,
      date,
      cabinClass: "economy",
      adults: "1",
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    },
    headers: {
      "x-rapidapi-key": "2d01140b49mshbfae649fb78da2bp156bb6jsn3f7a5c0c26c2",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching flight details:", error.message);
    return null;
  }
}

async function fetchFlights(originCity, destinationCity, date, setFlights) {
  const ids = await getOriginAndDestinationIds(originCity, destinationCity);

  if (!ids || !ids.originEntityId || !ids.destinationEntityId) {
    console.error("Failed to fetch origin/destination IDs");
    return;
  }

  // Get flight details from the second API
  const flightDetails = await getFlightDetails(
    ids.originEntityId,
    ids.destinationEntityId,
    date,
  );

  if (flightDetails) {
    setFlights(flightDetails.data.itineraries);
    console.log("Flight Details:", flightDetails);
  } else {
    console.error("Failed to fetch flight details");
  }
}

export { getFlightDetails, fetchFlights };
