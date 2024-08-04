<template>
    <div>
        <Header />
        <main>
            <NuxtPage />
        </main>

    </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>

<style scoped>
main {
    padding: 1rem;
}
</style>