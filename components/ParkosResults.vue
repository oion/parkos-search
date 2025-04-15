<script setup lang="ts">
import type { ParkingOffer } from "~/types/Parking";

const { results } = defineProps<{
  results: {
    available: Record<string, ParkingOffer>;
    unavailable: Record<string, ParkingOffer>;
  };
}>();

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
};
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      v-for="result in results.available"
      :key="result.merchant.id"
      class="grid grid-cols-12 items-center gap-4 rounded-lg bg-white p-4 shadow-sm"
    >
      <h3 class="col-span-3 font-bold">
        {{ result.merchant.name }}
      </h3>
      <span class="col-span-7 text-sm">{{ result.parking_type }}</span>
      <p class="col-span-2 text-xl text-orange-700">
        {{ formatCurrency(result.price, result.currency) }}
      </p>
    </div>
  </div>
</template>
