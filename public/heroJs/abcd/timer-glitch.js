$(document).ready(function () {

    function second_passed() {
      $('.clock').removeClass('is-off');
    }
    setTimeout(second_passed, 2000)
  
    $('.switcher').on('click', function(e) {
      e.preventDefault();
      $('.screen').toggleClass('glitch');
    });
  
    var countDownDate = new Date("Oct 12, 2018 00:00:00").getTime();
    
    // var newDate = new Date();
    // newDate.setDate(newDate.getDate());
  
    setInterval( function() {
  
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      var realTime = days + ':' + ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds
  
      $('.time').html(realTime);
      $('.time').attr('data-time', realTime);

      // console.log(days + "d " + hours + "h "+ minutes + "m " + seconds + "s ");
  
    }, 1000);
  
  });