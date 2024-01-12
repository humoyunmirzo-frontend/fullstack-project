<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/auth'

const showModal = ref<boolean>(false)
const userFirstName = ref<string>('')

const router = useRouter()
const userLastName = ref<string>('')
const userStore = useUserStore()
onMounted(async () => {
  await userStore.getUser()
})
function updateUser() {
  userLastName.value = ''
  showModal.value = true
}
async function onConfirmModal() {
  await userStore.updateUser(
    userStore.user?.id,
    userFirstName.value,
    userLastName.value,
  )
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
    <div class="w-full py-3">
      <div class="flex flex-col items-start gap-2">
        <input
          v-model="userFirstName"
          placeholder="First name"
          label="Enter your first name"
          class="w-full border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
        >
        <input
          v-model="userLastName"
          placeholder="Last name"
          label="Enter your last name"
          class="w-full border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
        >
      </div>
    </div>
  </h-modal>
  <div class="h-35vh w-full bg-secondary" />
  <div class="absolute left-[24px] top-[24px] flex justify-start">
    <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
  </div>
  <div class="w-full flex items-center justify-center">
    <div
      class="flex flex-col translate-y-[-150px] items-center justify-center gap-2"
    >
      <img
        :src="userStore.user?.image"
        class="border border-secondary rounded-full bg-white"
        alt=""
      >
      <div class="relative flex items-center gap-4">
        <div class="text-4.5 font-500">
          {{ userStore.user?.firstName }} {{ userStore.user?.lastName }}
        </div>
        <h-icon-button
          icon="ri-edit-line"
          class="absolute right-[-30px] top-[-30px]"
          @click="updateUser(userStore.user?.id)"
        />
      </div>
    </div>
    <div class="flex items-start justify-between gap-10 px-60px py-24px">
      <div class="flex flex-col items-start gap-1">
        <div class="text-4.5 font-500">
          Maiden name: {{ userStore.user?.maidenName }}
        </div>
        <div class="text-4.5 font-500">
          Age: {{ userStore.user?.age }}
        </div>
        <div class="text-4.5 font-500">
          Gender: {{ userStore.user?.gender }}
        </div>
        <div class="text-4.5 font-500">
          Phone: {{ userStore.user?.phone }}
        </div>
        <div class="text-4.5 font-500">
          Email: {{ userStore.user?.email }}
        </div>

        <div class="text-4.5 font-500">
          Birth date: {{ userStore.user?.birthDate }}
        </div>
        <div class="text-4.5 font-500">
          Height: {{ userStore.user?.height }}
        </div>
        <div class="text-4.5 font-500">
          Weight: {{ userStore.user?.weight }}
        </div>
        <div class="text-4.5 font-500">
          Blood group: {{ userStore.user?.bloodGroup }}
        </div>
        <div class="text-4.5 font-500">
          Eye color: {{ userStore.user?.eyeColor }}
        </div>
        <div class="text-4.5 font-500">
          Hair color: {{ userStore.user?.hair.color }}
        </div>
      </div>

      <div class="flex flex-col items-start gap-1">
        <div class="text-4.5 font-500">
          Hair type: {{ userStore.user?.hair.type }}
        </div>
        <div class="text-4.5 font-500">
          Domain: {{ userStore.user?.domain }}
        </div>

        <div class="text-4.5 font-500">
          Address: {{ userStore.user?.address.address }}
        </div>
        <div class="text-4.5 font-500">
          City: {{ userStore.user?.address.city }}
        </div>
        <div class="text-4.5 font-500">
          State: {{ userStore.user?.address.state }}
        </div>
        <div class="text-4.5 font-500">
          University: {{ userStore.user?.university }}
        </div>
        <div class="text-4.5 font-500">
          Company address: {{ userStore.user?.company.address.address }}
        </div>
        <div class="text-4.5 font-500">
          Company city: {{ userStore.user?.company.address.city }}
        </div>
        <div class="text-4.5 font-500">
          Department: {{ userStore.user?.company.department }}
        </div>
        <div class="text-4.5 font-500">
          Name: {{ userStore.user?.company.name }}
        </div>
        <div class="text-4.5 font-500">
          Title: {{ userStore.user?.company.title }}
        </div>
        <div class="text-4.5 font-500">
          Crypto: {{ userStore.user?.crypto.coin }}
        </div>
      </div>
    </div>
  </div>
</template>
