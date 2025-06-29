<template>
  <div>
    <h2>{{ device.name }}</h2>
    <p>Serial: {{ device.serialNumber }}</p>
    <p>Status: 
      <span>
        {{ device.connectionStatus }}
      </span>
    </p>
    <div v-if="telemetry?.length">
      <h3>Latest Metrics</h3>
      <ul>
        <li v-for="entry in telemetry.slice(0, 3)" :key="entry.timestamp">
          {{ entry.metric }}: {{ entry.value }} ({{ formatTimestamp(entry.timestamp) }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
function formatTimestamp(ts: string) {
  return new Date(ts).toLocaleTimeString();
}

defineProps<{
  device: {
    id: string;
    name: string;
    serialNumber: string;
    connectionStatus: string;
  };
  telemetry?: {
    timestamp: string;
    metric: string;
    value: number;
  }[];
}>();
</script>

