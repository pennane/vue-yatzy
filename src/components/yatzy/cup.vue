<template>
  <div class="cup-wrapper" @click="roll">
    <img :class="['cup', onScreen ? 'show' : null, wiggle ? 'wiggle' : null]" :src="url" />
  </div>
</template>

<script>
import gamelogic from "@/gamelogic";

export default {
  name: "Yatzy",
  data: () => {
    return {
      url: require("@/assets/kuppi.png"),
      wiggle: false,
      show: false,
      sound: require("@/assets/roll.ogg")
    };
  },
  methods: {
    async roll() {
      const sleep = this.$root.sleep;
      this.show = true;
      await sleep(800);

      this.wiggle = true;
      await sleep(200);
      this.playRollingSound();
      await sleep(700);
      this.wiggle = false;
      await sleep(30);
      this.show = false;
    },
    playRollingSound() {
      let play = this.$root.playSound;
      play(this.sound);
    }
  },
  computed: {
    rolling() {
      return this.$store.getters["game/getCurrentlyRolling"];
    },
    displayDice() {
      return this.$store.getters["game/getDisplayDice"];
    },
    gameNotStarted() {
      return this.$store.getters["game/getNoGameStarted"];
    },
    onScreen() {
      return this.show || this.displayDice || this.gameNotStarted;
    }
  },
  watch: {
    rolling: function(newValue, oldValue) {
      if (newValue === true) {
        this.roll();
      }
    }
  },
  created() {
    window.hackermode = () => {
      this.hackermode = true;
    };
  }
};
</script>

<style scoped>
.cup-wrapper {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.cup {
  width: 280px;
  will-change: transform;
  transform: translate3d(260px, -30px, 0);
  transform: translate3d(260px, -50px, 0);
  transition: all 0.8s;
  padding-top: 1em;
}

.show {
  transform: translate3d(0, 15px, 0);
  transform: translate3d(0, 0, 0);
}

.wiggle {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 15px, 0);
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
