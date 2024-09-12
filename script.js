// Global vars
let def_lat = 50.72716722965387
let def_lon = -3.4751011151717504
let def_place_name = "Exeter"

//get latitude and longitude co-ordinates from place name
function get_location(search_input){      
    return $.ajax({   
        
            url: `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&searchExtent=-8,49,2,61&SingleLine=${search_input}`,

            success:function(location_result) {
                console.log(location_result);

    //obtain place name
            place_name_response = (location_result).candidates[1].address;
            place_name = place_name_response.split(',')[0];

    //obtain co-ordinates
        const location = location_result.candidates[0].location;
            lat = (location).y;
            lon = (location).x;            
            }        
    })
}

function get_weather_data(_lat,_lon,_place_name){
    //set place name
    let place = $("#placeName");
        place.html(_place_name);
    //run hourly and daily forecast functions    
    get_hourly_data(_lat,_lon);
    get_daily_data(_lat,_lon);
}

//clear search bar
function clearSearchInput() {
    document.getElementById("searchInput").value = "";
}

 //Obtain dates from datahub, convert to days of the week, and append relevant data
function get_weekday(day, daily_result) {
        
            const day_date = daily_result.features[0].properties.timeSeries[day+1].time;
    
            let d = luxon.DateTime.fromISO(day_date);
            dayOfWeek = d.toFormat('ccc');
            let element_day = $(`#dayName${day+1}`);
            element_day.html(dayOfWeek);
}

//Hourly weather forecast from datahub using obtained co-ordinates
function get_hourly_data(lat, lon){

    $.ajax({
       
        url: "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=" + lat +"&longitude="+ lon,
        headers: {
        "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbmRyZXcucG95bnR6QG1ldG9mZmljZS5nb3YudWtAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJhbmRyZXcucG95bnR6QG1ldG9mZmljZS5nb3YudWsiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6InNpdGVfc3BlY2lmaWMtZDllNGQwZDktNTQ2YS00YTg5LWFmOGQtZWJiMzU3OTRmZmFiIiwiaWQiOjYxMzIsInV1aWQiOiJiMGQ0MDAwOC0wNzFkLTRjZmUtYWVmNS05NzE4ZjdlZDBlNjcifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3MjU0NTU2NzEsImp0aSI6ImIwZTY5YmIzLTk0MmYtNGNjOC1hZWMzLTkyNWY5NmIyNmIwZiJ9.NvmvnqIcqN4DOj0xODz6ShDHNbH-cXyNFOnm0bdicw_-Hd2GwLAnNWjhsx1ij31AY1OFwRfkU-FtTaXRKFD2aDAWQMAXdIt58qzsDnDn2OqGKV4UhWajUMU3wYDTcAgiyD-miE19SjYVYtYcUSMlDn07o8ObVGb29YGpNa-zjPgcav8M8te7l1yDz8U1ZwEnk-8aCd4aG434ergj25v5jLV4yDXJqKPgJytMzbN0mTGWYs0J1p3UIVXfFUCQb3OFvz2AvfkxMMHNqAYvoVCKjXCqDlsC5GYTJA9zK03YSaakoeEhKXSoyU_pjLZR_Q3_TwcTPUshl2M7Jgsa5ado8g==',           
        },

        success:function(hourly_result) {
            console.log(hourly_result);
            get_hourly_forecast(hourly_result);
        }
    })
}

//Daily weather forecast from datahub using obtained co-ordinates
function get_daily_data(lat,lon){

    $.ajax({
        
        url: "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=" + lat +"&longitude="+ lon,
        headers: {
            "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbmRyZXcucG95bnR6QG1ldG9mZmljZS5nb3YudWtAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJhbmRyZXcucG95bnR6QG1ldG9mZmljZS5nb3YudWsiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6InNpdGVfc3BlY2lmaWMtZDllNGQwZDktNTQ2YS00YTg5LWFmOGQtZWJiMzU3OTRmZmFiIiwiaWQiOjYxMzIsInV1aWQiOiJiMGQ0MDAwOC0wNzFkLTRjZmUtYWVmNS05NzE4ZjdlZDBlNjcifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3MjU0NTU2NzEsImp0aSI6ImIwZTY5YmIzLTk0MmYtNGNjOC1hZWMzLTkyNWY5NmIyNmIwZiJ9.NvmvnqIcqN4DOj0xODz6ShDHNbH-cXyNFOnm0bdicw_-Hd2GwLAnNWjhsx1ij31AY1OFwRfkU-FtTaXRKFD2aDAWQMAXdIt58qzsDnDn2OqGKV4UhWajUMU3wYDTcAgiyD-miE19SjYVYtYcUSMlDn07o8ObVGb29YGpNa-zjPgcav8M8te7l1yDz8U1ZwEnk-8aCd4aG434ergj25v5jLV4yDXJqKPgJytMzbN0mTGWYs0J1p3UIVXfFUCQb3OFvz2AvfkxMMHNqAYvoVCKjXCqDlsC5GYTJA9zK03YSaakoeEhKXSoyU_pjLZR_Q3_TwcTPUshl2M7Jgsa5ado8g=='
        }, 

        success:function(daily_result) {
            console.log(daily_result);
        
            for (let i =0; i < 6; i++){
                get_weekday(i, daily_result); //days of the week for today and next 5 days
                get_daily_forecast(i, daily_result); //Forecast for today and next 5 days
            }    
        }
    }) 
}

//Obtain current temp and sig. weather code for today from data hub, and append relevant data
function get_hourly_forecast(hourly_result){
        
    const hourly = hourly_result.features[0].properties.timeSeries[2];
        
    //Get current temperature from datahub and append
        let current_temp = (hourly).screenTemperature;
        current_temp = Math.round(current_temp);
        let element4 = $("#currentTemp");
        element4.html(current_temp +'°C');
    
    //Get current weather code from datahub
        let current_weather_code = (hourly).significantWeatherCode;
        current_weather_code = current_weather_code.toString();
        let element5 = $("#currentWeatherCode");
        element5.innerHTML = current_weather_code;
    
    //Use weather code to append source for corresponding icon        
        element5.attr('src', `images/weather-${current_weather_code}.png`);
        console.log(current_weather_code);
}

//Obtain high/low temps and sig. weather code for today and next 5 days from data hub, and append relevant data
function get_daily_forecast(day, daily_result) {
            
    const daily = daily_result.features[0].properties.timeSeries[day+1];

    //high temp
        let high_temp = (daily).dayMaxScreenTemperature;
        high_temp = Math.round(high_temp);
        let element1 = $(`#${day+1}HighTemp`);
        element1.html(`${high_temp}°C`);

    //low temp        
        let low_temp = (daily).nightMinScreenTemperature;
        low_temp = Math.round(low_temp);
        let element2 = $(`#${day+1}LowTemp`);
        element2.html(`${low_temp}°C`);                       


    //Get significant weather code from data hub
        let weather_code = (daily).daySignificantWeatherCode;
        weather_code = weather_code.toString();
        let element3 = $(`#${day+1}WeatherCode`);
        element3.innerHTML = weather_code;

    //Use weather code to append source for corresponding icon
        element3.attr('src', `images/weather-${weather_code}.png`);
}


//******************************************************                Start Weather App               ****************************************************
$(document).ready(function () {

    //doc ready fires off setting up any event listeners on those elements (like button clicks/submits) (could also wrap all that logic in a function)
    //doc ready also fires off a loadWeather function for the default location
        
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

        //enter key triggers click of search button
        searchInput.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                  event.preventDefault();
                  document.getElementById("searchButton").click();
                }
            })

        //click search button = search location
        searchButton.addEventListener('click',
            async function search() {
                const search_input = searchInput.value;
                console.log(search_input);                
                await get_location(search_input);
                get_weather_data(lat, lon, place_name);
                clearSearchInput();
            }    
        )
        
    // Load default location
    get_weather_data(def_lat, def_lon, def_place_name);
})
