<script setup lang="ts">
const featureFlags = {
  "search-parking-relaxed": true,
  "search-parking-tight": false,
};
</script>

<template>
  <div>
    <ParkosSearch :feature-flags="featureFlags" />
  </div>
</template>
