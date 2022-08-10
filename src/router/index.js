import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPageCelestial from '../views/MainPageCelestial.vue'

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
        component: () => import('../views/DetailCard.vue'),
        props: true
    },
    {
        path: '/deletePage',
        name: 'DeletedObject',
        component: () => import('../views/DeletedObject.vue'),
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router



