<template>
  <div class="layout">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script></script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  padding: 1rem;
}
</style>
