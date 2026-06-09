<script setup>
import { ref, watch } from 'vue'
import apiClient from '@/utils/axios'
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'

const props = defineProps({
    modelValue: [String, Object],
    endpoint: { type: String, required: true },
    label: String,
    placeholder: { type: String, default: 'Search...' },
})

const emit = defineEmits(['update:modelValue'])

const query = ref('')
const items = ref([])
const loading = ref(false)

let timeout = null

watch(query, (value) => {
    clearTimeout(timeout)

    timeout = setTimeout(async () => {
        if (!value) return (items.value = [])

        loading.value = true

        try {
            const { data } = await apiClient.get(props.endpoint, {
                params: { query: value },
            })

            items.value = data.data ?? data
        } finally {
            loading.value = false
        }
    }, 300)
})
</script>

<template>
    <div class="relative block mb-3">
        <label class="block capitalize">{{ label }}</label>
        <Combobox :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
            <div class="relative">
                <ComboboxInput :displayValue="(item) => item?.name || ''" @change="query = $event.target.value"
                    :placeholder="placeholder"
                    class="w-full rounded border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />

                <ComboboxOptions
                    class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded border border-border bg-white">
                    <div v-if="loading" class="px-3 py-2 text-sm">Loading...</div>

                    <div v-else-if="!items.length" class="px-3 py-2 text-sm">
                        No results
                    </div>

                    <ComboboxOption v-for="item in items" :key="item.id" :value="item" v-slot="{ active, selected }">
                        <li class="cursor-pointer px-3 py-2"
                            :class="{ 'bg-indigo-100': active, 'font-semibold': selected }">
                            {{ item.name }}
                        </li>
                    </ComboboxOption>

                </ComboboxOptions>
            </div>
        </Combobox>
        <small v-if="error" class="text-red-500">{{ error[0] }}</small>
    </div>

</template>