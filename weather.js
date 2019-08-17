var unitChange=$("#unitChange");
var degChange=$("#degChange");
var lat=0,long=0;
var url="";
var far=true;
var temp=0;
var degInFah=0;
$(document).ready(function(){
	if (navigator.geolocation){
	  navigator.geolocation.getCurrentPosition(function(position) {
	    lat=position.coords.latitude;
	    long=position.coords.longitude;
	    setWeather(lat,long);
	  });
	}
	else
	{
		console.log("Geolocation not supported by browser");
	}
});
function setWeather(lat,long){
	url='https://fcc-weather-api.glitch.me/api/current?lon='+long+'&lat='+lat;
    $.getJSON(url,function(response){
		degChange.empty();
		degChange.append("<span>"+response.main.temp+"</span>");
		$("#city").append("<span>"+response.name+"</span>");
		$("img").attr("src",response.weather[0].icon);
		$("#weatherType").append("<span>"+response.weather[0].description+"</span>");
		$("#windSpeed").append("<span>Wind Speed: "+Math.floor(response.wind.speed*(18/5))+"Kmph</span>");
		temp=response.main.temp;
		degInFah=Math.round((temp * (9 / 5) )+ 32);
		
	});
}

$(".switch").on("change",function(event)
    {
	var currentTempUnit = unitChange.text();
	var newTempUnit = (currentTempUnit === "C")? "F" : "C";
	unitChange.text(newTempUnit);
	if(far===true)
	{
	$("#degChange").text(degInFah);
	far=false;
	}
	else
	{
     $("#degChange").text(temp);
     far=true;
    }
});

