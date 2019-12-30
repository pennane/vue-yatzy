<template>
  <div class="die-wrapper" :class="[rolling || displayDice ? 'rolling' : null]">
    <div
      :class="[
        'die-inner-wrapper',
        selectedClass ? 'selected' : null,
        lastSelection ? 'last-selection' : null,
        hidden ? 'hidden' : null
      ]"
      @click="select()"
    >
      <div
        class="die"
        :style="{
          backgroundImage: 'url(' + this.image + ')',
          transform: 'rotate(' + this.rotation + 'deg)'
        }"
      />
    </div>
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "Die",
  data: () => {
    return {
      selected: null,
      rotation: Math.floor(Math.random() * (10 + 10 + 1)) - 10,
      hidden: null
    };
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    select(bool) {
      if (this.moves <= 0) return;
      if (this.displayDice) return;
      let value = bool ? bool : !this.selected;
      this.setSelected(value);
      if (value) {
        this.$store.commit("selectDie", {
          index: this.index
        });
      } else {
        this.$store.commit("unselectDie", {
          index: this.index
        });
      }
    },
    setSelected(bool) {
      this.selected = bool;
    },
    setRotation() {
      let degree = Math.floor(Math.random() * (10 + 10 + 1)) - 10;
      this.rotation = degree;
    }
  },
  computed: {
    image: function() {
      return require("@/assets/dice/die" + this.number + ".png");
    },
    moves: function() {
      return this.$store.getters.moves;
    },
    number: function() {
      return this.$store.getters["die" + this.index];
    },
    rolling: function() {
      return this.$store.getters.currentlyRolling;
    },
    lastSelection: function() {
      return this.moves === 0;
    },
    selectedClass: function() {
      return this.selected && this.moves > 0;
    },
    displayDice: function() {
      return this.$store.getters.displayDice;
    }
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.selectedDice,
      (newValue, oldValue) => {
        this.setSelected(newValue[this.index]);
      }
    );
  }
};
</script>

<style scoped>
.die-wrapper {
  height: 120px;
  display: flex;
  width: 50px;
  position: relative;
}

.die-inner-wrapper {
  height: 40px;
  width: 40px;
  margin: 0.3em;
  top: 0;
  position: absolute;
  transition: all 0.6s;
  transition-timing-function: ease;
}

.die {
  height: 40px;
  width: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: all 0.6s;
  box-shadow: 5px 4px 0px 0 rgba(0, 0, 0, 0.5);
}

.rolling:nth-child(1) > .die-inner-wrapper:not(.selected) {
  transition: all 0.6s;
  transform: translate(100px, -20px);
}

.rolling:nth-child(2) > .die-inner-wrapper:not(.selected) {
  transform: translate(50px, -20px);
}

.rolling:nth-child(3) > .die-inner-wrapper:not(.selected) {
  transform: translate(0, -20px);
}

.rolling:nth-child(4) > .die-inner-wrapper:not(.selected) {
  transform: translate(-50px, -20px);
}

.rolling:nth-child(5) > .die-inner-wrapper:not(.selected) {
  transform: translate(-100px, -20px);
}

.selected {
  top: 100%;
}

.last-selection {
  top: 45%;
}

.last-selection .die {
  cursor: initial;
}

.hidden {
  visibility: hidden;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
