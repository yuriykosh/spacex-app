<template>
    <div v-if="visible" class="fixed bottom-4 right-4 z-50">
        <div class="bg-green-500 text-white py-2 px-4 rounded shadow-md" v-if="type === 'success'">
            {{ message }}
        </div>
        <div class="bg-blue-500 text-white py-2 px-4 rounded shadow-md" v-if="type === 'info'">
            {{ message }}
        </div>
        <div class="bg-red-500 text-white py-2 px-4 rounded shadow-md" v-if="type === 'error'">
            {{ message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
}>();

const visible = ref(props.visible);

// Watch for prop change to update local state
watch(() => props.visible, (newVal) => {
    visible.value = newVal;
});

onMounted(() => {
    // Set a timeout to hide the component after 2 seconds
    setTimeout(() => {
        visible.value = false;
        emit('update:visible', false);
    }, 2000);
});
</script>

<style scoped></style>