import { createRouter, createWebHistory } from 'vue-router';
import landing from '@/pages/landing.vue';

const routes = [
	{
		path: '/',
		name: 'landing_page',
		component: landing
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/'
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
