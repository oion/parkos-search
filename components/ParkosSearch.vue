<script setup lang="ts">
const isLoading = ref(false);
const error = ref<string | null>(null);

const departure = ref(new Date().toISOString().split("T")[0]);
const arrival = ref(new Date().toISOString().split("T")[0]);
const departureTime = ref("23:01");
const arrivalTime = ref("23:00");

const results = ref();

const { fetchParkingOffers } = useParking();
const { getFeatureFlag } = useFeatureFlags();

const handleSearch = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    results.value = await fetchParkingOffers({
      arrival: arrival.value,
      departure: departure.value,
      arrivalTime: arrivalTime.value,
      departureTime: departureTime.value,
    });
  } catch (err) {
    error.value = "Failed to fetch parking offers";
    results.value = [];
  } finally {
    isLoading.value = false;
  }
};

const classes = computed(() => {
  return {
    "search-parking-min-price": getFeatureFlag("searchFilterMinPrice"),
    "search-parking-sorting-ascending": getFeatureFlag(
      "searchSortingAscending"
    ),
  };
});
</script>

<template>
  <div class="mx-auto flex max-w-screen-lg flex-col gap-4">
    <h2 class="m-4 text-4xl">Schiphol NL Parking</h2>

    <div class="rounded-lg bg-slate-100 p-4" :class="classes">
      <h3 class="mb-4 text-sm font-bold">Search Parkings</h3>

      <div class="grid justify-between gap-4 md:grid-cols-3">
        <div class="flex flex-row flex-wrap gap-x-4 border-r">
          <label for="departure" class="w-full font-bold">From</label>
          <input
            id="departure"
            v-model="departure"
            type="date"
            name="departure"
            class="bg-transparent text-xl"
          />
          <input
            id="departureTime"
            v-model="departureTime"
            type="time"
            name="departureTime"
            class="bg-transparent text-xl"
          />
        </div>

        <div class="flex flex-row flex-wrap gap-x-4">
          <label for="arrival" class="w-full font-bold">To</label>
          <input
            id="arrival"
            v-model="arrival"
            type="date"
            name="arrival"
            class="bg-transparent text-xl"
          />
          <input
            id="arrivalTime"
            v-model="arrivalTime"
            type="time"
            name="arrivalTime"
            class="bg-transparent text-xl"
          />
        </div>

        <button
          class="min-w-48 place-self-end rounded-md bg-slate-900 p-4 text-white"
          type="submit"
          @click="handleSearch"
        >
          Search Parkings
        </button>
      </div>
    </div>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="results">
      <ParkosResults :results />
    </div>
  </div>
</template>
