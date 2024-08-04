<template>
    <header class="bg-gray-300 text-white py-4 px-8 flex items-end justify-between">
        <!-- Logo -->
        <div class="text-2xl font-bold h-full">
            <router-link to="/" class="flex pb-2">
                <img src="/logo.png" alt="Logo" class="h-6  mr-2" />
            </router-link>
        </div>

        <!-- Navigation -->
        <nav>
            <ul class="flex items-center gap-4 group translate-y-1">
                <li>
                    <router-link to="/"
                        class="flex items-center pb-2 border-b gap-1.5 text-sm/6 truncate text-gray-500  hover:text-gray-700 border-transparent hover:border-gray-500 transition-all">
                        Launches
                        <UIcon name="i-carbon:rocket" class="w-5 h-5 flex-shrink-0" />
                    </router-link>
                </li>
                <li>
                    <router-link to="/saved"
                        class="flex items-center pb-2 border-b gap-1.5 text-sm/6 truncate text-gray-500  hover:text-gray-700 border-transparent hover:border-gray-500 transition-all">
                        Saved
                        <UIcon name="i-carbon:bookmark-filled" class="w-5 h-5 flex-shrink-0" />
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped></style>