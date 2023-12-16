<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue';
import { lerp } from '@/helpers/index.js';

// Define props
defineProps({
	text: String,
	isHoveringScrollableSection: Boolean
});

// Set variables
const fps = 1000 / 60;
let then = null;
let animateFrameId = null;
let circleDimensions = null;
let currentPosition = { top: null, left: null };
let targetPosition = { top: null, left: null };
const circle = ref(null);

// Define functions
function onMouseMove(event) {
	// Set the target position
	targetPosition.top = event.clientY - circleDimensions.height / 2;
	targetPosition.left = event.clientX - circleDimensions.width / 2;
}

function onResize() {
	// Get circle dimensions
	getCircleDimensions();
}

function animate() {
	const now = Date.now();
	const delta = now - then;

	if (delta > fps) {
		then = now - (delta % fps);

		// Render
		render();
	}

	// Request the animation frame
	animateFrameId = requestAnimationFrame(animate);
}

function render() {
	// Lerp current position
	currentPosition.top = lerp(currentPosition.top, targetPosition.top, 0.1);
	currentPosition.left = lerp(currentPosition.left, targetPosition.left, 0.1);

	// Apply the current position
	circle.value.style.top = currentPosition.top + 'px';
	circle.value.style.left = currentPosition.left + 'px';
	circle.value.style.transform = 'none';
}

function getCircleDimensions() {
	// Set circle dimensions
	circleDimensions = circle.value.getBoundingClientRect();
}

nextTick(() => {
	// Get circle dimensions
	getCircleDimensions();

	// Set initial position values
	currentPosition.top = window.innerHeight / 2 - circleDimensions.height / 2;
	currentPosition.left = window.innerWidth / 2 - circleDimensions.width / 2;
	targetPosition.top = window.innerHeight / 2 - circleDimensions.height / 2;
	targetPosition.left = window.innerWidth / 2 - circleDimensions.width / 2;

	// Start animation loop
	animate();

	// Add event listeners
	document.body.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	// Disable rendering
	cancelAnimationFrame(animateFrameId);

	// Remove event listeners
	document.body.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('resize', onResize);
});
</script>

<template>
	<div
		ref="circle"
		id="drag-circle"
		class="fixed z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-difference h-32 w-32 rounded-full bg-white border-[1px] border-primary-gray pointer-events-none grid place-content-center"
	>
		<transition name="fade" appear>
			<p v-if="text" class="text-white uppercase font-bold">
				{{ text }}
			</p>
		</transition>
	</div>
</template>
