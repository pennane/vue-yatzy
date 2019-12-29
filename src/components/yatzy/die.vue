<template>
  <div class="die-wrapper">
    <div
      v-if="number"
      :class="[
        'die-inner-wrapper',
        this.rolling ? 'rolling' : null,
        this.selected ? 'selected' : null
      ]"
      :style="{
        animationDelay: this.index * 80 + 400 + 'ms'
      }"
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
  name: "Yatzy",
  data: () => {
    return {
      rolling: null,
      selected: false,
      rotation: Math.floor(Math.random() * (10 + 10 + 1)) - 10
    };
  },
  props: {
    number: {
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    number: function(newVal, oldVal) {
      this.setRotation();
    }
  },
  methods: {
    select(bool) {
      let value = bool ? bool : !this.selected;
      this.selected = value;
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
    setRotation() {
      let degree = Math.floor(Math.random() * (10 + 10 + 1)) - 10;
      this.rotation = degree;
    }
  },
  computed: {
    image: function() {
      return require("@/assets/dice/die" + this.number + ".png");
    }
  },
  created() {
    this.rolling = true;
    this.$store.watch(
      (state, getters) => getters.selectedDice,
      (newValue, oldValue) => {
        this.selected = newValue[this.index];
      }
    );
  }
};
</script>

<style scoped>
.die-wrapper {
  height: 160px;
  display: flex;
}

.die-inner-wrapper {
  height: 40px;
  width: 40px;
  margin: 0.3em;
}

.die {
  height: 40px;
  width: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.selected {
  align-self: flex-end;
}

.rolling {
  animation: roll 1s;
  animation-delay: 1s;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(400deg);
  }
}
</style>
