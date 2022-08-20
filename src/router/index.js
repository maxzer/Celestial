import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPageCelestial from '@/components/pages/MainPageCelestial.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'MainPageCelestial',
        component: MainPageCelestial
    },
    {
        path: '/:id',
        name: 'DetailCard',
        component: () => import('@/components/pages/DetailCard.vue'),
        props: true
    },
    {
        path: '/deletepage',
        name: 'DeletedObject',
        component: () => import('@/components/pages/DeletedObject.vue'),
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router



