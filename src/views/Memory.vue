<template>
  <div class="memory">
    <div id="pop"></div>
    <div class="content"
         :class="{'show': show_text,
         'hide': !show_text,
         'content-pc': !_isMobile, 'content-mobile': _isMobile}">
      <el-scrollbar>
        <!-- <div class="timer">我们已经在一起{{time}}了</div> -->
        <div class="words-wrap">
          <span class="words" :class="_isMobile ? 'font-size-14' : 'font-size-20'"></span>
        </div>
      </el-scrollbar>
    </div>
    <div class="footer"
         :class="{'show': show_text,
         'hide': !show_text,
         'footer-pc': !_isMobile,'footer-mobile': _isMobile}"></div>
    <div class="tip"
         :class="{'hide' : tip, 'show-tip' : show_tip,
         'tip-size': !_isMobile, 'tip-size-mobile': _isMobile}"
         v-if="destroy_tip">
      <div class="tip-pos">
        <div class="tip-text" :class="_isMobile ? 'tip-text-mobile' : 'tip-text-pc'">
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
    <div class="pic" :class="{'pic-pc': !_isMobile, 'pic-mobile': _isMobile}">
      <img src="https://linwordpressblog.oss-cn-shenzhen.aliyuncs.com/IMG_0169.jpeg">
    </div>
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
  computed: {
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
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

        var particleCount = _this._isMobile ? 20 : 50;
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
      const strings_style = this._isMobile ? 'section-mobile' : 'section-pc'
      const options = {
        strings: [`<span class="${strings_style} section">转眼，这已经是我们在一起的第七个年头了，是不是感觉礼物越送越简陋了😊，哈哈哈哈。此时此刻你在煎你的蛋，我在桌旁敲下这些字，我知道，等会就会有我吃的😘。</span><span class="${strings_style} section">记得在刚在一起的那个冬天，我们经常顶着寒风去神农城玩，虽然气温很低，但是我心里却是暖的，一点都不觉得冷。我们一起去过很多地方，去衡阳爬山，去凤凰坐船，去长沙跨年。再到后来我们在广州、深圳分隔两地的时候，坐很久的火车去看你也不觉得累，现在回想起来都觉得是一段超级美好的回忆。</span><span class="${strings_style} section">小苗，感谢你这些年的陪伴，以及包容，我从在校园里的不谙世事，到现在慢慢懂得很多为人处事的道理；而你也从那时的青涩少女，变成了如今知性成熟的大姑娘。这些年我们一起成长，一起面对，我相信未来的我们一定会变得更好。</span>`],
        // strings: ['<span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span><span class="section">这个权力是什么意思呢，它代表就算其他四大常任理事国及全球所有小国均同意某一件事，只要有一个常任理事国投下了反对票，那么这件事就通不过，这个权力之大，堪称政治霸权。</span>'],
        typeSpeed: 1,
        contentType: 'html',
        autoInsertCss: true,
        showCursor: false,
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
        this.showContent();
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
    this.createdPop();
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
    
    height: 80%;
    border: 4px solid #000;
    border-radius: 20px;
    background-color: rgba($color: #fff, $alpha: 0.9);
    /deep/
    .el-scrollbar__view {
      max-height: 100%;
    }
    .el-scrollbar {
      height: 100%;
    }
    /deep/
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .words-wrap {
      padding: 20px;
    }
    /deep/
    .section {
      text-indent: 2em;
      display: block;
    }
    /deep/
    .section-pc {
      line-height: 36px;
    }
    /deep/
    .section-mobile {
      line-height: 24px;
    }
    .timer {
      text-align: right;
      margin: 10px 30px 0 0;
      font-size: 18px;
      color: #d2963c;
    }
  }
  .content-pc {
    width: 60%;
  }
  .content-mobile {
    width: 90%;
  }
  .footer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/footer.png");
    
    background-repeat: no-repeat;
  }
  .footer-mobile {
    background-position: 50% 98%;
    background-size: 86%;
  }
  .footer-pc {
    background-position: 50% 101%;
    background-size: 80%;
  }
  .tip {
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
      
      .tip-btn-list {
        text-align: right;
      }
      .tip-btn {
        text-align: right;
        cursor: pointer;
        text-shadow: 2px 2px 2px rgba($color: #000, $alpha: 0.3);
      }
      .tip-btn:last-child {
        margin-left: 26px;
      }
    }
    .tip-text-pc {
      left: 46px;
      top: 90px;
      width: 350px;
      .tip-content {
        font-size: 26px;
        height: 62px;
      }
      .tip-btn-list {
        margin: 14px 55px 0 0px;
      }
      .tip-btn {
        font-size: 22px;
      }
    }
    .tip-text-mobile {
      left: 46px;
      top: 72px;
      width: 246px;
      .tip-content {
        font-size: 18px;
        height: 52px;
      }
      .tip-btn-list {
        margin: 0px 55px 0 0px;
      }
      .tip-btn {
        font-size: 16px;
      }
    }
  }
  .tip-size {
    width: 400px;
    height: 321px;
  }
  .tip-size-mobile {
    width: 300px;
    height: 241px;
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
    position: absolute;
    top: 40%;
    transform-origin: top left;
    transform: rotate(-12deg);
    transition: transform .6s;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pic-pc {
    width: 240px;
    height: 320px;
    right: -220px;
  }
  .pic-mobile {
    width: 120px;
    height: 160px;
    right: -110px;
  }
  .pic-pc:hover {
    transform: translateX(-220px);
    transition: transform .6s;
  }
  .pic-mobile:hover {
    transform: translateX(-110px);
    transition: transform .6s;
  }
  .font-size-26 {
    font-size: 26px;
  }
  .font-size-20 {
    font-size: 20px;
  }
  .font-size-14 {
    font-size: 14px;
  }
}
</style>
