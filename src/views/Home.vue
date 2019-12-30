<template>
  <div class="home">
    <canvas id="c"
            :width="width + 'px'"
            :height="height + 'px'"></canvas>
    <div class="container">
      <div class="text"
           id="text"
           v-if="content">
        <div id="content"></div>
      </div>
      <input v-model="pwd"
             type="password"
             @keyup.enter="skip"
             :class="{'show-input': input}"
             v-if="input"
             class="pwd">
      <span class="error"></span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import Typed from 'typed.js';
export default {
  name: "home",
  data() {
    return {
      width: "",
      height: "",
      content: false,
      input: false,
      pwd: "",
      errorTyped: null,
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
      let canvas = document.getElementById("c");
      let ctx = canvas.getContext("2d");
      let c = $("#c");
      let w, h;
      let pi = Math.PI;
      let all_attribute = {
        num: 100, // 个数
        start_probability: 0.1, // 如果数量小于num，有这些几率添加一个新的
        size_min: 1, // 初始爱心大小的最小值
        size_max: 2, // 初始爱心大小的最大值
        size_add_min: 0.3, // 每次变大的最小值（就是速度）
        size_add_max: 0.5, // 每次变大的最大值
        opacity_min: 0.3, // 初始透明度最小值
        opacity_max: 0.5, // 初始透明度最大值
        opacity_prev_min: 0.003, // 透明度递减值最小值
        opacity_prev_max: 0.005, // 透明度递减值最大值
        light_min: 0, // 颜色亮度最小值
        light_max: 90 // 颜色亮度最大值
      };
      let style_color = find_random(0, 360);
      let all_element = [];
      window_resize();
      function start() {
        window.requestAnimationFrame(start);
        style_color += 0.1;
        //更改背景色hsl(颜色值，饱和度，明度)
        ctx.fillStyle = "hsl(" + style_color + ",100%,97%)";
        ctx.fillRect(0, 0, w, h);
        if (
          all_element.length < all_attribute.num &&
          Math.random() < all_attribute.start_probability
        ) {
          all_element.push(new ready_run());
        }
        all_element.map(function (line) {
          line.to_step();
        });
      }
      function ready_run() {
        this.to_reset();
      }
      function arc_heart(x, y, z, m) {
        //绘制爱心图案的方法，参数x,y是爱心的初始坐标，z是爱心的大小，m是爱心上升的速度
        //爱心向左飘
        //							 x+=m;
        //爱心向右飘
        //							x-=m;
        //							爱心向上飘，向下飘换成+
        y -= m * 10;

        ctx.moveTo(x, y);
        z *= 0.05;
        ctx.bezierCurveTo(
          x,
          y - 3 * z,
          x - 5 * z,
          y - 15 * z,
          x - 25 * z,
          y - 15 * z
        );
        ctx.bezierCurveTo(
          x - 55 * z,
          y - 15 * z,
          x - 55 * z,
          y + 22.5 * z,
          x - 55 * z,
          y + 22.5 * z
        );
        ctx.bezierCurveTo(
          x - 55 * z,
          y + 40 * z,
          x - 35 * z,
          y + 62 * z,
          x,
          y + 80 * z
        );
        ctx.bezierCurveTo(
          x + 35 * z,
          y + 62 * z,
          x + 55 * z,
          y + 40 * z,
          x + 55 * z,
          y + 22.5 * z
        );
        ctx.bezierCurveTo(
          x + 55 * z,
          y + 22.5 * z,
          x + 55 * z,
          y - 15 * z,
          x + 25 * z,
          y - 15 * z
        );
        ctx.bezierCurveTo(x + 10 * z, y - 15 * z, x, y - 3 * z, x, y);
      }
      ready_run.prototype = {
        to_reset: function () {
          let t = this;
          t.x = find_random(0, w);
          t.y = find_random(0, h);
          t.size = find_random(all_attribute.size_min, all_attribute.size_max);
          t.size_change = find_random(
            all_attribute.size_add_min,
            all_attribute.size_add_max
          );
          t.opacity = find_random(
            all_attribute.opacity_min,
            all_attribute.opacity_max
          );
          t.opacity_change = find_random(
            all_attribute.opacity_prev_min,
            all_attribute.opacity_prev_max
          );
          t.light = find_random(
            all_attribute.light_min,
            all_attribute.light_max
          );
          t.color = "hsl(" + style_color + ",100%," + t.light + "%)";
        },
        to_step: function () {
          let t = this;
          t.opacity -= t.opacity_change;
          t.size += t.size_change;
          if (t.opacity <= 0) {
            t.to_reset();
            return false;
          }
          ctx.fillStyle = t.color;
          ctx.globalAlpha = t.opacity;
          ctx.beginPath();
          arc_heart(t.x, t.y, t.size, t.size);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      };

      function window_resize() {
        //				canvas铺满窗口
        w = window.innerWidth;
        h = window.innerHeight - 6;
        //如果需要铺满内容可以换下面这个
        //				w=$("body").width();
        //				h=$("body").height();
        canvas.width = w;
        canvas.height = h;
      }
      $(window).resize(function () {
        window_resize();
      });

      //返回一个介于参数1和参数2之间的随机数
      function find_random(num_one, num_two) {
        return Math.random() * (num_two - num_one) + num_one;
      }

      start();
    },
    typedText() {
      let options = {
        strings: ['小何', '小小苗', '傻猪猪^1000，在小米', '傻猪猪，在下面', '傻猪猪，在下面输入你的生日，再按回车....'],
        typeSpeed: 100,
        backSpeed: 200,
        onComplete: () => {
          this.input = true;
        }
      };
      let typed = new Typed('#content', options);
      typed.onStop = () => {
        this.input = true;
      }
    },
    skip() {
      this.$router.push({ name: 'memory', params: { id: this.pwd } })
    },
    pwdError() {
      let options = {
        strings: ['错了，傻猪猪～'],
        typeSpeed: 100,
      };
      this.errorTyped = new Typed('.error', options);
    },
  },
  mounted() {
    this.$router.push({ name: 'memory', params: { id: this.pwd } })
    this.draw();
    setTimeout(() => {
      this.content = true;
      this.$nextTick(() => {
        this.typedText();
      })
    }, 1000);
  },
  watch: {
    pwd(v) {
      if(!v) {
        this.errorTyped ? this.errorTyped.destroy() : '';
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (this.pwd !== '19920223') {
      this.pwdError();
      return false;
    } else {
      next();
    }
  },
  components: {}
};
</script>
<style scoped lang="scss">
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
}
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .container {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 100px;
    #content {
      display: inline-block;
      margin-bottom: 20px;
    }
    .pwd {
      border: none;
      width: 320px;
      height: 36px;
      line-height: 36px;
      border-radius: 10px;
      outline: none;
      padding: 0 10px;
      display: block;
    }
    .show-input {
      animation: show 3s;
    }
    .error {
      margin-top: 10px;
      font-size: 14px;
      display: inline-block;
      color: #e6720c;
    }
  }
}
</style>
