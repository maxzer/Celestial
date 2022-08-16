import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        flags: {
            isModalRemove: false,
            isModalAdd: false,
            isModalChange: false
        },
        data: null,
        currentPage: 1,
        pageSize: 9,
        totalPage: null,
        visibleData: null,
        deleteObject: [],
        findData: []
    },

    actions: {
        async fetchData({commit}) {
            try {
                const {data} = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/');

                commit('SET_DATA', data.bodies);
                commit('SET_VISIBLE_DATA', data.bodies);
            } catch (e) {
                console.log('[Error] [store/fetchData]: ', e);
            }
        },
    },

    mutations: {
        SET_DATA(state, payload) {
            state.data = payload;
        },

        SET_VISIBLE_DATA(state, payload) {
            state.visibleData = payload.slice((state.currentPage - 1) * state.pageSize, state.pageSize * state.currentPage);
            state.totalPage = Math.ceil(payload.length / state.pageSize);
        },

        SET_FIND_DATA(state, payload) {
            state.findData = payload
        },

        SET_DELETE_OBJECT(state, payload) {
            state.deleteObject.push(payload)
        },

        SET_ADD_OBJECT(state, payload) {
            state.data.push(payload);
        },

        SET_CURRENT_PAGE(state, payload) {
            state.currentPage = payload;
        },

        SET_ITEM_BY_INDEX(state, [index, value]) {
            state.data[index] = value;
        },

        SET_FLAG_STATUS(state, [flag, status]) {
            state.flags = {...state.flags, [flag]: status};
        },
    },
});
