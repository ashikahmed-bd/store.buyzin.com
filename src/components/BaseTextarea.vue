<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: [String, Number],
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="relative block mb-2">
    <label v-if="label" class="block mb-2 capitalize">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea :placeholder="placeholder" :value="modelValue" :disabled="disabled" @input="updateValue" :rows="props.rows"
      class="w-full px-4 py-2 rounded border focus:border-primary focus:outline-none focus:outline-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 placeholder:text-gray-300"></textarea>

    <small v-if="error" class="text-red-500">{{ error[0] }}</small>
  </div>
</template>
