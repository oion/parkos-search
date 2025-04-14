import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    return await $fetch("https://mpl-bff.parkos.io/assignment-offers/", {
      method: "GET",
      params: query,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching parking offers",
      data: error,
    });
  }
});
