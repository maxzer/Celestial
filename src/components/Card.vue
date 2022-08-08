<template>
  <div :class="$style.card">
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

    <div :class="$style.wrapper">
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
            }
        },

        methods: {
            remove(currentItem) {
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalRemove', true]);
                this.$emit('currentItem', currentItem)
            },

            change(currentItem) {
                this.$store.commit('main/SET_FLAG_STATUS', ['isModalChange', true]);
                this.$emit('currentItem', currentItem)
            }
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
</style>
