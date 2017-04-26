

var lat;
var long;
var url;
var data;

$(document).ready(function(){
    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locations);
        } else {
           console.log("Geolocation is not supported by this browser.");
        }
    }

    function locations(loc){
            lat = loc.coords.latitude;
            long = loc.coords.longitude;
          url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=3602ffd43c9f394519c6b566a17005a1&units=metric';
          requests(url);
    }

    function requests(url){
      if(url){
        data = $.getJSON(url, function(){
            console.log(data.statusText);
        });
          data.fail(function() {
            console.log( "error" );
          });
      }
    }

    function showData(data){
      //$('.text').text(data);
    }
    
});


