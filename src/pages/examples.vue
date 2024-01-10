<script setup>
import { nextTick, ref } from 'vue';

// Define emits
const emit = defineEmits(['set-is-hovering']);

// Set variables
const isHovering = ref({});
const exampleContainers = ref({});
const examples = ref([
	{
		image: '/assets/images/archive-1.png',
		info: 'Content Magazine #1, ’22-’23 <br> Compiled by Chloé D’Hauwe & Ward Heirwegh [(19x26 cm), BA2]'
	},
	{
		image: '/assets/images/archive-2.png',
		info: 'The cure, 2023 <br> Bandshirt [Three color silk screen]'
	},
	{
		image: '/assets/images/archive-7.jpg',
		info: 'Brigade cynophile, 2021 <br> [A3, Poster]'
	},
	{
		image: '/assets/images/archive-6.png',
		info: 'Sosia, 2023 <br> with Sera van de Water [Video]'
	},
	{
		image: '/assets/images/archive-3.png',
		info: 'Roundabout club flag, ’22-’23 <br> Part of club identity'
	},
	{
		image: '/assets/images/archive-4.png',
		info: 'Music enhancement in films, ’22-’23 <br> [A5, Silk screen on linen]'
	},
	{
		image: '/assets/images/archive-5.png',
		info: 'Solidarity palestine, 2023 <br> Print on red/green paper [A3, RISO]'
	},
	{
		image: '/assets/images/archive-8.png',
		info: 'Copacetic type, 2023 <br> Redesign 70s UBIK [Uppercase]'
	},
	{
		image: '/assets/images/archive-9.png',
		info: 'Grafisch Dictee Der Dingen, 2021 <br> Collage collectie [A4, Silk screen]'
	}
]);

nextTick(() => {
	// Emit
	emit('set-is-hovering', false);

	Object.keys(exampleContainers.value).forEach((key) => {
		if (!window.matchMedia('(min-width: 1280px)').matches) {
			isHovering.value[key] = true;

			return;
		}

		// Set the booleans
		isHovering.value[key] = false;
	});
});
</script>

<template>
	<div
		class="flex flex-col xl:flex-row xl:justify-center justify-center items-center min-h-screen w-screen bg-primary-red"
	>
		<div
			class="relative w-fit flex flex-col xl:grid xl:grid-cols-3 gap-y-10 gap-x-20 max-h-[75vh] overflow-scroll mx-8 xl:mx-48 my-24 border-2 border-primary-yellow p-4"
		>
			<div
				v-for="(example, index) in examples"
				:key="'example-' + index"
				:ref="(el) => [(exampleContainers[index] = el)]"
				class="flex flex-col justify-start items-center gap-2 h-fit"
				@mouseover="isHovering[index] = true"
				@mouseleave="isHovering[index] = false"
			>
				<img class="max-h-[200px]" :src="example.image" alt="example image" />

				<p
					class="font-arialRounded transition-opacity text-center text-primary-yellow text-lg"
					:class="{ 'opacity-0': !isHovering[index] }"
					v-html="example.info"
				></p>
			</div>
		</div>
	</div>
</template>
