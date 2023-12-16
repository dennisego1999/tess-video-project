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
	circle.value.style.top = event.offsetY - circleDimensions.height / 2 + 'px';
	circle.value.style.left = event.offsetX - circleDimensions.width / 2 + 'px';
	circle.value.style.transform = 'none';

	console.log('moving');
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

		<div class="relative z-0 flex flex-col justify-start items-start]">
			<div
				v-for="(row, index) in videosData"
				:key="'video-row-' + (index + 1)"
				class="flex justify-start items-center h-full w-fit"
			>
				<video
					v-for="(video, videosIndex) in row.videos"
					:key="'video' + (videosIndex + 1)"
					class="h-screen w-screen object-cover"
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
