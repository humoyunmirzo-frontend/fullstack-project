<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { usePostsStore } from '~/stores/posts'

const router = useRouter()
function backPreviousRoute() {
  router.back()
}
const postsStore = usePostsStore()

const tableColumns: object[] = [
  {
    title: 'ID',
    value: 'id',
  },
  {
    title: 'Title',
    value: 'title',
  },
  {
    title: 'User Id',
    value: 'userId',
  },
  {
    title: 'Tags',
    value: 'tags',
  },
  {
    title: 'Reactions',
    value: 'reactions',
  },
  {
    title: 'Actions',
    value: 'actions',
  },
]
const showModal = ref<boolean>(false)
const searchInput = ref<string>('')
const filteredPosts = computed(() => {
  return postsStore.posts
  // .filter(post => post.title.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
})
onMounted(async () => {
  await postsStore.getPosts()
})
function searchProducts() {
  postsStore.getPosts(searchInput.value)
}
const postTitle = ref<string>('')
const activePostBody = ref<string>('')
const activePostId = ref<number>(0)
const state = ref<'show' | 'update' | 'create'>('show')
async function updatePostById(id: number) {
  state.value = 'update'
  showModal.value = true
  activePostId.value = id
  postTitle.value = ''
}
async function deletePostById(id: number) {
  await postsStore.deletePost(id)
}
async function createNewPost() {
  state.value = 'create'
  showModal.value = true
  postTitle.value = ''
}

async function showPostBody(id: number) {
  state.value = 'show'
  showModal.value = true

  activePostBody.value = postsStore.posts[id].body
}
async function onConfirmModal() {
  if (state.value === 'update')
    await postsStore.updatePost(activePostId.value, postTitle.value)
  else if (state.value === 'create')
    await postsStore.createPost(postTitle.value)

  else return
  postTitle.value = ''
}
function pageChange(pageNumber: number) {
  postsStore.paginate.skip = (pageNumber - 1) * postsStore.paginate.limit
  postsStore.getPosts()
}
</script>

<template>
  <h-modal v-model="showModal" closable :with-actions="state !== 'show'" @on-confirm="onConfirmModal">
    <div class="py-3">
      <input
        v-if="state === 'update' || state === 'create'"
        v-model="postTitle"
        placeholder="Post title"
        class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
      >
      <div v-if="state === 'show'" class="text-5 font-500">
        {{ activePostBody }}
      </div>
    </div>
  </h-modal>
  <div class="w-full flex flex-col items-start gap-4 px-60px py-24px">
    <div class="flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>

    <div class="text-7 font-600">
      Posts
    </div>
    <div class="w-full flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search posts"
          class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
          @keyup.enter="searchProducts"
        >
        <div class="text-4.5 font-500">
          Total posts: {{ postsStore.posts.length }}/{{ postsStore.total }}
        </div>
      </div>
      <div class="flex flex-col items-start gap-2">
        <h-button prepend-icon="ri-add-line" @click="createNewPost">
          Add new post
        </h-button>
        <h-pagination
          v-bind="postsStore.paginate"
          @on-page-change="pageChange"
        />
      </div>
    </div>
    <h-table :columns="tableColumns" :rows="filteredPosts">
      <template #tags="{ data }">
        <td>
          {{ data.tags.toString() }}
        </td>
      </template>
      <template #actions="{ data }">
        <div class="flex items-center gap-1">
          <abbr title="See information">
            <h-icon-button icon="ri-eye-line" @click="showPostBody(data.id)" />
          </abbr>
          <abbr title="Update">
            <h-icon-button color="secondary" icon="ri-edit-line" @click="updatePostById(data.id)" />
          </abbr>
          <abbr title="Delete">
            <h-icon-button color="danger" icon="ri-delete-bin-line" @click="deletePostById(data.id)" />
          </abbr>
        </div>
      </template>
    </h-table>
  </div>
</template>

<style lang="scss" scoped>

</style>
