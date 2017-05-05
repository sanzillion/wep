
//Darksky API

var lat;
var longi;
var url;
var data;
var data2;
var metric;
var imperial;
var wicon = {
  sunshower : "<div class='icon sun-shower'><div class='cloud'></div><div class='sun'><div class='rays'></div></div><div class='rain'></div></div>",
  thunderstorm: '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>',
  cloudy: '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
  flurries: '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>',
  sunny: '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>',
  rainy: '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>'
};
var wi;

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
          	  data = $.ajax({
                dataType: "jsonp",
                type: 'GET',
                url: url,
                success: function(data){
                	showData(data);
                },
                error: function(jqXHR, textStatus, error){
                  alert("error retrieving data!");
                }
              });
	        }
    }
    
    function toCelsius(f) {
    	return (5/9) * (f-32);
	}

	function showData(data){
		console.log('showdata function');
		windspeed = data.currently.windSpeed;
		timezone = data.timezone;
		summary = data.hourly.summary;
		imperial = data.currently.temperature;
		metric = toCelsius(imperial);
		metric = metric.toFixed(2);

		var d = new Date();
		time = d.getHours();

		var weather = data.currently.icon.toLowerCase();
        var index = 0;
        var img;
        if(time >= 6 && time <= 18){
          time = "day";
        }
        else{
          time = "dark";
        }

        var add = "img/";
        var images = {
          day: {
            normal: ['cloudy.jpg','sunrise.png','sunset.png','sunset.jpg'],
            rain: 'rainmorning.jpg'
          },
          night: {
            normal: ['night.png','night.jpg','night2.jpg'],
            rain: 'rain.jpg'
          }
        };
        console.log(time);
        if(time == "day"){
          console.log(weather);
          if(weather == "rain" || weather == "thunderstorm"){
            img = images.day.rain;
          }
          else{
            index = Math.floor(Math.random() * images.day.normal.length);
            img = images.day.normal[index];
          }
          
        }
        else{
          if(weather == "rain" || weather == "thunderstorm"){
            img = images.night.rain;
          }
          else{
            index = Math.floor(Math.random() * images.night.normal.length);
            img = images.night.normal[index];
          }
          
        }
        var link = add+img;
        var body = $('body,html');
          body.css('background','url('+link+') no-repeat center center fixed');
          body.css('background-size','cover');

        switch(weather){
          case "clear-day": 
            wi = wicon.sunny;
            break;
          case "cloudy": case "partly-cloudy-day":
            wi = wicon.cloudy;
            break;
          case "rain":
            if(time == "day"){
              wi = wicon.sunshower;
            }
            else{
              wi = wicon.rainy;
            }
            break;
          case "thunderstorm":
            wi = wicon.thunderstorm;
            break;
          case "snow": case "sleet": case "wind":
            wi = wicon.flurries;
            break;
          default:
            wi = wicon.cloudy;
            break;
        }

        $('#wicon').html(wi);
        $('#temp').text(metric + " C");
        $('#place').text(timezone);
        $('#weathr').text(weather);
        $('#wind').text(windspeed + " knots");
        $('#summary').text(summary);
    }
    
    $("#unit").click(function(){
        var btn = $(this);
        var val = $(this).val();
        if(val == "c"){
          $('#temp').text(imperial + " F");
          btn.removeClass("btn-success").addClass("btn-primary");
          btn.text("Convert to C");
          btn.attr("value", "f");
        }
        else{
          $('#temp').text(metric + " C");
          btn.removeClass("btn-primary").addClass("btn-success");
          btn.text("Convert to F");
          btn.attr("value", "c");
        }
    });


});