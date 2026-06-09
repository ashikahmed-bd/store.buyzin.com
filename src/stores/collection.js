import apiClient from "@/utils/axios";
import { defineStore } from "pinia";

export const useCollectionStore = defineStore("collection", {
  state: () => ({
    loading: false,
    errors: {},
    collections: [],
    collection: {},
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/collections");
        if (response.status === 200) {
          this.collections = response.data;
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
        const response = await apiClient.get("/api/v1/collections/search", {
          params: {
            query: query,
          },
        });
        if (response.status === 200) {
          this.collections = response.data;
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
