<template>
  <div v-if="flags.isDataLoaded" :class="$style.container" id="app">
    <router-link :to="{name: 'DeletedObject'}">view deleted objects</router-link>
    <div :class="$style.wrapper">
      <h1>Celestial</h1>
      <div :class="$style.findBlock">
        <input v-model="name" placeholder="Enter object name">
        <button @click="findObject()"
        >
          show object
        </button>
      </div>
      <button @click="sort()"
      >
        sort name
      </button>
      <button @click="openModal()"
      >
        add celestial item
      </button>
    </div>

    <Card v-for="item in visibleData"
          :item="item"
          :visible-navigation="true"
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
    import {mapMutations, mapState} from 'vuex';
    import Card from '../components/Card'
    import Pagination from '../components/Pagination'
    import ModalRemove from "../components/modal/ModalRemove";
    import ModalAddItem from "../components/modal/ModalAddItem";
    import ModalChange from "../components/modal/ModalChange";

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
                name: '',
                sortByName: false,
            }
        },

        computed: {
            ...mapState('main', [
                'flags',
                'visibleData',
                'data'
            ]),
        },

        methods: {
            ...mapMutations('main', {
                setFlag: 'SET_FLAG_STATUS',
                setVisibleData: 'SET_VISIBLE_DATA',
                setFindData: 'SET_FIND_DATA',
            }),

            openModal() {
                this.setFlag(['isModalAdd', true]);
            },

            findObject() {
                if (this.name.length === 0) this.setVisibleData(this.data);

                let findObject = this.data.filter(item => item.englishName.includes(this.name));
                this.setFindData(findObject);
                this.setVisibleData(findObject)
            },

            sort() {
                const result = [...this.data].sort((a, b) => (a.discoveredBy > b.discoveredBy) ? 1 : -1);

                if (this.sortByName) {
                    this.setVisibleData(this.data);
                    this.sortByName = false;
                } else {
                    this.setVisibleData(result);
                    this.sortByName = true;
                }
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

  .findBlock {
    display: block;

    input {
      margin-right: 8px;
    }
  }
</style>
