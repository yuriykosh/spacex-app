<template>
    <header class="bg-gray-300 text-white py-4 px-8 flex items-baseline justify-between">
        <!-- Logo -->
        <div class="text-2xl font-bold">
            <router-link to="/" class="flex items-center">
                <img src="/logo.png" alt="Logo" class="h-6 mr-2" />
            </router-link>
        </div>

        <!-- Navigation -->
        <nav>
            <ul class="flex gap-4 text-black">
                <li>
                    <router-link to="/" class="hover:text-gray-400">Launches</router-link>
                </li>
                <li>
                    <router-link to="/saved" class="hover:text-gray-400">Saved</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
/* You can add more styles for header if needed */
</style>