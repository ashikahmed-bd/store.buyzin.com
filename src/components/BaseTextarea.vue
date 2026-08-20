<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rows: { type: [String, Number], default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="mb-4">
    <label v-if="label" class="block capitalize text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="w-full text-sm px-3 py-2 border rounded focus:outline-none focus:border-primary disabled:bg-gray-100"
    ></textarea>

    <p v-if="error" class="text-danger text-xs">{{ error }}</p>
  </div>
</template>
