<script setup>
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
        <div class="flex flex-col items-center gap-4">
            <div class="relative w-20 h-20 flex items-center justify-center">
                <svg class="absolute w-full h-full animate-spin" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#22D3EE" stroke-width="2"
                        stroke-dasharray="30 20" stroke-linecap="round" />
                </svg>
                <img src="/favicon.ico" class="w-10 h-10 animate-pulse" />
            </div>

            <p class="text-sm font-medium text-gray-700 tracking-wide">
                Loading, please wait...
            </p>
        </div>
    </div>
</template>

<style scoped></style>
