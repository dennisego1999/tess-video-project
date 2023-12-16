import { createRouter, createWebHistory } from 'vue-router';
import landing from '@/pages/landing.vue';
import info from '@/pages/info.vue';

const routes = [
	{
		path: '/',
		name: 'landing_page',
		component: landing
	},
	{
		path: '/info',
		name: 'info_page',
		component: info
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
