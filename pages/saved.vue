<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-6">Saved Launches</h1>
        <div v-if="launchesStore.savedLaunches.length === 0">
            <p>No saved launches.</p>
        </div>
        <div v-else class="grid grid-cols-1 gap-4">
            <div v-for="launch in launchesStore.savedLaunches" :key="launch.flight_number"
                class="relative p-4 border rounded hover:bg-gray-100 transition"
                @mouseover="onHover(launch.flight_number)" @mouseleave="onLeave">
                <h2 class="text-xl font-bold">{{ launch.name }}</h2>
                <p>Date: {{ new Date(launch.date_utc).toLocaleDateString() }}</p>
                <!-- Ensure this button is correctly placed and visible -->
                <button v-if="hoveredLaunch === launch.flight_number" @click="unsaveLaunch(launch.flight_number)"
                    class="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLaunchesStore } from '@/stores/launches';

const launchesStore = useLaunchesStore();
const hoveredLaunch = ref<number | null>(null);

onMounted(async () => {
    try {
        await launchesStore.fetchSavedLaunches();
    } catch (error) {
        console.error('Failed to fetch saved launches:', error);
    }
});

function unsaveLaunch(flight_number: number) {
    launchesStore.unsaveLaunch(flight_number);
}

function onHover(flight_number: number) {
    hoveredLaunch.value = flight_number;
}

function onLeave() {
    hoveredLaunch.value = null;
}
</script>

<style scoped>
/* Add any additional styles if needed */
/* Make sure the button is correctly positioned */
</style>