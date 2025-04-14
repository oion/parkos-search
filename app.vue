<script setup lang="ts">
const featureFlags = {
  "search-parking-relaxed": true,
  "search-parking-tight": false,
};
</script>

<template>
  <div class="m-0 p-10">
    <ParkosSearch :feature-flags="featureFlags" />
  </div>
</template>
