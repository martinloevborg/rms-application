<template>
  <div>
    <h1>Device Logs</h1>

    <label>Select a Device:</label>
    <select v-model="selectedDeviceId">
      <option
        v-for="device in deviceStore.devices"
        :key="device.id"
        :value="device.id"
      >
        {{ device.name }}
      </option>
    </select>

    <div v-if="logStore.loading">Loading logs...</div>
    <div v-else-if="logStore.error">
      Error: {{ logStore.error }}
    </div>

    <ul v-else>
      <li v-for="(log, index) in logStore.logs" :key="index">
        <strong>[{{ log.type }}]</strong> {{ log.message }} – 
        <em>{{ formatDate(log.timestamp) }}</em>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/useDeviceStore';
import { useLogStore } from '@/stores/useLogStore';

const deviceStore = useDeviceStore();
const logStore = useLogStore();

const selectedDeviceId = ref<string | null>(null);

function formatDate(ts: string) {
  return new Date(ts).toLocaleString();
}

onMounted(async () => {
  await deviceStore.loadDevices();
  if (deviceStore.devices.length > 0) {
    selectedDeviceId.value = deviceStore.devices[0].id;
  }
});

watch(selectedDeviceId, (newId) => {
  if (newId) {
    logStore.loadLogs(newId);
  }
});
</script>
