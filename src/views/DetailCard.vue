<template>
  <div :class="$style.detailPage">
    <span>{{detailInformation}}</span>
  </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "DetailCard",

        props: {
            id: {
                type: String,
                default: ''
            }
        },

        computed: {
            ...mapState('main', [
                'deleteObject',
                'data'
            ]),

            detailInformation() {
                let notDeletdata = this.data.find(item => item.id === this.id);
                if (notDeletdata) return notDeletdata;

                return this.deleteObject.find(item => item.id === this.id);
            }
        }
    }
</script>

<style lang="scss" module>
  .detailPage {
    font-size: 16px;
  }
</style>
