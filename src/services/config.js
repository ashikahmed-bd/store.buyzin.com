import apiClient from "@/utils/axios";
import { useAppStore } from "@/stores/app";

export async function getAppConfig(force = false) {
  const appStore = useAppStore();

  if (appStore.config && !force) {
    return appStore.config;
  }

  const response = await apiClient.get("/api/v1/config");

  appStore.config = response.data?.config;

  return response.data;
}
