<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  phone: "",
  password: "",
});

const submit = async () => {
  const response = await authStore.login(form);
  if (response.status === 200) {
    router.push({ name: "home" });
  }
};
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <div class="bg-white rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      <!-- LEFT -->
      <div class="hidden md:flex flex-col justify-center items-center p-10 bg-gray-50">
        <img src="/auth.jpg" class="mb-6" />
        <h2 class="text-2xl font-bold text-center mb-2">
          Grow with Buyzin
        </h2>
        <p class="text-gray-500 text-center">
          Vendor & Admin dashboard access
        </p>
      </div>

      <!-- RIGHT -->
      <div class="px-8 py-10">
        <h2 class="text-2xl font-bold mb-2">Sign In</h2>
        <p class="text-gray-500 mb-6">Welcome back!</p>

        <form @submit.prevent="submit" class="space-y-4">
          <BaseInput v-model="form.phone" label="Phone Number" placeholder="01XXXXXXXXX" :required="true"
            :error="authStore.errors?.phone" />

          <BaseInput v-model="form.password" label="Password" type="password" placeholder="********" :required="true"
            :error="authStore.errors?.password" />

          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="accent-primary" />
              Remember Me
            </label>

            <RouterLink to="/forgot" class="text-primary hover:underline">
              Forgot password?
            </RouterLink>
          </div>

          <BaseButton class="w-full" :loading="authStore.loading">
            Sign In
          </BaseButton>
        </form>

        <p class="text-sm text-center mt-6">
          Don’t have an account?
          <RouterLink to="/register" class="text-primary font-semibold">
            Sign up
          </RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
