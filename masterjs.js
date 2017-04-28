
var lat;
var long;
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
            lat = loc.coords.latitude;
            long = loc.coords.longitude;
          url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=3602ffd43c9f394519c6b566a17005a1&units=metric';
          url2 = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=3602ffd43c9f394519c6b566a17005a1&units=imperial';
          
          if(url && url2){
              data = $.getJSON(url, function(){ 
                  metric = data.responseJSON;
                  data2 = $.getJSON(url2, function(){
                          imperial = data2.responseJSON;
                          showData(data.responseJSON, data2.responseJSON);
                  });

                  data2.fail(function() {
                      console.log( "error" );
                    });
              });     
                    data.fail(function() {
                      console.log( "error" );
                    });
            }
    }

    function showData(metric, imperial){
      console.log("Inside Here!");
      console.log(metric);
      console.log(imperial);
      console.log("Imperial Temp: "+imperial.main.temp);
      console.log("Metric Temp: "+metric.main.temp);

        var weather = metric.weather[0].main;
        var icon = "http://openweathermap.org/img/w/";
        var time = icon.substring(3,2);
        var icon = icon + metric.weather[0].icon + ".png";
        var index = 0;
        var img;
        if(time == "d"){
          time = "day";
        }
        else{
          time = "night";
        }

        var add = "img/";
        var images = {
          "day": {
            "normal": ['cloudy.jpg','sunrise.png','sunset.png','sunset.jpg'],
            "rain": 'rainmorning.jpg'
          },
          "night": {
            "normal": ['night.png','night.jpg','night2.jpg','rain.jpg',],
            "rain": 'rain.jpg'
          }
        };
        if(time == "day"){
          if(weather == "rain" || weather == "shower rain" || weather == "thunderstorm"){
            index = Math.floor(Math.random() * images.day.normal.length);
            img = images.day[index];
          }else{
            img = images.day.rain;
          }
          
        }
        else{
          if(weather == "rain" || weather == "shower rain" || weather == "thunderstorm"){
            index = Math.floor(Math.random() * images.night.normal.length);
            img = images.night[index];
          }else{
            img = images.night.rain;
          }
          
        }

        var link = add+img;
        
        var body = $('body,html');
          body.css('background','url('+link+') no-repeat center center fixed');
          body.css('background-size','cover');

        $('#image').attr("src", icon);
        $('#temp').text(metric.main.temp + " C");
        $('#place').text(metric.name + ", " + metric.sys.country);
        $('#weather').text(weather + ": " + metric.weather[0].description);
        $('#wind').text(metric.wind.speed + " knots");
    }
    
    $("#unit").click(function(){
        var btn = $(this);
        var val = $(this).val();
        if(val == "c"){
          $('#temp').text(imperial.main.temp + " F");
          btn.removeClass("btn-success").addClass("btn-primary");
          btn.text("Convert to C");
          btn.attr("value", "f");
        }
        else{
          $('#temp').text(metric.main.temp + " C");
          btn.removeClass("btn-primary").addClass("btn-success");
          btn.text("Convert to F");
          btn.attr("value", "c");
        }
        
        
    });

});


