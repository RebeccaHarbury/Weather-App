$(document).ready(function () {

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

            $.ajax({   
            //get latitude and longitude co-ordinates from place name

                url: `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&searchExtent=-8,49,2,61&SingleLine=${search_input}`,

                success:function(location_result) {
                    console.log(location_result);
        //set place name
            let place_name = (location_result).candidates[1].address;

                place_name = place_name.split(',')[0];
                let place = $("#placeName");
                place.html(place_name);
        //obtain co-ordinates
            const location = location_result.candidates[0].location;

                let lat = (location).y;
                let long = (location).x;
                let latitude = `latitude=${lat}`;
                let longitude = `longitude=${long}`;

            $.ajax({
            //Hourly weather forecast from datahub using obtained co-ordinates
            
                url: "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?" + latitude +"&"+ longitude,
                headers: {
                "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A==',           
                },
        
                success:function(hourly_result) {
                    console.log(hourly_result);
                
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
                },
                })
        
            $.ajax({
            //Daily weather forecast from datahub using obtained co-ordinates
                url: "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?" + latitude +"&"+ longitude,
                headers: {
                    "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A=='
                }, 
        
                success:function(daily_result) {
                    console.log(daily_result);
            
            //Obtain dates from datahub, convert to days of the week, and append relevant data
                function weekday(day) {
            
                    const day_date = daily_result.features[0].properties.timeSeries[day+1].time;
            
                    let d = luxon.DateTime.fromISO(day_date);
                    dayOfWeek = d.toFormat('ccc');
                    let element_day = $(`#dayName${day+1}`);
                    element_day.html(dayOfWeek);
                }
            
                //days of the week for today and next 5 days
                    weekday(0);
                    weekday(1);
                    weekday(2);
                    weekday(3);
                    weekday(4);
                    weekday(5);
            
                //Obtain high/low temps and sig. weather code for today and next 5 days from data hub, and append relevant data
                function forecast(day) {
                
                    const daily = daily_result.features[0].properties.timeSeries[day+1];
                //high temp
                    let high_temp = (daily).dayMaxScreenTemperature;
                    high_temp = Math.round(high_temp);
                    let element1 = $(`#${day+1}HighTemp`);
                    element1.html(`${high_temp}°C`);

                //up arrow        
                    let element1_img = $(`#up${day+1}`);
                    element1_img.html();
                    element1_img.attr('src', `images/up-arrow.png`);

                //low temp        
                    let low_temp = (daily).nightMinScreenTemperature;
                    low_temp = Math.round(low_temp);
                    let element2 = $(`#${day+1}LowTemp`);
                    element2.html(`${low_temp}°C`);
                    
                //down arrow
                    let element2_img = $(`#down${day+1}`);
                    element2_img.html();
                    element2_img.attr('src', `images/down-arrow.png`);                        
                        
                
                //Get significant weather code from data hub
                    let weather_code = (daily).daySignificantWeatherCode;
                    weather_code = weather_code.toString();
                    let element3 = $(`#${day+1}WeatherCode`);
                    element3.innerHTML = weather_code;
            
                //Use weather code to append source for corresponding icon
                    element3.attr('src', `images/weather-${weather_code}.png`);
                }
            
                //Forecast for today and next 5 days
                    forecast(0);
                    forecast(1);
                    forecast(2);
                    forecast(3);
                    forecast(4);
                    forecast(5);
                    }
                })    
            }    
        })
    }
)
})
