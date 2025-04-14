<script setup lang="ts">
interface ParkingResult {
  merchant: {
    name: string;
  };
  price: number;
  currency: string;
}

const { results } = defineProps<{
  results: {
    available: ParkingResult;
    unavailable: ParkingResult;
  };
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      v-for="(result, name, index) in results.available"
      class="grid grid-cols-2 rounded-lg bg-slate-200 p-4"
    >
      <h3>{{ result.merchant.name }}</h3>
      <p>{{ result.price }} {{ result.currency }}</p>
    </div>
  </div>
</template>
