<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue';

// Set variables
let circleDimensions = null;
const circle = ref(null);

// Define functions
function onMouseMove(event) {
	// Set the position of the circle
	circle.value.style.top = event.offsetY - circleDimensions.height / 2 + 'px';
	circle.value.style.left = event.offsetX - circleDimensions.width / 2 + 'px';
	circle.value.style.transform = 'none';
}

function getCircleDimensions() {
	// Set circle dimensions
	circleDimensions = circle.value.getBoundingClientRect();
}

function onResize() {
	getCircleDimensions();
}

nextTick(() => {
	getCircleDimensions();

	// Add event listeners
	document.body.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	// Remove event listeners
	document.body.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('resize', onResize);
});
</script>

<template>
	<div class="relative h-screen w-screen pointer-events-none">
		<div ref="circle" id="drag-circle"></div>
	</div>
</template>
