<script setup>
import Default from "@/layouts/Default.vue";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";
import Loading from "@/components/Loading.vue";
import NotFound from "@/components/NotFound.vue";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const loadProducts = async (page = 1) => {
  await productStore.all(page);
}

onMounted(() => {
  loadProducts();
})
</script>

<template>
  <Default>
    <main class="w-full">
      <nav class="flex items-center justify-between mb-4">
        <h4 class="text-xl font-semibold">Product List</h4>
        <RouterLink :to="{ name: 'products.create' }" class="base__button">Add new</RouterLink>
      </nav>

      <template v-if="productStore.loading">
        <Loading />
      </template>
      <template v-else-if="products.data">
        <div class="bg-white space-y-4 rounded-2xl p-4">
          <div class="relative overflow-x-auto bg-white rounded-xl">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50 border-b">
                <tr class="text-left text-gray-600 font-medium">
                  <th class="px-4 py-3">Product</th>
                  <th class="px-4 py-3">SKU</th>
                  <th class="px-4 py-3">Price</th>
                  <th class="px-4 py-3">Stock</th>
                  <th class="px-4 py-3">Sold</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody class="divide-y">
                <tr v-for="product in products.data" :key="product.id" class="hover:bg-gray-50 transition">
                  <td class="px-4 py-3 max-w-2xs">
                    <div class="flex items-center gap-3">
                      <img :src="product.cover_url" :alt="product.name" class="w-auto h-10 rounded object-cover" />
                      <div>
                        <h3 class="font-medium text-gray-900">
                          {{ product.name }}
                        </h3>

                        <p class="text-xs text-gray-500">
                          ID: {{ product.id }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-3">
                    {{ product.sku }}
                  </td>

                  <td class="px-4 py-3">
                    <div v-if="product.price">
                      <p class="font-medium">
                        {{ product.price_formatted }}
                      </p>

                      <del class="text-xs text-gray-500">
                        {{ product.base_price_formatted }}
                      </del>
                    </div>

                    <p v-else class="font-medium">
                      {{ product.base_price_formatted }}
                    </p>
                  </td>
                  <td class="px-4 py-3">
                    {{ product.quantity }}
                  </td>
                  <td class="px-4 py-3">
                    {{ product.sold_count }}
                  </td>

                  <td class="px-4 py-3">
                    <span class="px-2.5 py-1 rounded-full text-xs font-medium capitalize" :class="{
                      'bg-green-100 text-green-700': product.status === 'published',
                      'bg-yellow-100 text-yellow-700': product.status === 'draft',
                      'bg-red-100 text-red-700': product.status === 'inactive'
                    }">
                      {{ product.status }}
                    </span>
                  </td>

                  <td class="px-4 py-3 text-right">
                    <RouterLink :to="{ name: 'products.edit', params: { id: product.id } }"
                      class="bg-primary text-white px-4 py-1 text-xs rounded">
                      Edit
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>


            <Pagination class="px-4 py-6" :total-items="products.meta.total" :current-page="products.meta.current_page"
              :items-per-page="products.meta.per_page" :pages-to-show="2" @page-change="loadProducts" visible-always />
          </div>
        </div>
      </template>
      <template v-else>
        <NotFound />
      </template>
    </main>
  </Default>
</template>

<style scoped></style>
