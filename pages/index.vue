<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-6">SpaceX Launches</h1>
        <table class="min-w-full bg-white">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-gray-200">Flight Number</th>
                    <th class="py-2 px-4 border-b border-gray-200">Name</th>
                    <th class="py-2 px-4 border-b border-gray-200">Date</th>
                    <th class="py-2 px-4 border-b border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="launch in launchesStore.launches.slice(0, 30)" :key="launch.flight_number">
                    <td class="py-2 px-4 border-b border-gray-200">{{ launch.flight_number }}</td>
                    <td class="py-2 px-4 border-b border-gray-200">{{ launch.name }}</td>
                    <td class="py-2 px-4 border-b border-gray-200">{{ new Date(launch.date_utc).toLocaleDateString() }}
                    </td>
                    <td class="py-2 px-4 border-b border-gray-200">
                        <button @click="toggleSaveLaunch(launch)" @mouseover="onHover(launch.flight_number)"
                            @mouseleave="onLeave(launch.flight_number)" :class="buttonClass(launch.flight_number)">
                            {{ buttonText(launch.flight_number) }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLaunchesStore } from '@/stores/launches';

const launchesStore = useLaunchesStore();
const hoveredLaunch = ref<number | null>(null);

onMounted(async () => {
    try {
        await launchesStore.fetchLaunches();
        await launchesStore.fetchSavedLaunches(); // Ensure saved launches are fetched
    } catch (error) {
        console.error('Failed to fetch launches:', error);
    }
});

function saveLaunch(launch) {
    launchesStore.saveLaunch(launch);
}

function unsaveLaunch(flight_number) {
    launchesStore.unsaveLaunch(flight_number);
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
        return 'Remove';
    }
    return isLaunchSaved(flight_number) ? 'Saved' : 'Save';
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
</script>

<style scoped>
/* Add any additional styles if needed */
</style>