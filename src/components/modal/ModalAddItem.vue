<template>
  <div :class="$style.container">
    <div :class="$style.body">
      <div :class="$style.attention">
        <h2>Add celestial body</h2>
        <input v-model="name" placeholder="Your name">
        <input v-model="date" placeholder="Date">
        <input v-model="nameObject" placeholder="Name object">
        <input v-model="isPlanet" placeholder="Is planet?">
        <button @click="addObject()">
          add object
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "ModalAddItem",

        data() {
            return {
                name: null,
                date: null,
                nameObject: null,
                isPlanet: null
            }
        },

        methods: {
            ...mapMutations('main', {
                setAddObject: 'SET_ADD_OBJECT',
                setVisibleData: 'SET_VISIBLE_DATA',
                setFlag: 'SET_FLAG_STATUS',
            }),

            addObject() {
                this.setAddObject({
                    discoveredBy: this.name,
                    discoveryDate: this.date,
                    englishName: this.nameObject,
                    isPlanet: this.isPlanet,
                    id: this.nameObject,
                });
                this.setFlag(['isModalAdd', false]);
                if (this.findData.length) this.setVisibleData(this.findData);
                else this.setVisibleData(this.data)
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
