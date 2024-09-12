// Global vars
let lat = 50.72716722965387
let lon = -3.4751011151717504
let place_name = "Exeter"

//get latitude and longitude co-ordinates from place name
function get_location(search_input){
    $.ajax({   
        
            url: `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&searchExtent=-8,49,2,61&SingleLine=${search_input}`,

            success:function(location_result) {
                console.log(location_result);

    //set place name
            place_name_response = (location_result).candidates[1].address;

            place_name = place_name_response.split(',')[0];
            let place = $("#placeName");
            place.html(place_name);

    //obtain co-ordinates
        const location = location_result.candidates[0].location;
            lat = (location).y;
            lon = (location).x;            
            }        
    })
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
        "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A==',           
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
            "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A=='
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


function get_weather_data(_lat,_lon,_place_name){

    let place = $("#placeName");
        place.html(_place_name);
    get_hourly_data(lat,lon);
    get_daily_data(lat,lon);
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
            function search() {
                const search_input = searchInput.value;
                console.log(search_input);
                get_location(search_input);
                get_weather_data(lat, lon, place_name)
                }    
        )
        
    // Load default location
    get_weather_data(lat, lon, place_name);
})
