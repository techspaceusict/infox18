$(document).ready(function() {
    $(document).delegate('.open', 'click', function(event){
        $(this).addClass('oppenned');
        event.stopPropagation();
    })
    $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
    })
    $(document).delegate('.sub-menu', 'click', function(event) {  // Comment this block 
        $('.open').removeClass('oppenned');                       // if you want menu to 
        event.stopPropagation();                                  // not vanish after clicking
    })                                                            // any of list item
    $(document).delegate('.cls', 'click', function(event){
        $('.open').removeClass('oppenned');
        event.stopPropagation();
    });
});
