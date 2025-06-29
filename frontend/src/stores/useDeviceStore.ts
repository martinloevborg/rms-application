import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchDevices, type Device } from '@/api/deviceService';

export const useDeviceStore = defineStore('device', () => {
  const devices = ref<Device[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadDevices() {
    loading.value = true;
    error.value = null;
    try {
      devices.value = await fetchDevices();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  return { devices, loading, error, loadDevices };
});