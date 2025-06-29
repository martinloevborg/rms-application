import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchLogs, type LogEntry } from '@/api/logsService';

export const useLogStore = defineStore('logs', () => {
  const logs = ref<LogEntry[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadLogs(deviceId: string) {
    loading.value = true;
    error.value = null;
    try {
      logs.value = await fetchLogs(deviceId);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  return { logs, loading, error, loadLogs };
});
