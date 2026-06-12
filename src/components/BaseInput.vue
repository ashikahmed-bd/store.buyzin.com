<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: [String, Number, Date],
  type: { type: String, default: "text" }, // text, date, select
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="relative block mb-3">
    <label v-if="label" class="block capitalize font-medium">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <input :type="type" :placeholder="placeholder" :value="modelValue" :disabled="disabled" @input="updateValue"
      class="w-full px-4 py-1.5 rounded border focus:border-primary focus:outline-none focus:outline-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500" />

    <small v-if="error" class="text-red-500">{{ error[0] }}</small>
  </div>
</template>
