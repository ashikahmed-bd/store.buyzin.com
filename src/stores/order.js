import apiClient from "@/utils/axios";
import { defineStore } from "pinia";
import { toast } from 'vue-sonner';

export const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    errors: {},
    orders: [],
    order: [],
  }),

  getters: {},

  actions: {
    async all() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/orders");
        if (response.status === 200) {
          this.orders = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async show(order) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/api/v1/orders/${order}`);
        if (response.status === 200) {
          this.order = response.data.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async confirm(order) {
      this.loading = true;
      try {
        const response = await apiClient.put(
          `/api/v1/orders/${order}/confirmed`
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse?.data?.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async cancel(order) {
      this.loading = true;
      try {
        const response = await apiClient.put(`/api/v1/orders/${order}/cancel`);
        if (response.status === 200) {
          toast.success(response.data.message);
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response?.data?.message);
          return Promise.reject(error.response);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
