<script setup lang="ts">
const headerLinks: object[] = [
  {
    title: 'Products',
    path: 'information/products',
  },
  {
    title: 'Posts',
    path: 'information/posts',
  },
  {
    title: 'Todos',
    path: 'information/todos',
  },
  {
    title: 'Users',
    path: 'information/users',
  },
]
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-primary px-60px py-24px"
  >
    <router-link class="text-7 text-white font-600" to="/">
      Logo
    </router-link>
    <div class="flex items-center gap-5">
      <router-link
        v-for="link in headerLinks"
        :key="link.title"
        :to="link.path"
        class="text-4.5 text-white font-500 underline-2px duration-300 hover:underline"
      >
        {{ link.title }}
      </router-link>
    </div>
    <router-link to="/auth/login">
      <h-button color="secondary">
        Login
      </h-button>
    </router-link>
  </header>
</template>
