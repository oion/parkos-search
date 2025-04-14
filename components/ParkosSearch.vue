<script setup lang="ts">
const props = defineProps<{
  featureFlags: {
    "search-parking-relaxed": boolean;
    "search-parking-tight": boolean;
  };
}>();

const isLoading = ref(false);
const error = ref<string | null>(null);

const departure = ref(new Date().toISOString().split("T")[0]);
const arrival = ref(new Date().toISOString().split("T")[0]);
const departureTime = ref("21:00");
const arrivalTime = ref("21:00");

const results = ref();

const { fetchParkingOffers } = useParking();

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
    "search-parking-relaxed": props.featureFlags["search-parking-relaxed"],
    "search-parking-tight": props.featureFlags["search-parking-tight"],
  };
});
</script>

<template>
  <fieldset class="rounded-xl bg-slate-300 p-10" :class="classes">
    <h2 class="m-0 text-2xl">Search Parkings</h2>

    <label for="departure">From:</label>
    <input v-model="departure" type="date" id="departure" name="departure" />
    <input
      v-model="departureTime"
      type="time"
      id="departureTime"
      name="departureTime"
    />

    <label for="arrival">To:</label>
    <input v-model="arrival" type="date" id="arrival" name="arrival" />
    <input
      v-model="arrivalTime"
      type="time"
      id="arrivalTime"
      name="arrivalTime"
    />

    <button type="submit" @click="handleSearch">Search Parkings</button>
  </fieldset>

  <div v-if="isLoading">Loading...</div>

  <div v-else-if="error" class="error">{{ error }}</div>

  <div v-else-if="results">
    <h2>Results</h2>
    <pre>
      {{ results.available }}
    </pre>
  </div>
</template>
