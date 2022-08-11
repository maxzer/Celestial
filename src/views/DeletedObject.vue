<template>
  <div :class="$style.container">
    <h1>Deleted Celestial</h1>

    <Card v-for="item in deleteObject"
          :item="item"
          :visible-navigation="false"
          :key="item.id"
          @currentItem="currentItem = $event"
    />
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Card from '../components/Card'

    export default {
        name: 'DeletedObject',

        components: {
            Card,
        },

        data() {
            return {
                currentItem: null,
            }
        },

        computed: {
            ...mapState('main', [
                'deleteObject',
            ]),

        },
    };
</script>

<style lang="scss" module>
  .container {
    max-width: 1280px;
    margin: auto;
  }
</style>
