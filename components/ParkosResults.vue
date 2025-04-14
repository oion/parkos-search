<script setup lang="ts">
import type { ParkingOffer } from "~/types/Parking";

const { results } = defineProps<{
  results: {
    available: Record<string, ParkingOffer>;
    unavailable: Record<string, ParkingOffer>;
  };
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      v-for="(result, name, index) in results.available"
      class="grid grid-cols-12 gap-4 items-center rounded-lg bg-slate-100 p-4"
    >
      <h3 class="col-span-3 font-bold">
        {{ result.merchant.name }}
      </h3>
      <span class="text-sm col-span-7">{{ result.parking_type }}</span>
      <p class="col-span-2 text-orange-700 text-xl">
        {{ result.price }} {{ result.currency }}
      </p>
    </div>
  </div>
</template>
