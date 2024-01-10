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
		info: 'Content Magazine #1, ’22-’23 Compiled by Chloé D’Hauwe & Ward Heirwegh [BA2]'
	},
	{
		image: '/assets/images/archive-2.png',
		info: 'The cure, 2023 Bandshirt'
	},
	{
		image: '/assets/images/archive-7.jpg',
		info: 'Brigade cynophile poster 2021 [A3]'
	},
	{
		image: '/assets/images/archive-6.png',
		info: 'Sosia, 2023 Archive film with Sera van de Water'
	},
	{
		image: '/assets/images/archive-3.png',
		info: 'Roundabout club flag, ’22-’23'
	},
	{
		image: '/assets/images/archive-4.png',
		info: 'Music enhancement in films, ’22-’23 <br> [silk screen on linen]'
	},
	{
		image: '/assets/images/archive-5.png',
		info: 'Solidarity palestine, 2023 [RISO]'
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
	<div class="flex flex-col xl:flex-row xl:justify-center items-start min-h-screen w-screen bg-primary-red">
		<div class="flex flex-col xl:grid xl:grid-cols-3 gap-y-10 gap-x-20 h-fit w-full px-8 xl:px-48 my-24 xl:my-32">
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
