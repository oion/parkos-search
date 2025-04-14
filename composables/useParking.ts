interface ISearchParamsRequest {
  arrival: string;
  departure: string;
  arrivalTime: string;
  departureTime: string;
}

export const useParking = () => {
  const fetchParkingOffers = async (searchParams: ISearchParamsRequest) => {
    try {
      return await $fetch("https://mpl-bff.parkos.io/assignment-offers/", {
        method: "GET",
        params: {
          location: "parkeren-schiphol",
          version: 5,
          lang: "nl",
          ...searchParams,
        },
      });
    } catch (error) {
      console.error("Error fetching parking offers:", error);
      throw error;
    }
  };

  return {
    fetchParkingOffers,
  };
};
