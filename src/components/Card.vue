<template>
  <div :class="$style.card" @click.self="$router.push({ name: 'DetailCard', params: {id: item.id} })">
    <div :class="$style.information">
      <div>
        Open: {{ item.discoveredBy }}
      </div>
      <div>
        Date: {{ item.discoveryDate }}
      </div>
      <div>
        Object: {{ item.englishName }}
      </div>
      <div>
        Planet: {{ item.isPlanet }}
      </div>
    </div>

    <div v-if="visibleNavigation" :class="$style.wrapper">
      <button :class="$style.remove"
              @click="remove(item)"
      >
        Remove
      </button>
      <button :class="$style.change"
              @click="change(item)"
      >
        Change
      </button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Card",

        props: {
            item: {
                type: Object,
                default: () => ({})
            },

            visibleNavigation: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            remove() {
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalRemove', true]);
                this.$emit('currentItem', this.item)
            },

            change() {
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalChange', true]);
                this.$emit('currentItem', this.item)
            },
        }
    }
</script>

<style lang="scss" module>
  .card {
    width: 100%;
    border: 1px solid gray;
    margin-bottom: 20px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    transition: all .3s ease;
    position: relative;

    &:hover {
      transform: translate(0, -5px);
      cursor: pointer;
    }
  }

  .information {
    display: flex;
    flex-direction: column;
  }

  .wrapper {
    display: flex;
    height: 20px;
  }

  .remove, .change {
    margin-right: 20px;
  }

  .change {
    margin-right: 12px;
  }

  .routeLink {
    position: absolute;
    width: 100%;
    height: 100%;
    background: red;
  }
</style>
