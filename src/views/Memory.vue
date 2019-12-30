<template>
  <div class="memory">
    <div id="pop"></div>
    <div class="content">
      <div class="words-wrap">
        <span class="words"></span>
      </div>
    </div>
    <div class="footer"></div>
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
    return {};
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
      };
      let typed = new Typed('.words', options);
    },
  },
  created() {
    this.createdPop();
    this.$nextTick(() => {
      this.createdWords();
    });
    // console.log(this.$route);
    if (this.$route.params.id !== '19920223') {
      // this.$router.push({ name: 'home' });
    }
  },
};
</script>
<style scoped lang="scss">
.memory {
  position: relative;
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    left: 50%;
    top: 46%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 80%;
    border:4px solid #000;
    border-radius: 20px;
    background-color: rgba($color: #fff, $alpha: .9);
    .words-wrap {
      padding: 10px;
      .words {
        text-indent:2em;
        font-size: 18px;
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    top: 3px;
    width: 100%;
    height: 100%;
    background-image: url('../assets/footer.png');
    background-position: 50% 100%;
    background-repeat: no-repeat;
  }
}
</style>
