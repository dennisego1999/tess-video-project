<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue';
import { lerp } from '@/helpers/index.js';

// Set variables
const fps = 1000 / 60;
let then = null;
let animateFrameId = null;
let circleDimensions = null;
let currentPosition = { top: null, left: null };
let targetPosition = { top: null, left: null };
const circle = ref(null);

const videoRows = [
	{ videos: ['F1.mp4', 'F2.mp4', 'F3.mp4', 'F4.mp4', 'F5.mp4', 'F6.mp4'] },
	{ videos: ['F1.mp4', 'F2.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] }
];

// Define functions
function onMouseMove(event) {
	// Set the target position
	targetPosition.top = event.clientY - circleDimensions.height / 2;
	targetPosition.left = event.clientX - circleDimensions.width / 2;
}

function getCircleDimensions() {
	// Set circle dimensions
	circleDimensions = circle.value.getBoundingClientRect();
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
	<div class="relative pointer-events-none scrollbar-hide">
		<div
			ref="circle"
			id="drag-circle"
			class="fixed z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-difference h-32 w-32 rounded-full bg-red-600 pointer-events-none"
		></div>

		<div class="relative z-0 flex flex-col justify-start items-start pointer-events-none">
			<div
				v-for="(row, index) in videoRows"
				:key="'video-row-' + (index + 1)"
				class="flex justify-start items-center h-full w-fit max-w-[100vw] overflow-x-auto overflow-y-hidden pointer-events-auto scrollbar-hide"
			>
				<video
					v-for="(video, videosIndex) in row.videos"
					:key="'video' + (videosIndex + 1)"
					class="h-screen w-screen min-h-screen min-w-[100vw] object-cover pointer-events-none"
					muted
					autoplay
					loop
					playsinline
				>
					<source :src="'/assets/videos/' + (index + 1) + '/' + video" />
				</video>
			</div>
		</div>
	</div>
</template>
