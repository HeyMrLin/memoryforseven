<template>
  <div class="memory">
    <div id="pop"></div>
    <div class="content"
         :class="show_text ? 'show' : 'hide'">
      <div class="timer">我们已经在一起{{time}}了</div>
      <div class="words-wrap">
        <span class="words"></span>
      </div>
    </div>
    <div class="footer"
         :class="show_text ? 'show' : 'hide'"></div>
    <div class="tip"
         :class="{'hide' : tip, 'show-tip' : show_tip}"
         v-if="destroy_tip">
      <div class="tip-pos">
        <div class="tip-text">
          <div class="tip-content">
            <p class="content-text"
               ref="text">戴上耳机吧，给你点首《告白气球》</p>
          </div>
          <p class="tip-btn-list">
            <span class="tip-btn"
                  @click="adorn('n')">不戴</span>
            <span class="tip-btn"
                  @click="adorn('y')">戴上了</span>
          </p>
        </div>
      </div>
      <img src="../assets/dialog.png">
    </div>
    <audio id="music"
           src="../assets/music/告白气球.mp3"
           preload
           loop></audio>
    <div class="pic"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Typed from 'typed.js';
const roughs = require('@/assets/wmgwdw');
const rough = new roughs();
export default {
  name: 'Memory',
  data() {
    return {
      time: null,
      show_text: false,
      tip: false,
      destroy_tip: true,
      show_tip: false,
    };
  },
  methods: {
    createdPop() {
      let _this = this;
      var extend = function extend(base) {
        for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          extensions[_key - 1] = arguments[_key];
        }

        return Object.assign.apply(Object, [{}, base].concat(extensions));
      };

      var parseColor = function parseColor(_ref) {
        var h = _ref.h,
          s = _ref.s,
          l = _ref.l,
          a = _ref.a;
        return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
      };

      var Color = extend.bind(null, {
        h: 0,
        s: 100,
        l: 100,
        a: 1
      });

      var Vector = extend.bind(null, {
        x: 0,
        y: 0
      });

      var Particle = extend.bind(null, {
        pos: Vector(),
        vel: Vector(),
        angle: 0,
        speed: 0,
        radius: 0,
        rotation: 0,
        color: Color()
      });

      var colors = [Color({
        h: 20,
        s: 100,
        l: 50
      }), Color({
        h: 200,
        l: 50
      }), Color({
        h: 300,
        l: 50
      }), Color({
        h: 100,
        l: 40
      })];

      var animationLoop = function animationLoop(scope) {
        if (scope.animation) {
          scope.animation(animationLoop.bind(null, scope));
        }

        var ctx = scope.ctx;
        var canvas = ctx.canvas;

        var rc = rough.canvas(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        scope.particles.map(function (p, i) {
          p.pos.y -= p.speed;
          if (i % 2) {
            p.pos.x = p.pos.x + Math.sin(p.angle) * .2;
          } else {
            p.pos.x = p.pos.x - Math.cos(p.angle) * .2;
          }
          p.angle += .01;
          rc.circle(p.pos.x, p.pos.y, p.radius, {
            fill: parseColor(p.color),
            roughness: Math.random() * 1.5,
            hachureGap: p.hachureGap,
            hachureAngle: p.hachureAngle
          });
          rc.line(p.pos.x, p.pos.y + p.radius * 1.2, p.pos.x, p.pos.y + p.radius / 2, {
            bowing: Math.random() * 3
          });
          if (p.pos.y + p.radius * 3 < 0) {
            p.pos.y = canvas.height + p.radius * 3;
            p.pos.x = Math.random() * (canvas.width - p.radius);
          }
        });
      };

      var scope = {
        animation: requestAnimationFrame.bind(null),
        ctx: document.createElement('canvas').getContext('2d'),
        title: 'Brian Douglas',
        rotation: 0,
        particles: []
      };

      ~ function (scope) {
        var canvas = scope.ctx.canvas;


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // let pop = $('#pop');
        // console.log(canvas);
        _this.$nextTick(() => {
          let pop = document.getElementById('pop');
          pop.appendChild(canvas);
        })

        var particleCount = 50;
        while (particleCount--) {
          scope.particles.push(Particle({
            pos: {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height
            },
            speed: Math.random() + .2,
            radius: Math.random() * 60 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            hachureAngle: Math.random() * 90,
            hachureGap: Math.random() * 8 + 1
          }));
        }

        animationLoop(scope);
      }(scope);

      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
          scope.ctx.canvas.width = window.innerWidth;
          scope.ctx.canvas.height = window.innerHeight;
        });
      }
    },
    createdWords() {
      const options = {
        strings: ['你好，放哪放呢我i哦啊发我i哦啊发我i哦啊发我i哦啊发我i哦啊发我i哦啊发if你我阿福年份i额外按分外分玩废我啊分为奥芬懊恼分啊佛乃佛额外'],
        typeSpeed: 40,
      };
      let typed = new Typed('.words', options);
    },
    toNow() {
      let start = this.$moment(new Date('2013', '0', '09', '0', '20', '00'));
      let now = this.$moment(new Date());
      let diff_days = now.diff(start, 'days');
      let diff_hours = now.diff(start, 'hours');
      let diff_minutes = now.diff(start, 'minutes');
      let diff_seconds = now.diff(start, 'seconds');
      let hours = diff_hours - diff_days * 24;
      let minutes = diff_minutes - diff_days * 24 * 60 - hours * 60;
      let seconds = diff_seconds - diff_days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
      return `${diff_days}天${hours}小时${minutes}分钟${seconds}秒`;
    },
    computedTime() {
      this.time = this.toNow();
      let timer = setTimeout(() => {
        this.time = this.toNow();
        clearTimeout(timer);
        this.computedTime();
      }, 1000);
    },
    playMusic() {
      let m = document.getElementById('music');
      m.play();
    },
    hideTip(music = false) {
      this.tip = true;
      setTimeout(() => {
        this.destroy_tip = false;
        // this.showContent();
        music ? this.playMusic() : '';
      }, 1000);
    },
    showContent() {
      this.show_text = true;
      setTimeout(() => {
        this.createdWords();
      }, 1000)
    },
    adorn(type = 'y') {
      if (type === 'y') {
        this.hideTip(true);
      } else {
        this.$refs.text.innerHTML = '';
        const options = {
          strings: ['那等会再听～'],
          typeSpeed: 60,
        };
        let typed = new Typed('.content-text', options);
        setTimeout(() => {
          this.hideTip();
        }, options.strings[0].length * options.typeSpeed + 1600);
      }
    },
  },
  created() {
    this.computedTime();
    // this.createdPop();
    if (this.$route.params.id !== '19920223') {
      this.$router.push({ name: 'home' });
    }
  },
  mounted() {
    this.show_tip = true;
  },
};
</script>
<style scoped lang="scss">
.memory {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .content {
    font-family: "xlo";
    position: absolute;
    left: 50%;
    top: 46%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 80%;
    border: 4px solid #000;
    border-radius: 20px;
    background-color: rgba($color: #fff, $alpha: 0.9);
    .words-wrap {
      padding: 20px;
      text-indent: 2em;
      .words {
        font-size: 18px;
      }
    }
    .timer {
      text-align: right;
      margin: 10px 30px 0 0;
      font-size: 18px;
      color: #d2963c;
    }
  }
  .footer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/footer.png");
    background-position: 50% 101%;
    background-repeat: no-repeat;
  }
  .tip {
    width: 400px;
    height: 321px;
    margin: 0 auto;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    .content-text {
      display: inline-block;
    }
    .tip-pos {
      position: relative;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .tip-text {
      font-family: "xlo";
      position: absolute;
      left: 46px;
      top: 90px;
      width: 350px;
      .tip-content {
        font-size: 26px;
        height: 62px;
      }
      .tip-btn-list {
        text-align: right;
        margin: 14px 55px 0 0px;
      }
      .tip-btn {
        font-size: 22px;
        text-align: right;
        cursor: pointer;
        text-shadow: 2px 2px 2px rgba($color: #000, $alpha: 0.3);
      }
      .tip-btn:last-child {
        margin-left: 26px;
      }
    }
  }
  .show-tip {
    opacity: 1;
    transition: opacity 1s;
  }
  .hide {
    opacity: 0;
    transition: opacity 1s;
  }
  .show {
    opacity: 1;
    transition: opacity 2s;
  }
  .pic {
    width: 200px;
    height: 300px;
    background-color: aqua;
    position: absolute;
    right: -180px;
    top: 40%;
    transform-origin: top left;
    transform: rotate(-12deg);
    transition: transform .6s;
  }
  .pic:hover {
    transform: translateX(-180px);
    transition: transform .6s;
  }
}
</style>
