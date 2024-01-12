<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/auth'

const userStore = useUserStore()
const router = useRouter()

async function login(fields: any) {
  await userStore.login(fields)
  router.push('/admin/dashboard')
}
</script>

<template>
  <div class="grid h-100vh place-items-center bg-primary">
    <div class="mx-4 flex flex-col items-start gap-3 rounded-12px bg-white px-5 py-4">
      <div class="text-4.5">
        Login
      </div>
      <FormKit
        id="myForm"
        type="form"
        submit-label=" "
        incomplete-message="Enter information correctly!"
        @submit="login"
      >
        <FormKit
          id="username"
          validation="required|length:5,20"
          name="username"
          label="Enter the username"
          validation-visibility="live"
          :validation-messages="{
            required: 'Required field',
            length: 'Enter 5 to 20 characters',

          }"
          min="5"
          type="text"
          input-class="w-full border border-gray-300 rounded-bl-6px rounded-tr-6px px-2 pl-2"
          placeholder="Username"
        />
        <FormKit
          id="password"
          validation="required|length:5,20"
          min="8"
          name="password"
          validation-visibility="live"
          :validation-messages="{
            required: 'Required field',
            length: 'Enter 5 to 20 characters',
          }"
          label="Enter the password"
          type="password"
          input-class="block w-full w-full flex-1 border border-gray-300 rounded-bl-6px rounded-tr-6px bg-white pl-2"
          placeholder="Password"
        />
        <h-button class="mt-3 w-full" type="submit">
          Login
        </h-button>
      </FormKit>
    </div>
    <div class="absolute left-[24px] top-[24px] z-10 flex flex-col gap-1 rounded-12px bg-secondary px-3 py-1.5 text-white">
      <div class="text-4.5 font-500">
        Example username: kminchelle
      </div>
      <div class="text-4.5 font-500">
        Example password: 0lelplR
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.formkit-messages li {
  color: red !important;
}
</style>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
