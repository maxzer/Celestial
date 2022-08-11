<template>
  <div :class="$style.wrapper">
    <button @click="prev()">
      prev
    </button>
    <div v-for="currentPage in totalPage"
         :key="currentPage"
         :class="$style.page"
         @click="setPage(currentPage)"
    >
      {{currentPage}}
    </div>
    <button @click="next()">
      next
    </button>
  </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "Pagination",

        methods: {
            ...mapMutations('main', {
                setCurrentPage: 'SET_CURRENT_PAGE',
                setVisibleData: 'SET_VISIBLE_DATA',
            }),

            setPage(currentPage) {
                this.setCurrentPage(currentPage);
                if (this.findData.length) this.setVisibleData(this.findData);
                else this.setVisibleData(this.data);

            },

            next() {
                if (this.currentPage > this.totalPage) {
                    this.setCurrentPage(this.currentPage + 1);
                    if (this.findData.length) this.setVisibleData(this.findData);
                    else this.setVisibleData(this.data);
                }
            },

            prev() {
                if (this.currentPage > 1) {
                    this.setCurrentPage(this.currentPage - 1);
                    if (this.findData.length) this.setVisibleData(this.findData);
                    else this.setVisibleData(this.data);
                }
            }
        },

        computed: {
            ...mapState('main', [
                'totalPage',
                'currentPage',
                'data',
                'findData'
            ]),
        },
    }
</script>

<style lang="scss" module>
  .wrapper {
    display: flex;
    justify-content: center;
  }

  .page {
    display: flex;
    padding: 5px;
    border: 1px solid black;
    margin-right: 4px;
    margin-left: 4px;
    cursor: pointer;

    &._active {
      border: 1px solid red;
    }
  }
</style>
