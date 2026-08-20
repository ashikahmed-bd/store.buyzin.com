import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useBrandStore = defineStore("brand", {
  state: () => ({
    loading: false,
    errors: {},
    brands: [],
    brand: {},
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/brands");
        if (response.status === 200) {
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
        const response = await apiClient.get("/api/v1/search/brands", {
          params: {
            query: query,
          },
        });
        if (response.status === 200) {
          this.brands = response.data;
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
