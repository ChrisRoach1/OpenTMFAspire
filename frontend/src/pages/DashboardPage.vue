<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import data from './dashboard-data.json'
</script>

<template>
  <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    <DataTable :data="data" />
  </div>
</template>
