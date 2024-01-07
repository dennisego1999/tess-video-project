<script setup>
import { nextTick, ref } from 'vue';
import { gsap } from 'gsap';

// Define emits
const emit = defineEmits(['set-is-hovering']);

// Set variables
const isAnimatedTitleActive = ref(true);
const animatedTitleRows = ref([
	{ id: 'first_row', chars: ['t', 'e', 's', 's'] },
	{ id: 'second_row', chars: ['e', 'g', 'o'] }
]);
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

	setTimeout(() => {
		// Animate out
		gsap.to('.animated-title-char', {
			scale: 0,
			rotation: 20,
			yPercent: 50,
			duration: 0.4,
			stagger: -0.1,
			ease: 'power1.inOut',
			onComplete: () => {
				// Update reactive
				isAnimatedTitleActive.value = false;
			}
		});
	}, 2000);
});
</script>

<template>
	<div class="relative pointer-events-none scrollbar-hide overflow-hidden">
		<div
			v-if="isAnimatedTitleActive"
			class="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
		>
			<div v-for="row in animatedTitleRows" :key="row.id" class="flex justify-center items-center gap-[50px]">
				<p
					v-for="(char, index) in row.chars"
					:key="'char-' + index"
					class="animated-title-char font-arialRounded font-outline-7 stroke-primary-red text-primary-yellow uppercase text-[300px] leading-[normal]"
				>
					{{ char }}
				</p>
			</div>
		</div>

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
