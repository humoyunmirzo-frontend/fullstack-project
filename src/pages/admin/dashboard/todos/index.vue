<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { ITodo } from '~/interfaces'
import { useTodosStore } from '~/stores/todos'

const todosStore = useTodosStore()
const tableColumns: object[] = [
  {
    title: 'Todo',
    value: 'todo',
  },
  {
    title: 'Status',
    value: 'completed',
  },
  {
    title: 'UserId',
    value: 'userId',
  },
  {
    title: 'Actions',
    value: 'actions',
  },
]
const router = useRouter()
const showModal = ref<boolean>(false)
const searchInput = ref<string>('')
const filteredTodos = computed(() => {
  return todosStore.todos.filter(todo =>
    todo.todo
      .toLowerCase()
      .trim()
      .includes(searchInput.value.toLowerCase().trim()),
  )
})
onMounted(async () => {
  await todosStore.getTodos()
})
const activeTodoId = ref<number>(0)
const state = ref<'show' | 'update' | 'create'>('show')
const defaultTodo: ITodo = {
  id: 0,
  todo: '',
  completed: false,
  userId: 0,
}
const todo = ref<ITodo>(defaultTodo)
async function createNewTodo() {
  todo.value = defaultTodo
  state.value = 'create'
  showModal.value = true
}
async function updateTodoById(id: number, completed: boolean) {
  state.value = 'update'
  if (state.value === 'update')
    await todosStore.updateTodo(id, completed)
  activeTodoId.value = id
}
async function deleteTodoById(id: number) {
  await todosStore.deleteTodo(id)
}

async function onConfirmModal() {
  if (state.value === 'create')
    await todosStore.createTodo({ todo: todo.value.todo, completed: false })
  else return
  todo.value = defaultTodo
}
function pageChange(pageNumber: number) {
  todosStore.paginate.skip = (pageNumber - 1) * todosStore.paginate.limit
  todosStore.getTodos()
}
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <h-modal
    v-model="showModal"
    closable
    with-actions
    @on-confirm="onConfirmModal"
  >
    <div class="py-3">
      <div v-if="state === 'create'" class="flex flex-col items-start gap-3">
        <input
          v-model="todo.todo"
          placeholder="Todo"
          class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
        >
      </div>
    </div>
  </h-modal>
  <div class="w-full flex flex-col items-start gap-4 px-60px py-24px">
    <div class="flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="text-7 font-600">
      Todos
    </div>

    <div class="w-full flex items-center justify-between">
      <div class="flex flex-col items-start gap-2">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search todos"
          class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
        >
        <div class="text-4.5 font-500">
          Total todos: {{ todosStore.todos.length }}/{{ todosStore.total }}
        </div>
      </div>
      <div class="flex flex-col items-start gap-2">
        <h-button prepend-icon="ri-add-line" @click="createNewTodo">
          Add new todo
        </h-button>
        <h-pagination v-bind="todosStore.paginate" @on-page-change="pageChange" />
      </div>
    </div>
    <h-table :columns="tableColumns" numerable :rows="filteredTodos">
      <template #completed="{ data }">
        <td>
          {{ data.completed ? "Completed" : "Uncompleted" }}
        </td>
      </template>
      <template #actions="{ data }">
        <div class="flex items-center gap-1">
          <abbr title="Update">
            <h-checkbox
              v-model="data.completed"
              label="Completed"
              @click="updateTodoById(data.id, data.completed)"
            />
          </abbr>
          <abbr title="Delete">
            <h-icon-button
              color="danger"
              icon="ri-delete-bin-line"
              @click="deleteTodoById(data.id)"
            />
          </abbr>
        </div>
      </template>
    </h-table>
  </div>
</template>

<style lang="scss" scoped>
</style>
