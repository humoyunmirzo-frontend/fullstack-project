<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useUserStore } from '~/stores/auth'

const userStore = useUserStore()
const cards: object[] = [
  {
    title: 'Products',
    icon: 'ri-menu-search-line',
    path: '../../admin/dashboard/products',
  },
  {
    title: 'Posts',
    icon: 'ri-product-hunt-line',
    path: '../../admin/dashboard/posts',
  },
  {
    title: 'Todos',
    icon: 'ri-todo-line',
    path: '../../admin/dashboard/todos',
  },
  {
    title: 'Profile',
    icon: 'ri-profile-line',
    path: '../../admin/dashboard/profile',
  },
]
function logOut() {
  localStorage.removeItem('token')
  window.location.reload()
}
</script>

<template>
  <div class="max-h-100vh min-h-100vh w-full flex flex-col items-start">
    <header class="fixed left-0 top-0 w-full flex items-center justify-between bg-primary shadow-lg lg:px-[72px] lg:py-[40px] md:px-[32px] md:py-[32px] sm:px-[24px] sm:py-[24px] xs:px-[12px] xs:py-[8px]">
      <router-link to="/" class="text-7 text-white font-600">
        Logo
      </router-link>
      <div class="flex items-center gap-4">
        <h-button size="sm" color="danger" prepend-icon="ri-logout-box-r-fill" @click="logOut">
          Logout
        </h-button>
        <div class="text-black text-white font-500 md:text-6 sm:text-4.5 xs:text-3.5">
          {{ userStore.user?.firstName }}
        </div>
      </div>
    </header>
    <main class="w-full flex flex-1 items-start justify-start md:mt-132px sm:mt-110px xs:mt-80px lg:px-[72px] lg:py-[40px] md:px-[32px] md:py-[32px] sm:px-[24px] sm:py-[24px] xs:px-[12px] xs:py-[8px]">
      <div class="grid w-full justify-start gap-x-1 gap-y-2 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1">
        <div v-for="item in cards" :key="item.title" class="w-full">
          <router-link :to="item.path">
            <div class="w-full flex items-center justify-start gap-2 rounded-12px bg-primary px-6 py-4 shadow-md">
              <div>
                <Icon class="text-white lg:text-6 md:text-5.5 xs:text-5" :icon="item.icon" />
              </div>
              <div class="text-white hyphens-manual lg:text-7 md:text-6 xs:text-5">
                {{ item.title }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: home
  public: false
</route>
