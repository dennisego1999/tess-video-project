<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue';

// Set variables
let circleDimensions = null;
const circle = ref(null);

const videosData = [
	{ videos: ['F1.mp4', 'F2.mp4', 'F3.mp4', 'F4.mp4', 'F5.mp4', 'F6.mp4'] },
	{ videos: ['F1.mp4', 'F2.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] }
];

// Define functions
function onMouseMove(event) {
	// Set the position of the circle
	circle.value.style.top = event.clientY - circleDimensions.height / 2 + 'px';
	circle.value.style.left = event.clientX - circleDimensions.width / 2 + 'px';
	circle.value.style.transform = 'none';
}

function getCircleDimensions() {
	// Set circle dimensions
	circleDimensions = circle.value.getBoundingClientRect();
}

function onResize() {
	// Get circle dimensions
	getCircleDimensions();
}

nextTick(() => {
	// Get circle dimensions
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
	<div class="relative pointer-events-none scrollbar-hide">
		<div
			ref="circle"
			id="drag-circle"
			class="fixed z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-difference h-32 w-32 rounded-full bg-red-600 pointer-events-none"
		></div>

		<div class="relative z-0 flex flex-col justify-start items-start pointer-events-none">
			<div
				v-for="(row, index) in videosData"
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
