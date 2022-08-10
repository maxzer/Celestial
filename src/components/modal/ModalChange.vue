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
    import {mapGetters} from 'vuex';

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
            changeObject() {
                let currentIndex = this.data.findIndex(item => item.id === this.currentItem.id);

                this.$store.commit('main/SET_ITEM_BY_INDEX', [currentIndex, {
                    discoveredBy: this.name,
                    discoveryDate: this.date,
                    englishName: this.nameObject,
                    isPlanet: this.isPlanet,
                    id: this.nameObject ? this.nameObject : currentIndex
                }]);

                if (this.findData.length) {
                    this.$store.commit('main/SET_VISIBLE_DATA', this.findData);
                }
                else this.$store.commit('main/SET_VISIBLE_DATA', this.data);

                this.$store.commit('main/SET_FLAG_STATUS', ['isModalChange', false]);
            }
        },

        computed: {
            ...mapGetters('main', {
                data: 'getData',
                findData: 'getFindData'
            }),
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
