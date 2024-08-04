<template>
    <div class="mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
            :visible="notificationVisible" @update:visible="notificationVisible = $event" />
        <h1 class="text-3xl font-bold mb-6">Saved Launches</h1>

        <div v-if="isLoading" class="loadingState">
            <UIcon name="i-carbon:progress-bar-round" class="loadingState-icon" />
            <p class="loadingState-label">Loading Saved Launches...</p>
        </div>

        <div v-else>
            <div v-if="launchesStore.savedLaunches.length === 0"
                class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14">
                <UIcon name="i-carbon:list-bulleted" class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p class="text-sm text-center text-gray-900 dark:text-white">No saved launches.</p>
            </div>

            <div v-else class="grid grid-cols-1 gap-4">
                <div v-for="launch in launchesStore.savedLaunches" :key="launch.flight_number"
                    class="relative group bg-white dark:bg-zinc-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg shadow px-4 py-5 sm:p-6 hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition"
                    @mouseover="onHover(launch.flight_number)" @mouseleave="onLeave">
                    <h2
                        class="text-gray-900 dark:text-white text-base font-semibold truncate flex items-center gap-1.5">
                        {{ launch.name }}</h2>
                    <p class="text-[15px] text-gray-500 dark:text-gray-400 mt-1">Date: {{ new
                        Date(launch.date_utc).toLocaleDateString() }}</p>
                    <button v-if="hoveredLaunch === launch.flight_number" @click="unsaveLaunch(launch.flight_number)"
                        class="absolute flex top-4 right-2 bg-red-500 text-white px-4 py-2 rounded transition-all duration-200 hover:bg-red-600">
                        <UIcon name="i-carbon:trash-can" class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLaunchesStore } from '@/stores/launches';
import Notification from '@/components/Notification.vue'; // Import the Notification component

const launchesStore = useLaunchesStore();
const hoveredLaunch = ref<number | null>(null);
const notificationVisible = ref(false);
const notificationMessage = ref('');
const notificationType = ref<'success' | 'error'>('success');
const isLoading = ref(true);  // Loading state

onMounted(async () => {
    try {
        await launchesStore.fetchSavedLaunches();
    } catch (error) {
        console.error('Failed to fetch saved launches:', error);
    } finally {
        isLoading.value = false;  // Set loading to false once data is fetched
    }
});

function unsaveLaunch(flight_number: number) {
    launchesStore.unsaveLaunch(flight_number);
    showNotification('Launch removed from saved!', 'info');
}

function onHover(flight_number: number) {
    hoveredLaunch.value = flight_number;
}

function onLeave() {
    hoveredLaunch.value = null;
}

function showNotification(message: string, type: 'success' | 'error') {
    notificationMessage.value = message;
    notificationType.value = type;
    notificationVisible.value = true;
}
</script>

<style scoped>
.loadingState {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 3.5rem 1.5rem;
}

.loadingState-label {
    font-size: 0.875rem;
    text-align: center;
    color: var(--text-gray-900, #1f2937);
}

.loadingState-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto;
    color: var(--text-gray-400, #9ca3af);
    margin-bottom: 1rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>