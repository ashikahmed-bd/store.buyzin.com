<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="mb-4">
    <label v-if="label" class="block capitalize font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea :value="modelValue" @input="updateValue" :placeholder="placeholder" :disabled="disabled" rows="5"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary disabled:bg-gray-100"></textarea>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>

    <small class="text-gray-400 text-xs">
      Markdown supported (**, ##, -, [link], etc.)
    </small>
  </div>
</template>