<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<template>
	<navigation />

	<router-view />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
