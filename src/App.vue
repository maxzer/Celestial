<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'App',

        async created() {
            this.fetchData();
        },

        methods: {
            ...mapActions('main', ['fetchData']),
        },
    }
</script>
