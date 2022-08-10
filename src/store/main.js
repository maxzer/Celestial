import axios from 'axios';

export const main = {
    namespaced: true,
    state: {
        flags: {
            isDataLoaded: false,
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
        findData: null
    },

    getters: {
        getData(state) {
            return state.data;
        },

        getFlags(state) {
            return state.flags;
        },

        getFindData(state) {
            return state.findData;
        },

        getDeleteObject(state) {
           return state.deleteObject;
        },

        getCurrentPage(state) {
           return state.currentPage;
        },

        getTotalPage(state) {
            return state.totalPage;
        },

        getVisibleObject(state) {
            return state.visibleData;
        }
    },

    actions: {
        async fetchData({commit}) {
            try {
                const { data } = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/');

                commit('SET_DATA', data.bodies);
                commit('SET_VISIBLE_DATA', data.bodies);
                commit('SET_FLAG_STATUS', ['isDataLoaded', true]);
            } catch (e) {
                console.log('[Error] [store/main/fetchData]: ', e);
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
            state.visibleData = state.data.slice((state.currentPage - 1) * state.pageSize, state.pageSize * state.currentPage);
        },

        SET_FLAG_STATUS(state, [flag, status]) {
            state.flags = {...state.flags, [flag]: status};
        },
    },
};


