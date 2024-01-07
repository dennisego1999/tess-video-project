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
	<div class="fixed z-40 inset-0 flex flex-col gap-48 h-screen w-screen pointer-events-none pt-10 pl-10">
		<div
			v-for="(item, index) in navigationItems"
			:key="'navigation-item-' + index"
			class="font-arialRounded pointer-events-auto cursor-pointer uppercase font-bold transition-all duration-500 w-fit"
			:class="[
				route.name === 'landing_page' ? 'text-primary-red hover:text-white' : 'text-white hover:text-primary-yellow'
			]"
			@click="visit(item.route_name)"
		>
			{{ item.label }}
		</div>
	</div>
</template>
