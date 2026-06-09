<script setup>
import { useAuthStore } from '@/stores/auth';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { LayoutDashboard, Package, ShoppingCart, Users, Wallet, Megaphone, Star, BarChart3, Store, Bell, Settings, Ticket, Truck, Search, Menu, ChevronsUpDown, ChevronRight, LogOut } from '@lucide/vue'
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


const menus = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    to: '/',
  },

  {
    name: 'Products',
    icon: Package,
    children: [
      {
        name: 'All Products',
        to: '/products',
      },
      {
        name: 'Add Product',
        to: '/products/create',
      },
      {
        name: 'Categories',
        to: '/categories',
      },
      {
        name: 'Brands',
        to: '/brands',
      },
      {
        name: 'Inventory',
        to: '/inventory',
      },
    ],
  },

  {
    name: 'Orders',
    icon: ShoppingCart,
    children: [
      {
        name: 'All Orders',
        to: '/orders',
      },
      {
        name: 'Pending Orders',
        to: '/orders/pending',
      },
      {
        name: 'Processing',
        to: '/orders/processing',
      },
      {
        name: 'Shipped',
        to: '/orders/shipped',
      },
      {
        name: 'Delivered',
        to: '/orders/delivered',
      },
      {
        name: 'Returns',
        to: '/orders/returns',
      },
    ],
  },


  {
    name: 'Finance',
    icon: Wallet,
    children: [
      {
        name: 'Earnings',
        to: '/finance/earnings',
      },
      {
        name: 'Withdrawals',
        to: '/finance/withdrawals',
      },
      {
        name: 'Transactions',
        to: '/finance/transactions',
      },
      {
        name: 'Invoices',
        to: '/finance/invoices',
      },
    ],
  },

  {
    name: 'Coupons',
    icon: Ticket,
    children: [
      {
        name: 'All Coupons',
        to: '/coupons',
      },
      {
        name: 'Create Coupon',
        to: '/coupons/create',
      },
    ],
  },

  {
    name: 'Marketing',
    icon: Megaphone,
    children: [
      {
        name: 'Campaigns',
        to: '/marketing/campaigns',
      },
      {
        name: 'Promotions',
        to: '/marketing/promotions',
      },
      {
        name: 'Banners',
        to: '/marketing/banners',
      },
    ],
  },

  {
    name: 'Reviews',
    icon: Star,
    children: [
      {
        name: 'Product Reviews',
        to: '/reviews',
      },
      {
        name: 'Review Requests',
        to: '/reviews/requests',
      },
    ],
  },

  {
    name: 'Analytics',
    icon: BarChart3,
    children: [
      {
        name: 'Sales Report',
        to: '/analytics/sales',
      },
      {
        name: 'Products Report',
        to: '/analytics/products',
      },
      {
        name: 'Customers Report',
        to: '/analytics/customers',
      },
    ],
  },

  {
    name: 'Store',
    icon: Store,
    children: [
      {
        name: 'Store Profile',
        to: '/store/profile',
      },
      {
        name: 'Store Verification',
        to: '/store/verification',
      },
      {
        name: 'Store Policies',
        to: '/store/policies',
      },
    ],
  },

  {
    name: 'Notifications',
    icon: Bell,
    to: '/notifications',
  },

  {
    name: 'Account',
    icon: Settings,
    children: [
      {
        name: 'Profile',
        to: '/account/profile',
      },
      {
        name: 'Security',
        to: '/account/security',
      },
      {
        name: 'Bank Account',
        to: '/account/bank',
      },
      {
        name: 'KYC Verification',
        to: '/account/kyc',
      },
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="flex">
      <aside class="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-white">
        <div class="border-b border-border">
          <RouterLink to="/">
            <img src="/logo.svg" alt="logo" class="h-16 w-auto px-4 py-2.5" />
          </RouterLink>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar p-2.5">
          <nav class="space-y-1">
            <template v-for="item in menus" :key="item.name">
              <Disclosure v-if="item.children?.length" v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded px-2 py-2.5 text-slate-600 transition hover:bg-primary/10 hover:text-primary">
                  <div class="flex items-center gap-3">
                    <component :is="item.icon" :size="18" />
                    <span>{{ item.name }}</span>
                  </div>

                  <ChevronRight :size="16" class="transition-transform" :class="{ 'rotate-90': open }" />
                </DisclosureButton>

                <DisclosurePanel class="mt-1 ml-8 space-y-1">
                  <RouterLink v-for="child in item.children" :key="child.name" :to="child.to"
                    class="block rounded px-3 py-2 text-sm text-slate-500 hover:bg-primary/10 hover:text-primary">
                    {{ child.name }}
                  </RouterLink>
                </DisclosurePanel>
              </Disclosure>

              <RouterLink v-else :to="item.to"
                class="flex items-center gap-3 rounded px-2 py-2.5 text-slate-600 transition hover:bg-primary/10 hover:text-primary">
                <component :is="item.icon" :size="18" />
                <span>{{ item.name }}</span>
              </RouterLink>
            </template>

            <div class="flex items-center gap-3">

              <button @click="logout"
                class="w-full flex items-center gap-3 rounded px-2 py-2.5 text-slate-600 transition hover:bg-primary/10 hover:text-primary">
                <LogOut :size="18" />
                Logout
              </button>

            </div>

          </nav>
        </div>

        <div class="border-t border-dashed border-slate-200 p-4">
          <div class="flex items-center justify-between gap-2">
            <img :src="user.photo_url" :alt="user?.name" class="flex-none size-10 rounded-full object-cover" />
            <div class="min-w-0 flex-1">
              <h4 class="truncate font-semibold">
                {{ user?.name }}
              </h4>
              <p class="truncate text-sm text-slate-500">
                {{ user?.email ?? 'N/A' }}
              </p>
            </div>
            <ChevronsUpDown :size="18" />
          </div>
        </div>
      </aside>

      <div class="ml-64 flex-1">
        <header class="sticky top-0 z-30 bg-white py-2.5 border-b border-border">
          <div class="flex h-full items-center justify-between px-8">
            <div class="flex items-center gap-4">
              <button class="lg:hidden rounded-xl border p-2">
                <Menu :size="20" />
              </button>

              <div class="relative hidden md:block">
                <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search..."
                  class="h-11 w-72 rounded border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none focus:border-primary" />
              </div>
            </div>

            <div class="flex items-center gap-4">
              <button
                class="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white">
                <Bell :size="18" />
                <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <button class="flex items-center gap-2.5">
                <img :src="user.photo_url" :alt="user.name" class="h-10 w-10 rounded-full object-cover" />
                <div class="hidden text-left md:block">
                  <p class="text-sm font-semibold text-slate-900">
                    {{ user.name }}
                  </p>
                  <p class="text-xs text-slate-500">
                    {{ user.role }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main class="p-5">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>