import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useTaxStore = defineStore("tax", {
  state: () => ({
    loading: false,
    errors: {},
    taxes: {},
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/taxes");
        if (response.status === 200) {
          this.taxes = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse.data.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async search(query) {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/taxes/search", {
          params: {
            query: query,
          },
        });
        if (response.status === 200) {
          this.taxes = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse.data.errors);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
