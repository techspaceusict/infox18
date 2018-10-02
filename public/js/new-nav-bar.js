(function() {
    var $activeWidth, $defaultMarginLeft, $defaultPaddingLeft, $firstChild, $line, $navListItem;
  
    $line = $('#line');
  
    $navListItem = $('.nav-li');
  
    $activeWidth = $('.active-nav').width();
  
    $firstChild = $('.nav-li:first-child');
  
    $defaultMarginLeft = parseInt($('.nav-li:first-child').next().css('marginLeft').replace(/\D/g, ''));
  
    $defaultPaddingLeft = parseInt($('#nav-container > ul').css('padding-left').replace(/\D/g, ''));
  
    $line.width($activeWidth + 'px');
  
    $line.css('marginLeft', $defaultPaddingLeft + 'px');
  
    $navListItem.click(function() {
      var $activeNav, $currentIndex, $currentOffset, $currentWidth, $initWidth, $marginLeftToSet, $this;
      $this = $(this);
      $activeNav = $('.active-nav');
      $currentWidth = $activeNav.width();
      $currentOffset = $activeNav.position().left;
      $currentIndex = $activeNav.index();
      $activeNav.removeClass('active-nav');
      $this.addClass('active-nav');
      if ($this.is($activeNav)) {
        return 0;
      } else {
        if ($this.index() > $currentIndex) {
          if ($activeNav.is($firstChild)) {
            $initWidth = $defaultMarginLeft + $this.width() + $this.position().left - $defaultPaddingLeft;
          } else {
            $initWidth = $this.position().left + $this.width() - $currentOffset;
          }
          $marginLeftToSet = $this.position().left + $defaultMarginLeft + 'px';
          $line.width($initWidth + 'px');
          return setTimeout(function() {
            $line.css('marginLeft', $marginLeftToSet);
            return $line.width($this.width() + 'px');
          }, 175);
        } else {
          if ($this.is($firstChild)) {
            $initWidth = $currentOffset - $defaultPaddingLeft + $defaultMarginLeft + $currentWidth;
            $marginLeftToSet = $this.position().left;
          } else {
            $initWidth = $currentWidth + $currentOffset - $this.position().left;
            $marginLeftToSet = $this.position().left + $defaultMarginLeft;
          }
          $line.css('marginLeft', $marginLeftToSet);
          $line.width($initWidth + 'px');
          return setTimeout(function() {
            return $line.width($this.width() + 'px');
          }, 175);
        }
      }
    });
  
  }).call(this);