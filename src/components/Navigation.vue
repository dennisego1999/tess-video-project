<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

// Set variables
const router = useRouter();
const navigationItems = ref([
	{
		label: 'index',
		route_name: 'landing_page',
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
			class="pointer-events-auto cursor-pointer uppercase font-bold text-red-600"
			@click="visit(item.route_name)"
		>
			{{ item.label }}
		</div>
	</div>
</template>
