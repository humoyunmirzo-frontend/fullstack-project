<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id
onMounted(async () => {
  await usersStore.getUserById(id)
  await usersStore.getUserPosts(id)
  await usersStore.getUserTodos(id)
})
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="w-full">
    <div class="absolute left-[24px] top-[24px] w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="h-35vh w-full flex flex-col gap-10 bg-secondary" />
    <div class="w-full flex items-center justify-center">
      <div class="flex flex-col translate-y-[-150px] items-center justify-center gap-2">
        <img :src="usersStore.user.image" class="border border-secondary rounded-full bg-white" alt="">
        <div class="flex items-center gap-4">
          <div class="text-6.5 font-500">
            {{ usersStore.user.firstName }}  {{ usersStore.user.lastName }}
          </div>
        </div>
      </div>
      <div class="flex items-start justify-between gap-10 px-60px py-24px">
        <div class="flex flex-col items-start gap-1">
          <div class="text-4.5 font-500">
            Maiden name: {{ usersStore.user.maidenName }}
          </div>
          <div class="text-4.5 font-500">
            Username: <span class="text-primary">{{ usersStore.user.username }}
            </span>
          </div>
          <div class="text-4.5 font-500">
            Age: {{ usersStore.user.age }}
          </div>
          <div class="text-4.5 font-500">
            Gender: {{ usersStore.user.gender }}
          </div>
          <div class="text-4.5 font-500">
            Phone: {{ usersStore.user.phone }}
          </div>
          <div class="text-4.5 font-500">
            Email: {{ usersStore.user.email }}
          </div>

          <div class="text-4.5 font-500">
            Birth date: {{ usersStore.user.birthDate }}
          </div>
          <div class="text-4.5 font-500">
            Height: {{ usersStore.user.height }}
          </div>
          <div class="text-4.5 font-500">
            Weight: {{ usersStore.user.weight }}
          </div>
          <div class="text-4.5 font-500">
            Blood group: {{ usersStore.user.bloodGroup }}
          </div>
          <div class="text-4.5 font-500">
            Eye color: {{ usersStore.user?.eyeColor }}
          </div>
        </div>

        <div class="flex flex-col items-start gap-1">
          <div class="text-4.5 font-500">
            Hair color: {{ usersStore.user.hair?.color }}
          </div>
          <div class="text-4.5 font-500">
            Hair type: {{ usersStore.user.hair?.color }}
          </div>
          <div class="text-4.5 font-500">
            Domain: {{ usersStore.user?.domain }}
          </div>

          <div class="text-4.5 font-500">
            Address: {{ usersStore.user.address?.address }}
          </div>
          <div class="text-4.5 font-500">
            City: {{ usersStore.user.address?.city }}
          </div>
          <div class="text-4.5 font-500">
            State: {{ usersStore.user.address?.state }}
          </div>
          <div class="text-4.5 font-500">
            University: {{ usersStore.user?.university }}
          </div>
          <div class="text-4.5 font-500">
            Company address: {{ usersStore.user.company?.address.address }}
          </div>
          <div class="text-4.5 font-500">
            Company city: {{ usersStore.user.company?.address.city }}
          </div>
          <div class="text-4.5 font-500">
            Department: {{ usersStore.user.company?.department }}
          </div>
          <div class="text-4.5 font-500">
            Name: {{ usersStore.user.company?.name }}
          </div>
          <div class="text-4.5 font-500">
            Title: {{ usersStore.user.company?.title }}
          </div>
          <div class="text-4.5 font-500">
            Crypto: {{ usersStore.user.crypto?.coin }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start gap-4 px-60px py-24px">
      <div class="text-6 font-500">
        This user's posts: {{ usersStore.userPosts.length }}
      </div>
      <div
        class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2"
      >
        <h-card
          v-for="post in usersStore.userPosts"
          :key="post.id"
          class="w-full cursor-pointer"
          :data="post"
        >
          <div class="text-5 font-600">
            {{ post.title }}
          </div>
          <div class="text-primary">
            UserId: {{ post.userId }}
          </div>
          <div class="text-primary">
            Reactions: {{ numeralFormat(post.reactions) }}
          </div>
        </h-card>
      </div>
      <div class="text-6 font-500">
        This user's todos: {{ usersStore.userTodos.length }}
      </div>
      <div
        class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2"
      >
        <h-card v-for="todo in usersStore.userTodos" :key="todo.id" class="w-full cursor-pointer" :data="todo">
          <div class="text-5 font-600">
            {{ todo.todo }}
          </div>
          <div class="text-primary">
            Status: {{ todo.todo.completed ? 'Completed' : 'Uncompleted' }}
          </div>
          <div class="text-primary">
            UserId: {{ numeralFormat(todo.userId) }}
          </div>
        </h-card>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
