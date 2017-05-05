
//Darksky API

var lat;
var longi;
var url;
var data;
var data2;
var metric;
var imperial;

$(document).ready(function(){
	
	getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(processing);
        } else {
           console.log("Geolocation is not supported by this browser.");
        }
    }

     function processing(loc){
            lati = loc.coords.latitude;
            longi = loc.coords.longitude;
          url = 'https://api.darksky.net/forecast/44a36651dfd3bbee75217ecdf75b9375/'+lati+','+longi;
          
          if(url){
              data = $.getJSON(url, function(){ 
                  metric = data.responseJSON;
                  });

	            data.fail(function(){
	              console.log( "error" );
	            });
	        }
    }
    

});