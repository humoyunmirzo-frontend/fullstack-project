<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '~/stores/posts'

const postsStore = usePostsStore()
const router = useRouter()
onMounted(async () => {
  await postsStore.getPostsWithLimit('20')
})
function showProduct(id: number) {
  router.push(`/information/posts/${id}`)
}
</script>

<template>
  <div>
    <div class="mb-12 w-full gap-8 text-center text-8 font-600">
      Posts
    </div>
    <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
      <TransitionGroup name="list">
        <h-card v-for="post in postsStore.postsWithLimit" :key="post.id" class="w-full cursor-pointer" :data="post" @click="showProduct(post.id)">
          <div class="text-5 font-600">
            {{ post.title }}
          </div>
          <div class="text-3.5 font-400">
            {{ post.body.substring(0, 80) }}... <span class="text-primary">
              More
            </span>
          </div>
          <div class="w-full flex flex-col justify-between">
            <div class="flex items-center gap-1 text-primary">
              <Icon icon="ri-heart-fill" /> {{ numeralFormat(post.reactions) }}
            </div>
            <div class="w-full flex gap-1">
              <div v-for="tag in post.tags" :key="tag" class="text-primary">
                #{{ tag }}
              </div>
            </div>
          </div>
        </h-card>
      </TransitionGroup>
    </div>
    <div class="w-full flex justify-center">
      <router-link to="/information/posts">
        <h-button class="mb-12" append-icon="ri-arrow-right-line">
          More posts
        </h-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</route>
