import apiClient from "@/utils/axios";
import { defineStore } from "pinia";
import { toast } from 'vue-sonner';

export const useProductStore = defineStore("product", {
  state: () => ({
    loading: false,
    errors: {},
    products: [],
    product: {},
  }),

  getters: {},

  actions: {
    async all(page) {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/products", {
          params: {
            page: page,
          },
        });
        if (response.status === 200) {
          this.products = response.data;
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse.data.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async store(formData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/api/v1/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          this.product = response.data;
          toast.success(response.data.message);
          return Promise.resolve(response);
        }
      } catch (error) {
        if (error.reponse) {
          toast.error(error.response.data.message);
          return Promise.reject(error.reponse.data.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async show(product) {
      try {
        const response = await apiClient.get(`/api/v1/products/${product}`);
        if (response.status === 200) {
          this.product = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          return Promise.reject(error.reponse.data.errors);
        }
      }
    },

    async update(product, payload) {
      this.loading = true;
      try {
        const response = await apiClient.put(`/api/v1/products/${product}`, payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.reponse) {
          toast.error(error.response.data.message);
          return Promise.reject(error.reponse.data.errors);
        }
      } finally {
        this.loading = false;
      }
    },

    async media(product, payload) {
      this.loading = true;
      try {
        const response = await apiClient.post(`/api/v1/products/${product}/media`, payload);
        if (response.status === 200) {
          toast.success(response.data.message);

        }
      } catch (error) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors;

          Object.values(this.errors)
            .flat()
            .forEach(message => toast.error(message));

          return;
        }

        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        this.loading = false;
      }
    },
  },
});
