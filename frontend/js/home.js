$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('#butones').sideNav(
        {
            menuWidth: 300, // Default is 300
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        }
    );
     $('#dr').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });

    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 20,
      format: 'yyyy-mm-dd'
    });
    
});