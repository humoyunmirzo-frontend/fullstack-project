<script setup lang="ts">
</script>

<template>
  <div>
    <Header />
    <div class="mt-100px px-60px">
      <Products />
      <Posts />
      <Todos />
      <Users />
    </div>
    <Footer />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
