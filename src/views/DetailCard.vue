<template>
  <div :class="$style.detailPage">
    <span>{{detailInformation}}</span>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "DetailCard",

        props: {
            id: {
                type: String,
                default: ''
            }
        },


        computed: {
            ...mapGetters('main', {
                data: 'getData',
                deleteObject: 'getDeleteObject'
            }),

            detailInformation() {
                let notDeletdata = this.data.filter(item => item.id === this.id)[0];
                if (notDeletdata) return notDeletdata;
                return this.deleteObject.filter(item => item.id === this.id)[0];
            }
        }
    }
</script>

<style lang="scss" module>
  .detailPage {
    font-size: 16px;
  }
</style>
