

// var lat;
// var long;
// var url;
// var data;

// $(document).ready(function(){
//     getLocation();

//     function getLocation() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(locations);
//         } else {
//            console.log("Geolocation is not supported by this browser.");
//         }
//     }

//     function locations(loc){
//             lat = loc.coords.latitude;
//             long = loc.coords.longitude;
//           url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=3602ffd43c9f394519c6b566a17005a1&units=metric';
//           requests(url);
//     }

//     function requests(url){
//       if(url){
//         data = $.getJSON(url, function(){
//             console.log(data.statusText);
//         });
//           data.fail(function() {
//             console.log( "error" );
//           });
//       }
//     }

//     function showData(data){
//       //$('.text').text(data);
//     }
    
// });

$(document).ready(function(){
  var index = 0;
  var img;
  var time = "day";
  var add = "img/";
  var images = {
    "day": ['cloudy.jpg','rainmorning.jpg','sunrise.png','sunset.png','sunset.jpg'],
    "night": ['night.png','night.jpg','night2.jpg','rain.jpg',]
  };
  if(time == "day"){
    index = Math.floor(Math.random() * images.day.length);
    img = images.day[index];
  }
  else{
    index = Math.floor(Math.random() * images.night.length);
    img = images.night[index];
  }

  var link = add+img;

  var body = $('body,html');
    body.css('background','url('+link+') no-repeat center center fixed');
    body.css('background-size','cover');
});


