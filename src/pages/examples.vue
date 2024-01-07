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
		info: 'Content Magazine #1, ’22-’23 Compiled by Chloé D’Hauwe & Ward Heirwegh'
	},
	{
		image: '/assets/images/archive-2.png',
		info: 'Content Magazine #1, ’22-’23 Compiled by Chloé D’Hauwe & Ward Heirwegh'
	},
	{
		image: '/assets/images/archive-3.png',
		info: 'Content Magazine #1, ’22-’23 Compiled by Chloé D’Hauwe & Ward Heirwegh'
	},
	{
		image: '/assets/images/archive-4.png',
		info: 'Content Magazine #1, ’22-’23 Compiled by Chloé D’Hauwe & Ward Heirwegh'
	},
	{
		image: '/assets/images/archive-5.png',
		info: 'Content Magazine #1, ’22-’23 Compiled by Chloé D’Hauwe & Ward Heirwegh'
	}
]);

nextTick(() => {
	// Emit
	emit('set-is-hovering', false);

	Object.keys(exampleContainers.value).forEach((key) => {
		// Set the booleans
		isHovering.value[key] = false;
	});
});
</script>

<template>
	<div class="flex justify-center items-center h-screen w-screen bg-primary-red">
		<div class="grid grid-cols-3 gap-y-10 gap-x-20 h-fit w-full px-48 my-32">
			<div
				v-for="(example, index) in examples"
				:key="'example-' + index"
				:ref="(el) => [(exampleContainers[index] = el)]"
				class="flex flex-col justify-start items-center gap-2 h-fit"
				@mouseover="isHovering[index] = true"
				@mouseleave="isHovering[index] = false"
			>
				<img :src="example.image" alt="example image" />

				<p
					class="font-arialRounded transition-opacity text-center text-primary-yellow text-lg"
					:class="{ 'opacity-0': !isHovering[index] }"
				>
					{{ example.info }}
				</p>
			</div>
		</div>
	</div>
</template>
