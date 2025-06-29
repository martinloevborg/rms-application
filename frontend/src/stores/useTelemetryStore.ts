import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchTelemetry, type TelemetryEntry } from '@/api/telemetryService';

export const useTelemetryStore = defineStore('telemetry', () => {
  const telemetryData = ref<Record<string, TelemetryEntry[]>>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadTelemetry(deviceId: string) {
    loading.value = true;
    error.value = null;
    try {
      const rawData = await fetchTelemetry(deviceId);

      const transformedData = Object.entries(rawData).map(([metric, entry]) => ({
        deviceId,
        metric,
        value: entry.value,
        timestamp: entry.timestamp,
      }));

      telemetryData.value[deviceId] = transformedData;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  return { telemetryData, loading, error, loadTelemetry };
});