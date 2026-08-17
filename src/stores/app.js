import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    loading: false,
    errors: {},
    config: null,
    dashboard: [],
  }),

  getters: {},

  actions: {
    async getDashboard() {
      this.loading = true;
      try {
        const response = await apiClient.get("api/v1/dashboard");
        if (response.status === 200) {
          this.dashboard = response.data;
        }
      } catch (error) {
        if (error) {
          return Promise.reject(error.response?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
