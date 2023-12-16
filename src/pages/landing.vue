<script setup>
import { nextTick } from 'vue';

// Define emits
const emit = defineEmits(['set-is-hovering']);

// Set variables
const videoRows = [
	{ videos: ['F1.mp4', 'F2.mp4', 'F3.mp4', 'F4.mp4', 'F5.mp4', 'F6.mp4'] },
	{ videos: ['F1.mp4', 'F2.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] },
	{ videos: ['F1.mp4'] }
];

// Define functions
function onMouseOver(event) {
	//Check scrollable section
	checkIfHoveringScrollableRow(event.target.children);
}

function checkIfHoveringScrollableRow(elements) {
	// Check if the container has multiple children/is scrollable
	if (elements.length > 1) {
		// Emit
		emit('set-is-hovering', true);

		return;
	}

	// Emit
	emit('set-is-hovering', false);
}

nextTick(() => {
	// Check scrollable section
	const firstVideoRow = document.getElementById('video-row-1');
	checkIfHoveringScrollableRow(firstVideoRow.children);
});
</script>

<template>
	<div class="relative pointer-events-none scrollbar-hide">
		<div class="relative z-0 flex flex-col justify-start items-start pointer-events-none">
			<div
				v-for="(row, index) in videoRows"
				:key="'video-row-' + (index + 1)"
				:id="'video-row-' + (index + 1)"
				@mouseover="onMouseOver"
				class="snap-center flex justify-start items-center h-full w-fit max-w-[100vw] overflow-x-auto overflow-y-hidden pointer-events-auto scrollbar-hide"
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
