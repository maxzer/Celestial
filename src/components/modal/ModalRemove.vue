<template>
  <div :class="$style.container">
    <div :class="$style.body">
      <div :class="$style.attention">
        <h2>Remove celestial body</h2>
        <h3>
          are you sure?
        </h3>
        <div :class="$style.textWrapper">
          <button @click="removeBody()">
            yes
          </button>
          <button @click="refuse()">
            no
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Modal",

        props: {
            currentItem: {
                type: Object,
                default: () => ({}),
            }
        },

        methods: {
            refuse() {
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalOpen', false]);
            },

            removeBody() {
                let data = this.data.filter(item => item.id !== this.currentItem.id);
                this.$store.commit('main/SET_DATA', data);
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalOpen', false]);
                this.$store.commit('main/SET_DELETE_OBJECT', this.currentItem);
            }
        },

        computed: {
            ...mapGetters('main', {
                data: 'getData',
                currentPage: 'getCurrentPage'
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
    height: 200px;
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

  .textWrapper {
    display: flex;

    button {
      margin-right: 16px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
