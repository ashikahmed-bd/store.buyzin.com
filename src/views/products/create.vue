<script setup>
import Default from "@/layouts/Default.vue";
import { X } from '@lucide/vue';
import { onMounted, reactive } from "vue";

import BaseSelect from "@/components/BaseSelect.vue";
import BaseTextarea from "@/components/BaseTextarea.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseEditor from "@/components/BaseEditor.vue";

import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { useTaxStore } from "@/stores/tax";

import { storeToRefs } from "pinia";
import { useBrandStore } from "@/stores/brand";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const taxStore = useTaxStore();
const brandStore = useBrandStore();

const { categories } = storeToRefs(categoryStore);
const { taxes } = storeToRefs(taxStore);
const { brands } = storeToRefs(brandStore);

const loadCategories = async () => {
    await categoryStore.search('');
};

const loadBrands = async () => {
    await brandStore.search('');
};

const loadTaxes = async () => {
    await taxStore.search('');
};

const form = reactive({
    name: '',
    slug: '',
    type: 'simple',
    summary: '',
    description: '',
    category_id: '',
    brand_id: '',
    tax_id: '',
    base_price: '',
    price: '',
    start_date: '',
    end_date: '',
    quantity: 0,
    sold_count: 0,
    specifications: [],
    weight: '',
    length: '',
    width: '',
    height: '',
    is_shippable: true,
    cod_available: true,
    is_refundable: true,
    estimated_delivery: '',
    warranty: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    publish_at: null,
    status: 'draft'
});


const addSpec = () => {
    form.specifications.push({
        title: "",
        items: [{ label: "", value: "" }]
    });
};

const removeSpec = (index) => {
    form.specifications.splice(index, 1);
};

const addItem = (specIndex) => {
    form.specifications[specIndex].items.push({
        label: "",
        value: ""
    });
};

const removeItem = (specIndex, itemIndex) => {
    form.specifications[specIndex].items.splice(itemIndex, 1);
};


const submit = async () => {
    await productStore.store(form);
};


onMounted(() => {
    loadCategories();
    loadTaxes();
    loadBrands();
});
</script>

<template>
    <Default>
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-slate-900">
                    Create Product
                </h1>
                <p class="text-sm text-slate-500 mt-1">
                    Create a new product and configure pricing, inventory and SEO.
                </p>
            </div>

            <RouterLink :to="{ name: 'products' }"
                class="px-4 py-2 border rounded text-sm font-medium hover:bg-slate-50">
                Back
            </RouterLink>
        </div>

        <form @submit.prevent="submit">
            <div class="grid lg:grid-cols-[1fr_340px] gap-5">
                <div class="space-y-5">
                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Product Information
                            </h2>
                        </div>

                        <div class="p-5 space-y-4">
                            <BaseInput label="Name" v-model="form.name" required />
                            <div class="grid md:grid-cols-2 gap-4">
                                <BaseInput label="Slug" v-model="form.slug" />
                                <BaseSelect label="Type" v-model="form.type" :items="[
                                    { id: 'simple', name: 'Simple' },
                                    { id: 'variable', name: 'Variable' },
                                    { id: 'digital', name: 'Digital' },
                                    { id: 'service', name: 'Service' }
                                ]" />
                            </div>

                            <BaseTextarea label="Summary" :rows="6" v-model="form.summary" />
                        </div>
                    </section>

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Description
                            </h2>
                        </div>

                        <div class="p-4">
                            <BaseEditor v-model="form.description" />
                        </div>
                    </section>

                    <!-- Specifications -->
                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b flex items-center justify-between">
                            <h2 class="font-semibold">
                                Specifications
                            </h2>
                            <button type="button" @click="addSpec" class="text-sm px-3 py-2 rounded-lg border">
                                Add Group
                            </button>
                        </div>

                        <div class="p-5">
                            <div v-for="(spec, index) in form.specifications" :key="index"
                                class="border rounded-xl p-4 mb-4">
                                <div class="flex gap-3 mb-3">
                                    <input v-model="spec.title" placeholder="Group Name" class="form__control flex-1">
                                    <button @click="removeSpec(index)" class="px-2 rounded bg-red-500 text-white">
                                        <X />
                                    </button>
                                </div>

                                <div v-for="(item, itemIndex) in spec.items" :key="itemIndex"
                                    class="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                                    <input v-model="item.label" placeholder="Label" class="form__control">
                                    <input v-model="item.value" placeholder="Value" class="form__control">

                                    <button @click="removeItem(index, itemIndex)"
                                        class="px-2 rounded bg-red-500 text-white">
                                        <X />
                                    </button>
                                </div>

                                <button type="button" @click="addItem(index)" class="mt-2 text-sm font-medium text-primary">
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </section>

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                SEO Settings
                            </h2>
                        </div>
                        <div class="p-5 space-y-4">
                            <BaseInput label="Meta Title" v-model="form.meta_title" />
                            <BaseTextarea label="Meta Description" v-model="form.meta_description" />
                            <BaseTextarea label="Meta Keywords" v-model="form.meta_keywords" />
                        </div>
                    </section>
                </div>

                <div class="space-y-5">
                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Product Meta
                            </h2>
                        </div>
                        <div class="p-5 space-y-4">

                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Categories
                                </label>

                                <div class="relative">
                                    <select v-model="form.category_id"
                                        class="w-full appearance rounded border border-border px-4 py-2.5">

                                        <option value="">Select Category</option>

                                        <template v-for="category in categories?.data ?? []" :key="category.id">
                                            <option :value="category.id">
                                                {{ category.name }}
                                            </option>

                                            <template v-if="category.children?.length">
                                                <template v-for="child in category.children" :key="child.id">
                                                    <option :value="child.id">
                                                        - {{ child.name }}
                                                    </option>

                                                    <template v-if="child.children?.length">
                                                        <option v-for="grand in child.children" :key="grand.id"
                                                            :value="grand.id">
                                                            -- {{ grand.name }}
                                                        </option>
                                                    </template>
                                                </template>
                                            </template>
                                        </template>
                                    </select>
                                </div>
                            </div>


                            <BaseSelect label="Brand" v-model="form.brand_id" :items="brands?.data?.map(brand => ({
                                id: brand.id, name: brand.name
                            }))" placeholder="Select brand" />

                            <BaseSelect label="Taxes" v-model="form.tax_id" :items="taxes.data?.map(tax => ({
                                id: tax.id, name: tax.name
                            }))" placeholder="Select tax" />

                        </div>
                    </section>

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Pricing
                            </h2>
                        </div>
                        <div class="p-5 space-y-4">
                            <BaseInput label="Base Price" type="number" v-model="form.base_price" />
                            <BaseInput label="Selling Price" type="number" v-model="form.price" />
                            <div class="grid grid-cols-2 gap-3">
                                <BaseInput type="date" label="Start" v-model="form.start_date" />
                                <BaseInput type="date" label="End" v-model="form.end_date" />
                            </div>
                        </div>
                    </section>

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Inventory
                            </h2>
                        </div>
                        <div class="p-5 space-y-4">
                            <BaseInput label="Quantity" type="number" v-model="form.quantity" />
                            <BaseInput label="Sold Count" type="number" v-model="form.sold_count" />
                        </div>
                    </section>

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Shipping
                            </h2>
                        </div>
                        <div class="p-5 space-y-4">
                            <div class="grid grid-cols-2 gap-3">
                                <BaseInput label="Weight (KG)" v-model="form.weight" />
                                <BaseInput label="Length  (CM)" v-model="form.length" />
                                <BaseInput label="Width  (CM)" v-model="form.width" />
                                <BaseInput label="Height  (CM)" v-model="form.height" />
                            </div>
                            <label class="flex items-center justify-between">
                                <span>Shippable</span>
                                <input type="checkbox" v-model="form.is_shippable">
                            </label>
                            <label class="flex items-center justify-between">
                                <span>Cash On Delivery</span>
                                <input type="checkbox" v-model="form.cod_available">
                            </label>
                            <label class="flex items-center justify-between">
                                <span>Refundable</span>
                                <input type="checkbox" v-model="form.is_refundable">
                            </label>
                            <BaseInput label="Estimated Delivery" v-model="form.estimated_delivery" />
                            <BaseInput label="Warranty" v-model="form.warranty" />
                        </div>
                    </section>

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Publish
                            </h2>
                        </div>
                        <div class="p-5 space-y-4">
                            <BaseSelect label="Status" v-model="form.status" :items="[
                                { id: 'draft', name: 'Draft' },
                                { id: 'public', name: 'Public' }
                            ]" />
                            <BaseInput type="date" label="Publish At" v-model="form.publish_at" />
                        </div>
                    </section>

                    <BaseButton :loading="productStore.loading" class="w-full">Submit</BaseButton>
                </div>
            </div>
        </form>
    </Default>
</template>

<style scoped></style>
