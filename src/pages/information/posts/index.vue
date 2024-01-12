<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePostsStore } from '~/stores/posts'

const postsStore = usePostsStore()
const router = useRouter()
onMounted(async () => {
  await postsStore.getPosts()
})
const searchInput = ref<string>('')
const filteredPosts = computed(() => {
  return postsStore.posts
  // .filter(post =>
  //   post.title
  //     .toLowerCase()
  //     .trim()
  //     .includes(searchInput.value.toLowerCase().trim()),
  // )
})
function showProduct(id: number) {
  router.push(`/information/posts/${id}`)
}
function searchPosts() {
  postsStore.getPosts(searchInput.value)
}
function pageChange(pageNumber: number) {
  postsStore.paginate.skip = (pageNumber - 1) * postsStore.paginate.limit
  postsStore.getPosts()
}
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col gap-24px px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="w-full gap-8 text-center text-8 font-600">
      Posts
    </div>
    <div class="flex justify-center">
      <input
        v-model="searchInput"
        type="search"
        placeholder="Search post"
        class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
        @keyup.enter="searchPosts"
      >
    </div>
    <div class="w-full flex justify-end">
      <h-pagination v-bind="postsStore.paginate" @on-page-change="pageChange" />
    </div>
    <div
      class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2"
    >
      <TransitionGroup name="list">
        <h-card
          v-for="post in filteredPosts"
          :key="post.id"
          class="w-full cursor-pointer"
          :data="post"
          @click="showProduct(post.id)"
        >
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
            <div class="w-full flex items-center gap-1">
              <div v-for="tag in post.tags" :key="tag" class="text-primary">
                #{{ tag }}
              </div>
            </div>
          </div>
        </h-card>
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
