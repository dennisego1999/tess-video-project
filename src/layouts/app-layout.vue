<script setup>
import { ref, watch } from 'vue';
import Navigation from '@/components/navigation.vue';
import NegativeCircle from '@/components/negative-circle.vue';

// Set variables
const circleText = ref('');
const isHoveringScrollableSection = ref(false);

// Watch
watch(isHoveringScrollableSection, (value) => {
	if (value) {
		// Set scrollable text reactive
		circleText.value = 'scroll';

		return;
	}

	// Reset scrollable text reactive
	circleText.value = null;
});
</script>

<template>
	<navigation />

	<router-view @setIsHovering="isHoveringScrollableSection = $event" />

	<negative-circle :is-hovering-scrollable-section="isHoveringScrollableSection" :text="circleText" />
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
