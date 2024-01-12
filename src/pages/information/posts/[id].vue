<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { usePostsStore } from '~/stores/posts'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const postsStore = usePostsStore()
onMounted(async () => {
  await postsStore.getPostById(id)
  await postsStore.getPostComments(id)
})
function showUser(id: number) {
  router.push(`/information/users/${id}`)
}
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="w-full flex flex-col gap-6 px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <h-card :data="postsStore.post" class="w-full">
      <div class="text-5 font-600">
        {{ postsStore.post.title }}
      </div>
      <div class="text-3.5 font-400">
        {{ postsStore.post.body }}
      </div>
      <div class="w-full flex flex-col justify-between">
        <div class="flex items-center gap-1 text-primary">
          <Icon icon="ri-heart-fill" />
          {{ numeralFormat(postsStore.post.reactions) }}
        </div>
        <div class="w-full flex items-center gap-1">
          <div
            v-for="tag in postsStore.post.tags"
            :key="tag"
            class="text-primary"
          >
            #{{ tag }}
          </div>
        </div>
      </div>
    </h-card>
    <div class="my-2 text-5 font-600">
      Comments: {{ postsStore.comments.length }}
    </div>
    <div
      class="w-full flex flex-col items-start overflow-hidden border rounded-8px"
    >
      <div
        v-for="comment in postsStore.comments"
        :key="comment.id"
        class="w-full flex flex-col items-start gap-2 border-b px-3 py-1.5"
      >
        <div
          class="cursor-pointer text-3.5 text-primary font-500 underline"
          @click="showUser(comment.user.id)"
        >
          {{ comment.user.username }}
        </div>
        <div class="text-4 font-400">
          {{ comment.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
