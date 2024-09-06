$(document).ready(function () {
    $.ajax({
    //Hourly weather forecast from datahub
        url: "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=50.727239&longitude=-3.475277",
        headers: {
            "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A=='
        }, 
        success:function(hourly_result) {
        console.log(hourly_result);

    //Get current temperature from datahub
        var current_temp = hourly_result.features[0].properties.timeSeries[2].screenTemperature;
        current_temp = Math.round(current_temp);
        var element = document.getElementById("currentTemp");
        element.innerHTML = current_temp +'°C';

    //Get current weather code from datahub
        var current_weather_code = hourly_result.features[0].properties.timeSeries[2].significantWeatherCode;
        current_weather_code = current_weather_code.toString();
        var element = $("#currentWeatherCode");
        element.innerHTML = current_weather_code;

    //Use weather code to append source for corresponding icon        
        element.attr('src', `images/weather-${current_weather_code}.png`);
        console.log(current_weather_code);
        },
    
    })
    $.ajax({
    //Daily weather forecast from datahub
        url: "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=50.727239&longitude=-3.475277",
        headers: {
            "apikey": 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyZWJlY2NhLmhhcmJ1cnlAbWV0b2ZmaWNlLmdvdi51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InJlYmVjY2EuaGFyYnVyeUBtZXRvZmZpY2UuZ292LnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWI4ZmM2NTUxLWU2MGEtNGI1My04Mzk5LTY1NTVkODczMjdhZiIsImlkIjo2MTI4LCJ1dWlkIjoiMDRjMTE0MWYtZDA2YS00NDM1LWI0YWMtMWE5MTY2YjdmN2YxIn0sImlzcyI6Imh0dHBzOlwvXC9hcGktbWFuYWdlci5hcGktbWFuYWdlbWVudC5tZXRvZmZpY2UuY2xvdWQ6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlNpdGVTcGVjaWZpY0ZvcmVjYXN0IiwiY29udGV4dCI6Ilwvc2l0ZXNwZWNpZmljXC92MCIsInB1Ymxpc2hlciI6IkphZ3Vhcl9DSSIsInZlcnNpb24iOiJ2MCIsInN1YnNjcmlwdGlvblRpZXIiOiJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NDQ4NTM1LCJqdGkiOiI5MzgwYmViMS1mZGE1LTRiZGMtYWRmYy02OTZkYTQxNDBiZTgifQ==.fb55x5LYvPAW4wHlfzIFJ8PjUXUuiSnZdsCLSO5efu235SeeXF1Z1gv1c0cX3tqBko7bDZv3kNl0d32GyHAuggflinN45-MszERXmKdOjX50MZDLSF7F_N-v-B2woYFFx7DxS3HU3bhfVLtbOEWQBwlcobY2NOSN8q2v6AoY9cfTju7k3wyr0Hk6emuHMtzplQvyXNaeeWSQuWiUUeScSYY9F1yJhR5h2KOmorqQAA3AAoglrx2P_R17o0VgBSw4tFHHwvJ9PMfenh_7ygD1K9-dFd7xOW7zDhnseSkx49dAUhSPRlVYs7rl55_8c9ghavzoX7lhy9P1VfP16J-c9A=='
        }, 

        success:function(daily_result) {
        console.log(daily_result);
        
    //Get highest temperature forecast for today from datahub
        var current_high_temp = daily_result.features[0].properties.timeSeries[1].dayMaxScreenTemperature;
        current_high_temp = Math.round(current_high_temp);
        var element = document.getElementById("currentHighTemp");
        element.innerHTML = current_high_temp +'°C';

    //Get lowest temperature forcast for today from datahub
        var current_low_temp = daily_result.features[0].properties.timeSeries[1].nightMinScreenTemperature;
        current_low_temp = Math.round(current_low_temp);
        var element = document.getElementById("currentLowTemp");
        element.innerHTML = current_low_temp +'°C';

//5 Day Forecast        

    //Get temperature range for Day 1 of forecast from datahub
        var day1_high_temp = daily_result.features[0].properties.timeSeries[2].dayMaxScreenTemperature;
        day1_high_temp = Math.round(day1_high_temp);
        var element = document.getElementById("day1HighTemp");
        element.innerHTML = day1_high_temp +'°C';

        var day1_low_temp = daily_result.features[0].properties.timeSeries[2].nightMinScreenTemperature;
        day1_low_temp = Math.round(day1_low_temp);
        var element = document.getElementById("day1LowTemp");
        element.innerHTML = day1_low_temp +'°C';

    //Get significant weather code from data hub
        var day1_weather_code = daily_result.features[0].properties.timeSeries[2].daySignificantWeatherCode;
        day1_weather_code = day1_weather_code.toString();
        var element = $("#day1WeatherCode");
        element.innerHTML = day1_weather_code;

    //Use weather code to append source for corresponding icon
        element.attr('src', `images/weather-${day1_weather_code}.png`);
        
        
    //Get temperature range for Day 2 of forecast from datahub
        var day2_high_temp = daily_result.features[0].properties.timeSeries[3].dayMaxScreenTemperature;
        day2_high_temp = Math.round(day2_high_temp);
        var element = document.getElementById("day2HighTemp");
        element.innerHTML = day2_high_temp +'°C';

        var day2_low_temp = daily_result.features[0].properties.timeSeries[3].nightMinScreenTemperature;
        day2_low_temp = Math.round(day2_low_temp);
        var element = document.getElementById("day2LowTemp");
        element.innerHTML = day1_low_temp +'°C';

    //Get significant weather code from data hub
        var day2_weather_code = daily_result.features[0].properties.timeSeries[3].daySignificantWeatherCode;
        day2_weather_code = day2_weather_code.toString();
        var element = $("#day2WeatherCode");
        element.innerHTML = day2_weather_code;

    //Use weather code to append source for corresponding icon
        element.attr('src', `images/weather-${day2_weather_code}.png`);


    //Get temperature range for Day 3 of forecast from datahub
        var day3_high_temp = daily_result.features[0].properties.timeSeries[4].dayMaxScreenTemperature;
        day3_high_temp = Math.round(day3_high_temp);
        var element = document.getElementById("day3HighTemp");
        element.innerHTML = day3_high_temp +'°C';

        var day3_low_temp = daily_result.features[0].properties.timeSeries[4].nightMinScreenTemperature;
        day3_low_temp = Math.round(day3_low_temp);
        var element = document.getElementById("day3LowTemp");
        element.innerHTML = day3_low_temp +'°C';

    //Get significant weather code from data hub
        var day3_weather_code = daily_result.features[0].properties.timeSeries[4].daySignificantWeatherCode;
        day3_weather_code = day3_weather_code.toString();
        var element = $("#day3WeatherCode");
        element.innerHTML = day3_weather_code;

    //Use weather code to append source for corresponding icon
        element.attr('src', `images/weather-${day3_weather_code}.png`);


    //Get temperature range for Day 4 of forecast from datahub
        var day4_high_temp = daily_result.features[0].properties.timeSeries[5].dayMaxScreenTemperature;
        day4_high_temp = Math.round(day4_high_temp);
        var element = document.getElementById("day4HighTemp");
        element.innerHTML = day4_high_temp +'°C';

        var day4_low_temp = daily_result.features[0].properties.timeSeries[5].nightMinScreenTemperature;
        day4_low_temp = Math.round(day4_low_temp);
        var element = document.getElementById("day4LowTemp");
        element.innerHTML = day4_low_temp +'°C';

    //Get significant weather code from data hub
        var day4_weather_code = daily_result.features[0].properties.timeSeries[5].daySignificantWeatherCode;
        day4_weather_code = day4_weather_code.toString();
        var element = $("#day4WeatherCode");
        element.innerHTML = day4_weather_code;

    //Use weather code to append source for corresponding icon
        element.attr('src', `images/weather-${day4_weather_code}.png`);


    //Get temperature range for Day 5 of forecast from datahub
        var day5_high_temp = daily_result.features[0].properties.timeSeries[6].dayMaxScreenTemperature;
        day5_high_temp = Math.round(day5_high_temp);
        var element = document.getElementById("day5HighTemp");
        element.innerHTML = day1_high_temp +'°C';

        var day5_low_temp = daily_result.features[0].properties.timeSeries[6].nightMinScreenTemperature;
        day5_low_temp = Math.round(day5_low_temp);
        var element = document.getElementById("day5LowTemp");
        element.innerHTML = day5_low_temp+'°C';

    //Get significant weather code from data hub
        var day5_weather_code = daily_result.features[0].properties.timeSeries[6].daySignificantWeatherCode;
        day5_weather_code = day5_weather_code.toString();
        var element = $("#day5WeatherCode");
        element.innerHTML = day5_weather_code;

    //Use weather code to append source for corresponding icon
        element.attr('src', `images/weather-${day5_weather_code}.png`);


        console.log(day1_weather_code, day2_weather_code, day3_weather_code, day4_weather_code, day5_weather_code);

    //I will make this better! :)
        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue","Wed","Thurs"];

    //Get Day of the week for today and next 5 days
        var d = new Date();

        let day = d.getDay();
        let day1 = day+1
        let day2 = day+2
        let day3 = day+3
        let day4 = day+4
        let day5 = day+5


    //Change from numerical to name of day
        let dayOfTheWeek = weekday[day];
        let dayOfTheWeek1 = weekday[day1];
        let dayOfTheWeek2 = weekday[day2];
        let dayOfTheWeek3 = weekday[day3];
        let dayOfTheWeek4 = weekday[day4];
        let dayOfTheWeek5 = weekday[day5];

    //Put day of the week data into HTML file
        var element = document.getElementById("dayName");
        element.innerHTML = dayOfTheWeek;
        var element = document.getElementById("day1Name");
        element.innerHTML = dayOfTheWeek1;
        var element = document.getElementById("day2Name");
        element.innerHTML = dayOfTheWeek2;
        var element = document.getElementById("day3Name");
        element.innerHTML = dayOfTheWeek3;
        var element = document.getElementById("day4Name");
        element.innerHTML = dayOfTheWeek4;
        var element = document.getElementById("day5Name");
        element.innerHTML = dayOfTheWeek5;

        }
    })    
})
