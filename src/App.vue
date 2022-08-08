<template>
  <div v-if="flags.isDataLoaded" :class="$style.container" id="app">
    <div :class="$style.wrapper">
      <h1>Celestial</h1>
      <button @click="openModal()"
      >
        add celestial item
      </button>
    </div>

    <Card v-for="item in currentPageObject"
          :item="item"
          :key="item.id"
          @currentItem="currentItem = $event"
    />
    <Pagination/>

    <ModalRemove v-if="flags.isModalRemove"
                 :currentItem="currentItem"
    />

    <ModalAddItem v-if="flags.isModalAdd"/>

    <modalChange v-if="flags.isModalChange"
                 :currentItem="currentItem"
    />
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Card from './components/Card'
    import Pagination from './components/Pagination'
    import ModalRemove from "./components/modal/ModalRemove";
    import ModalAddItem from "./components/modal/ModalAddItem";
    import ModalChange from "./components/modal/ModalChange";

    export default {
        name: 'app',

        components: {
            ModalChange,
            ModalAddItem,
            ModalRemove,
            Pagination,
            Card
        },

        data() {
            return {
                currentItem: null,
            }
        },

        async created() {
            this.fetchData();
        },

        computed: {
            ...mapGetters('main', {
                flags: 'getFlags',
                currentPageObject: 'getVisibleObject'
            }),
        },

        methods: {
            ...mapActions('main', ['fetchData']),

            openModal() {
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalAdd', true]);
            }
        },
    };
</script>

<style lang="scss" module>
  .container {
    max-width: 1280px;
    margin: auto;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    cursor: pointer;
  }
</style>
