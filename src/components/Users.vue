<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUsersStore } from '~/stores/users'

const router = useRouter()
const usersStore = useUsersStore()
onMounted(async () => {
  await usersStore.getUsersWithLimit('20')
})
function showUser(id: number) {
  router.push(`/information/users/${id}`)
}
</script>

<template>
  <div>
    <div class="mb-12 w-full gap-8 text-center text-8 font-600">
      Users
    </div>
    <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
      <TransitionGroup name="list">
        <div v-for="user in usersStore.usersWithLimit" :key="user.id" class="w-full flex cursor-pointer items-start gap-4 border rounded-8px px-3 py-1.5" :data="user" @click="showUser(user.id)">
          <img :src="user.image" class="h-100px w-100px rounded-full" alt="">
          <div class="flex flex-col items-start gap-2">
            <div class="text-4.5 font-600">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="text-primary">
              {{ user.username }}
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="w-full flex justify-center">
      <router-link to="/information/users">
        <h-button class="mb-12" append-icon="ri-arrow-right-line">
          More users
        </h-button>
      </router-link>
    </div>
  </div>
</template>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
<route lang="yaml">
meta:
  layout: home
</route>
