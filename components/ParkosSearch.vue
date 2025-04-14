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
  <div class="flex flex-col gap-4 max-w-screen-lg mx-auto">
    <h2 class="text-4xl m-4">Shiphol NL Parking</h2>

    <div class="rounded-xl bg-slate-300 p-10" :class="classes">
      <h3 class="text-sm mb-4">Search Parkings</h3>

      <div class="flex gap-4 justify-between">
        <div class="flex flex-row flex-wrap gap-x-4">
          <label for="departure" class="font-bold w-full">From</label>
          <input
            v-model="departure"
            type="date"
            id="departure"
            name="departure"
            class="bg-transparent text-lg"
          />
          <input
            v-model="departureTime"
            type="time"
            id="departureTime"
            name="departureTime"
            class="bg-transparent text-lg"
          />
        </div>

        <div class="flex flex-row flex-wrap gap-x-4">
          <label for="arrival" class="font-bold w-full">To</label>
          <input
            v-model="arrival"
            type="date"
            id="arrival"
            name="arrival"
            class="bg-transparent text-lg"
          />
          <input
            v-model="arrivalTime"
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            class="bg-transparent text-lg"
          />
        </div>

        <button
          class="bg-slate-900 text-white rounded-md p-4 self-end justify-self-end"
          type="submit"
          @click="handleSearch"
        >
          Search Parkings
        </button>
      </div>
    </div>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="results">
      <ParkosResults :results />
    </div>
  </div>
</template>
