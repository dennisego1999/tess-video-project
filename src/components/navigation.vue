<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

// Set variables
const route = useRoute();
const router = useRouter();
const navigationItems = ref([
	{
		label: 'Tess Ego',
		route_name: 'landing_page',
		current: false
	},
	{
		label: 'index',
		route_name: 'examples_page',
		current: false
	},
	{
		label: 'info',
		route_name: 'info_page',
		current: false
	}
]);

// Define functions
function visit(routeName) {
	// Go to route
	router.push({ name: routeName });
}
</script>

<template>
	<div
		class="fixed z-40 inset-0 flex justify-between xl:justify-start xl:flex-col gap-4 xl:gap-48 h-fit xl:h-screen xl:w-screen pointer-events-none pt-3 px-4 xl:pt-10 xl:pl-10"
	>
		<div
			v-for="(item, index) in navigationItems"
			:key="'navigation-item-' + index"
			class="font-arialRounded pointer-events-auto cursor-pointer uppercase font-bold transition-all duration-500 min-w-fit w-fit"
			:class="[
				route.name === 'landing_page'
					? 'text-primary-red xl:hover:text-white'
					: 'text-white xl:hover:text-primary-yellow'
			]"
			@click="visit(item.route_name)"
		>
			{{ item.label }}
		</div>
	</div>
</template>
