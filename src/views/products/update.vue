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
import { useRoute } from "vue-router";


const route = useRoute();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const taxStore = useTaxStore();
const brandStore = useBrandStore();

const { categories } = storeToRefs(categoryStore);
const { taxes } = storeToRefs(taxStore);
const { brands } = storeToRefs(brandStore);
const { product } = storeToRefs(productStore);


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
    type: '',
    summary: '',
    description: '',
    cover_url: '',
    category_id: '',
    brand_id: '',
    tax_id: '',
    base_price: 0,
    price: 0,
    start_date: '',
    end_date: '',
    quantity: 0,
    sold_count: 0,
    specifications: [],
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
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
        items: [{
            label: "",
            value: ""
        }]
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
    await productStore.update(route.params.id, form);
};

const media = reactive({
    cover: null,
    gallery: [],
    video_url: '',
});

const mediaUpload = async () => {
    const formData = new FormData();

    if (media.cover) {
        formData.append('cover', media.cover);
    }

    media.gallery.forEach((file) => {
        formData.append('gallery[]', file);
    });

    if (media.video_url) {
        formData.append('video_url', media.video_url);
    }

    await productStore.media(route.params.id, formData);
};


const loadProduct = async () => {
    const product = await productStore.show(route.params.id);

    form.name = product.data?.name ?? '';
    form.slug = product.data?.slug ?? '';
    form.type = product.data?.type ?? '';
    form.summary = product.data?.summary ?? '';
    form.description = product.data?.description ?? '';

    media.video_url = product.data?.video_url ?? '';

    form.category_id = product.data?.category?.id ?? '';
    form.brand_id = product.data?.brand?.id ?? '';
    form.tax_id = product.data?.tax?.id ?? '';

    form.base_price = product.data?.base_price ?? 0;
    form.price = product.data?.price ?? 0;

    form.start_date = product.data?.start_date ?? '';
    form.end_date = product.data?.end_date ?? '';

    form.quantity = product.data?.quantity ?? 0;
    form.sold_count = product.data?.sold_count ?? 0;

    form.specifications = product.data?.specifications ?? [];

    form.weight = product.data?.dimensions?.weight ?? 0;
    form.length = product.data?.dimensions?.length ?? 0;
    form.width = product.data?.dimensions?.width ?? 0;
    form.height = product.data?.dimensions?.height ?? 0;

    form.is_shippable = product.data?.is_shippable ?? true;
    form.cod_available = product.data?.cod_available ?? true;
    form.is_refundable = product.data?.is_refundable ?? true;

    form.estimated_delivery = product.data?.estimated_delivery ?? '';
    form.warranty = product.data?.warranty ?? '';

    form.meta_title = product.data?.meta_title ?? '';
    form.meta_description = product.data?.meta_description ?? '';
    form.meta_keywords = product.data?.meta_keywords ?? '';

    form.publish_at = product.data?.publish_at ?? null;
    form.status = product.data?.status ?? '';


};

onMounted(() => {
    loadCategories();
    loadTaxes();
    loadBrands();
    loadProduct();
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

                    <section class="bg-white rounded-2xl border border-slate-200">
                        <div class="px-5 py-4 border-b">
                            <h2 class="font-semibold">
                                Media
                            </h2>
                        </div>

                        <form @submit.prevent="mediaUpload" enctype="multipart/form-data" class="p-4 space-y-6">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div class="block">
                                    <BaseInput v-model="media.video_url" label="Video URL"
                                        description="YouTube, Vimeo or other video link" />

                                    <div class="form__group">
                                        <label class="form__label">Gallery</label>
                                        <input type="file" multiple class="form__file"
                                            @change="media.gallery = Array.from($event.target.files)"
                                            accept="image/*" />
                                    </div>

                                    <div v-if="product.data?.gallery"
                                        class="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 py-2">
                                        <div v-for="(image, index) in product.data?.gallery" :key="index"
                                            class="group relative overflow-hidden rounded border bg-white">
                                            <img :src="image" class="aspect-square h-full w-full object-cover" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form__group">
                                    <label class="form__label">Cover</label>
                                    <input type="file" class="form__file" accept="image/*"
                                        @change="media.cover = $event.target.files?.[0]" />

                                    <div v-if="product.data?.cover_url" class="mt-3">
                                        <img :src="product.data?.cover_url" alt="Cover Preview"
                                            class="w-24 h-auto object-cover rounded border" />
                                    </div>
                                </div>
                            </div>

                            <BaseButton :loading="productStore.loading">Update</BaseButton>
                        </form>
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
