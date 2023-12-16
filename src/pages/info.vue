<script setup>
import { nextTick } from 'vue';

// Define emits
const emit = defineEmits(['set-is-hovering']);

nextTick(() => {
	// Emit
	emit('set-is-hovering', false);
});
</script>

<template>
	<div class="grid place-content-center h-screen w-screen bg-primary-red">
		<div class="flex flex-col items-start justify-center gap-4 max-w-xl mx-auto">
			<div class="flex flex-col items-start justify-center gap-2 text-primary-yellow">
				<h3 class="text-2xl uppercase font-bold">Student</h3>
				<p class="text-2xl pl-8 font-bold">Graphic design,</p>
				<p class="text-2xl pl-8 font-bold">Sint Lucas Antwerpen, BA3</p>
			</div>

			<div class="flex flex-col items-start justify-center gap-2 text-primary-yellow">
				<h3 class="text-2xl uppercase font-bold">Mail</h3>
				<p class="text-2xl pl-8 font-bold">contact@tessego.com</p>
			</div>

			<div class="flex flex-col items-start justify-center gap-2 text-primary-yellow">
				<h3 class="text-2xl uppercase font-bold">Instagram</h3>
				<p class="text-2xl pl-8 font-bold">@egotess</p>
			</div>
		</div>
	</div>
</template>
