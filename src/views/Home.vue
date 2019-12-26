<template>
  <div class="home">
    <canvas id="love" :width="width + 'px'" :height="height + 'px'"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      width: '',
      height: '',
    };
  },
  methods: {
    computeSize() {
      this.width = document.body.offsetWidth;
      this.height = document.body.offsetHeight - 6;
      window.onresize = () => {
        this.width = document.body.offsetWidth;
        this.height = document.body.offsetHeight - 6;
      };
    },
    draw() {
      // eslint-disable-next-line no-unused-vars
      function getArr(a, len) {
        // eslint-disable-next-line prefer-const
        let arr = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < len; i++) {
          const step = i / len * (Math.PI * 2);
          const vector = {
            // eslint-disable-next-line no-restricted-properties
            x: a * (16 * Math.pow(Math.sin(step), 3)),
            // eslint-disable-next-line max-len
            y: -a * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step)),
          };
          arr.push(vector);
        }
        return arr;
      }
      setInterval(() => {
        this.cxt.beginPath();
        const random = this.Randoms(this.width, this.height);
        this.cxt.translate(random[0], random[1]);
        this.cxt.strokeStyle = 'red';
        this.cxt.lineWidth = 1;
        const len = 50;
        const arr = getArr(this.Random(1, 9), 50);
        console.log(arr);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < len; i++) {
          this.cxt.lineTo(arr[i].x, arr[i].y);
        }
        this.cxt.stroke();
        this.cxt.closePath();
      }, 200);
    },
    Randoms(w, h) {
      return [Math.round(Math.random() * (w)), Math.round(Math.random() * (h))];
    },
    Random(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
  },
  mounted() {
    this.love = document.getElementById('love');
    this.cxt = this.love.getContext('2d');
    this.computeSize();
    this.draw(this.Randoms(this.width, this.height));
  },
  components: {},
};
</script>
<style scoped lang="scss">
</style>
