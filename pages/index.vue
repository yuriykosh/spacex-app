<template>
    <div class="mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
            :visible="notificationVisible" @update:visible="notificationVisible = $event" />
        <h1 class="text-3xl font-bold mb-6">SpaceX Launches</h1>

        <div class="relative overflow-x-auto rounded">
            <div v-if="isLoading" class="loadingState">
                <UIcon name="i-carbon:progress-bar-round" class="loadingState-icon" />
                <p class="loadingState-label">Loading Launches...</p>
            </div>

            <table v-else class="min-w-full table-auto divide-y divide-gray-300 rounded-lg dark:divide-gray-700">
                <thead class="relative">
                    <tr class="bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <th
                            class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            Flight Number
                        </th>
                        <th
                            class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            Name
                        </th>
                        <th
                            class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            Date
                        </th>
                        <th
                            class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr class="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        v-for="launch in launchesStore.launches.slice(0, 30)" :key="launch.flight_number">
                        <td class="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">{{
                            launch.flight_number }}
                        </td>
                        <td class="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ launch.name
                            }}</td>
                        <td class="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ new
                            Date(launch.date_utc).toLocaleDateString() }}
                        </td>
                        <td class="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
                            <button class="flex transition-all duration-200" @click="toggleSaveLaunch(launch)"
                                @mouseover="onHover(launch.flight_number)" @mouseleave="onLeave(launch.flight_number)"
                                :class="buttonClass(launch.flight_number)">
                                <UIcon :name="buttonText(launch.flight_number)" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLaunchesStore } from '@/stores/launches';
import Notification from '@/components/Notification.vue';

const toast = useToast();
const launchesStore = useLaunchesStore();
const hoveredLaunch = ref<number | null>(null);
const notificationVisible = ref(false);
const notificationMessage = ref('');
const notificationType = ref<'success' | 'error' | 'info'>('success');
const isLoading = ref(true);  // Loading state

onMounted(async () => {
    try {
        await launchesStore.fetchLaunches();
        await launchesStore.fetchSavedLaunches();
    } catch (error) {
        console.error('Failed to fetch launches:', error);
    } finally {
        isLoading.value = false;  // Set loading to false once data is fetched
    }
});

function saveLaunch(launch) {
    launchesStore.saveLaunch(launch);
    showNotification('Launch saved successfully!', 'success');
}

function unsaveLaunch(flight_number) {
    launchesStore.unsaveLaunch(flight_number);
    showNotification('Launch removed from saved!', 'info');
}

function toggleSaveLaunch(launch) {
    if (isLaunchSaved(launch.flight_number)) {
        unsaveLaunch(launch.flight_number);
    } else {
        saveLaunch(launch);
    }
}

function isLaunchSaved(flight_number) {
    return launchesStore.savedLaunches.some(launch => launch.flight_number === flight_number);
}

function buttonText(flight_number) {
    if (hoveredLaunch.value === flight_number && isLaunchSaved(flight_number)) {
        return 'i-carbon:trash-can';
    }
    return isLaunchSaved(flight_number) ? 'i-carbon:bookmark-filled' : 'i-carbon:bookmark';
}

function buttonClass(flight_number) {
    if (hoveredLaunch.value === flight_number && isLaunchSaved(flight_number)) {
        return 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600';
    }
    return isLaunchSaved(flight_number) ? 'bg-green-500 text-white px-4 py-2 rounded hover:bg-red-500' : 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600';
}

function onHover(flight_number) {
    hoveredLaunch.value = flight_number;
}

function onLeave(flight_number) {
    hoveredLaunch.value = null;
}

function showNotification(message: string, type: 'success' | 'error' | 'info') {
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