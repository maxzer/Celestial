<template>
  <div :class="$style.container">
    <div :class="$style.body">
      <div :class="$style.attention">
        <h2>Change celestial body</h2>
        <input v-model="name" placeholder="Your name">
        <input v-model="date" placeholder="Date">
        <input v-model="nameObject" placeholder="Name object">
        <input v-model="isPlanet" placeholder="Is planet?">
        <button @click="changeObject()">
          add object
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "ModalChange",

        props: {
            currentItem: {
                type: Object,
                default: () => ({}),
            }
        },

        data() {
            return {
                name: '',
                date: '',
                nameObject: '',
                isPlanet: ''
            }
        },

        methods: {
            ...mapMutations('main', {
                setVisibleData: 'SET_VISIBLE_DATA',
                setFlag: 'SET_FLAG_STATUS',
                setItemByIndex: 'SET_ITEM_BY_INDEX'

            }),

            changeObject() {
                let currentIndex = this.data.findIndex(item => item.id === this.currentItem.id);

                this.setItemByIndex([currentIndex, {
                    discoveredBy: this.name,
                    discoveryDate: this.date,
                    englishName: this.nameObject,
                    isPlanet: this.isPlanet,
                    id: this.nameObject ? this.nameObject : currentIndex
                }]);

                if (this.findData.length) {
                    this.setVisibleData(this.findData);
                } else this.setVisibleData(this.data);

                this.setFlag(['isModalChange', false]);
            }
        },

        computed: {
            ...mapState('main', [
                'data',
                'findData'
            ]),
        },
    }
</script>

<style lang="scss" module>
  .container {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100vh;
      background: gray;
      opacity: .3;
    }
  }

  .body {
    position: absolute;
    width: 400px;
    height: 250px;
    background: #fff;
    border-radius: 8px;
    z-index: 10;
  }

  .attention {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  input {
    margin-bottom: 8px;
  }

  button {
    cursor: pointer;
  }
</style>
