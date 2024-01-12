<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUsersStore } from '~/stores/users'

const router = useRouter()
const usersStore = useUsersStore()
onMounted(async () => {
  usersStore.limit = 20
  await usersStore.getUsers()
})
const searchInput = ref<string>('')
const filteredUsers = computed(() => {
  return usersStore.users.filter(user => user.firstName.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
})
function showUser(id: number) {
  router.push(`/information/users/${id}`)
}
function backPreviousRoute() {
  router.back()
}
function pageChange(pageNumber: number) {
  usersStore.paginate.skip = (pageNumber - 1) * usersStore.paginate.limit
  usersStore.getUsers()
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="w-full gap-8 text-center text-8 font-600">
      Users
    </div>
    <div class="flex justify-center">
      <input
        v-model="searchInput"
        type="search"
        placeholder="Search user"
        class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
      >
    </div>
    <div class="w-full flex justify-end">
      <h-pagination
        v-bind="usersStore.paginate"
        @on-page-change="pageChange"
      />
    </div>
    <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
      <TransitionGroup name="list">
        <div v-for="user in filteredUsers" :key="user.id" class="w-full flex cursor-pointer items-start gap-4 border rounded-8px px-3 py-1.5" :data="user" @click="showUser(user.id)">
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
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
