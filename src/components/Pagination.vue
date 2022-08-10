<template>
  <div :class="$style.wrapper">
    <button @click="prev()">
      prev
    </button>
    <div v-for="number in totalPage"
         :key="number"
         :class="$style.page"
         @click="setPage($event.target)"
    >
      {{number}}
    </div>
    <button @click="next()">
      next
    </button>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Pagination",

        data() {
            return {
                page: null
            }
        },

        methods: {
            setPage(target) {
                this.page = +target.innerText;
                this.$store.commit('main/SET_CURRENT_PAGE', this.page);
                if (this.findData.length) this.$store.commit('main/SET_VISIBLE_DATA', this.findData);
                else this.$store.commit('main/SET_VISIBLE_DATA', this.data);

            },

            next() {
                if (this.currentPage > this.totalPage) {
                    this.$store.commit('main/SET_CURRENT_PAGE', this.currentPage + 1);
                    if (this.findData.length) this.$store.commit('main/SET_VISIBLE_DATA', this.findData);
                    else this.$store.commit('main/SET_VISIBLE_DATA', this.data);
                }
            },

            prev() {
                if (this.currentPage > 1) {
                    this.$store.commit('main/SET_CURRENT_PAGE', this.currentPage - 1);
                    if (this.findData.length) this.$store.commit('main/SET_VISIBLE_DATA', this.findData);
                    else this.$store.commit('main/SET_VISIBLE_DATA', this.data);
                }
            }
        },

        computed: {
            ...mapGetters('main', {
                totalPage: 'getTotalPage',
                currentPage: 'getCurrentPage',
                data: 'getData',
                findData: 'getFindData'
            }),
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
