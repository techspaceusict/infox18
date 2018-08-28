var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var app = new Vue({
    el: '#app',
    data: {
      OPTS: {
        fill: 'none',
        radius: 25,
        strokeWidth: { 50: 0 },
        scale: { 0: 1 },
        angle: { 'rand(-35, -70)': 0 },
        duration: 500,
        left: 0, top: 0,
        easing: 'cubic.out' },
  
      circle1: undefined,
      circle2: undefined },
  
  
    mounted: function mounted() {
      this.circle1 = new mojs.Shape(_extends({},
      this.OPTS, {
        stroke: 'cyan' }));
  
  
      this.circle2 = new mojs.Shape(_extends({},
      this.OPTS, {
        radius: { 0: 15 },
        strokeWidth: { 30: 0 },
        stroke: 'magenta',
        delay: 'rand(75, 150)' }));
  
    },
  
    methods: {
      tune: function tune(e) {
        this.circle1.
        tune({ x: e.pageX, y: e.pageY }).
        replay();
  
        this.circle2.
        tune({ x: e.pageX, y: e.pageY }).
        replay();
      } } });