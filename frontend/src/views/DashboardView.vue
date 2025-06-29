<template>
  <div>
    <h1>Device Dashboard</h1>

    <div v-if="deviceStore.loading">Loading devices...</div>
    <div v-else-if="deviceStore.error">Error: {{ deviceStore.error }}</div>

    <div>
      <DeviceCard
        v-for="device in deviceStore.devices"
        :key="device.id"
        :device="device"
        :telemetry="telemetryStore.telemetryData[device.id] || []"
      />
    </div>

    <div>
      <label for="device-select">Select Device for Telemetry Chart:</label>
      <select
        id="device-select"
        v-model="selectedDeviceId"
      >
        <option
          v-for="device in deviceStore.devices"
          :key="device.id"
          :value="device.id"
        >
          {{ device.name }}
        </option>
      </select>
    </div>

    <TelemetryChart
      v-if="selectedDeviceId && telemetryStore.telemetryData[selectedDeviceId]?.length"
      :telemetry="telemetryStore.telemetryData[selectedDeviceId]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useDeviceStore } from '@/stores/useDeviceStore';
import { useTelemetryStore } from '@/stores/useTelemetryStore';
import DeviceCard from '@/components/DeviceCard.vue';
import TelemetryChart from '@/components/TelemetryChart.vue';

const deviceStore = useDeviceStore();
const telemetryStore = useTelemetryStore();

const selectedDeviceId = ref<string | null>(null);
const POLL_INTERVAL = 5000;
let intervalId: number;

onMounted(async () => {
  await deviceStore.loadDevices();
  if (deviceStore.devices.length > 0) {
    selectedDeviceId.value = deviceStore.devices[0].id;
  }
  await pollTelemetry();

  intervalId = window.setInterval(() => {
    pollTelemetry();
  }, POLL_INTERVAL);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

async function pollTelemetry() {
  for (const device of deviceStore.devices) {
    telemetryStore.loadTelemetry(device.id);
  }
}
</script>
