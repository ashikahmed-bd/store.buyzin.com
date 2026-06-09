import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    loading: false,
    errors: {},
    categories: {}
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/categories");
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
        const response = await apiClient.get("/api/v1/categories/search", {
          params: {
            query: query,
          },
        });
        if (response.status === 200) {
          this.categories = response.data;
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
