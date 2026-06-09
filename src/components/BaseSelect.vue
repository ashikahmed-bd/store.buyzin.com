<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  items: {
    type: Array,
    default: () => [],
  },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="relative block mb-3">
    <label v-if="label" class="block capitalize">
      {{ label }}
    </label>
    <select v-model="modelValue" :disabled="disabled" :class="[
      'w-full border rounded px-3 py-2 focus:outline-cyan-500 focus:ring focus:ring-cyan-200',
      error ? 'border-red-500' : 'border-gray-300',
    ]">
      <option value="" disabled>
        {{ placeholder || `Select ${label}` }}
      </option>

      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <small v-if="error" class="text-red-500">{{ error[0] }}</small>
  </div>
</template>

<style scoped>
/* <BaseSelect label="Status" v-model="form.collection_id"
    :items="brands.map(brand => ({ id: brand.id, name: brand.name }))" /> */
</style>