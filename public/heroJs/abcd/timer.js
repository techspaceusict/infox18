  // var ProgressBar = require('progressbar.js')

  var elements = document.getElementById('s');
  var elementm = document.getElementById('m');
  var elementh = document.getElementById('h');
  var elementd = document.getElementById('d');

  var seconds = new ProgressBar.Circle(elements, {
      duration: 200,
      color: "yellow",
      trailColor: "white",
      strokeWidth: 5,
      trailWidth: 3
  });
  var minutes = new ProgressBar.Circle(elementm, {
      duration: 200,
      color: "orange",
      trailColor: "white",
      strokeWidth: 5,
      trailWidth: 3
  });
  var hours = new ProgressBar.Circle(elementh, {
      duration: 200,
      color: "orangered",
      trailColor: "white",
      strokeWidth: 5,
      trailWidth: 3
  });
  var days = new ProgressBar.Circle(elementd, {
      duration: 200,
      color: "red",
      trailColor: "white",
      strokeWidth: 5,
      trailWidth: 3
  });

  shortcode_date = '2018-10-26T00:00:00'
  
  setInterval(function() {
      now = new Date(); 
    countTo = new Date(shortcode_date);
    difference = countTo - now;
      var second = Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
      seconds.animate(second / 60, function() {
          seconds.setText("<span class=\"number\">" + second + "</span>" + "<span class=\"label\">Seconds</span>");
      });
  }, 1000);
  setInterval(function() {
      now = new Date(); 
    countTo = new Date(shortcode_date);
    difference = countTo - now;
      var minute = Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
      minutes.animate(minute / 60, function() {
          minutes.setText("<span class=\"number\">" + minute + "</span>" + "<span class=\"label\">Minutes</span>");
      });
  }, 1000);
  setInterval(function() {
      now = new Date(); 
    countTo = new Date(shortcode_date);
    difference = countTo - now;
      var hour = Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
      hours.animate(hour / 24, function() {
          hours.setText("<span class=\"number\">" + hour + "</span>" + "<span class=\"label\">Hours</span>");
      });
  }, 1000);
  setInterval(function() {
      now = new Date(); 
    countTo = new Date(shortcode_date);
    difference = countTo - now;
      var day = Math.floor(difference/(60*60*1000*24)*1);
    days.animate(day / (day + 5), function() {
          days.setText("<span class=\"number\">" + day + "</span>" + "<span class=\"label\">Days</span>");
      });
  }, 1000);