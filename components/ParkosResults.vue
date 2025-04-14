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
      class="grid grid-cols-2 rounded-lg bg-slate-100 p-4"
    >
      <h3>{{ result.merchant.name }}</h3>
      <p>{{ result.price }} {{ result.currency }}</p>
    </div>
  </div>
</template>
