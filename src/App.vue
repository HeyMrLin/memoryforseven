<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
@font-face {
  font-family: "xlo";
  src: url("./fonts/xlo.eot");
  src: url("./fonts/xlo.eot?#font-spider") format("embedded-opentype"),
    url("./fonts/xlo.woff") format("woff"),
    url("./fonts/xlo.ttf") format("truetype"),
    url("./fonts/xlo.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}
</style>
