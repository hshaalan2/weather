//as I get better with jquery I realized I don't need that many const when I can just use $('#id') but that is what I have for now
const searchBtn = document.getElementById("search");
const nameInputEl = document.getElementById("cityname");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const uvIndex = document.getElementById("uv-value");
const today = document.getElementById("today");
const icon = document.getElementById("icon");
const appId = "f05a2f8113996a536e6a20f88d375781";
const historyEl = document.getElementById("history");
let cityLat = '';
let cityLon =  '';
let uviRequestUrlDraft = 'http://api.openweathermap.org/data/2.5/uvi?';
let uviRequestUrlFinal = '';
let requestUrlStart = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let requestUrlEnd= '&units=imperial&appid=f05a2f8113996a536e6a20f88d375781';
let history = [];

//function to capture city entered by user
let formSubmitHandler  = function(event) {
  event.preventDefault();
  let selectCity = nameInputEl.value.trim();
  if(selectCity) {
    nameInputEl.value = '';
  } else {
    console.log("You must enter a city name or select from auto complete list")
  }
    //preparing for local storage. First capturing all previous city entires into an array. Next will test populating to history element and once successful will save to local storage then populate history with a for loop
    history.push(selectCity);
    console.log(history);
    // historyEl.append(selectCity)
    // let historyNew = document.createElement("br")
    // historyEl.appendChild(historyNew)
   
    //using localstorage.setitem to store entire array to local storage. it worked !!!
    localStorage.setItem("history", history)
    ////now use a get item function to pull local storage date and populate into history element


    
      // historyEl.append(selectCity)
    // let historyNew = document.createElement("br")
    // historyEl.appendChild(historyNew)
  let requestUrl = (requestUrlStart + selectCity + requestUrlEnd);
  getApi();

  function getApi() {
    // let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=fairfax,va,us&units=imperial&appid=f05a2f8113996a536e6a20f88d375781"

    fetch(requestUrl)
      .then(function (response) {
          return response.json();
      }
      )
      .then(function (data) {

          //capturing current day's city name, temp, humidity,and wind speed then populating to html element 
          cityName.textContent = (data.city.name + ", " + data.city.country);
          temperature.textContent = ("Temperature: " + data.list[0].main.temp + " °F");
          humidity.textContent = ("Humidity: " + data.list[0].main.humidity + " %");
          wind.textContent = ("Wind Speed: " + data.list[0].wind.speed + " MPH");

          //appending the correct image file to the icon element. I would have to write 18 if statements to get the correct icon image based on the icon value returned from the api. Scheduled tutor tomorrow 3/23/21. 
          if (data.list[0].weather[0].icon === "02d" ) {
            $('#icon').append($('<img src="http://openweathermap.org/img/wn/01d.png" alt="Sunny"></img>'))
          }
          else {
            $('#icon').append($('<img src="http://openweathermap.org/img/wn/02d.png" alt="Sunny"></img>'))  
          }

          //capturing city's long and lat and storing in global varible to later run a second api call to get UV index
          cityLat = data.city.coord.lat
          cityLon =  data.city.coord.lon
          uviRequestUrlFinal = (uviRequestUrlDraft + 'lat=' + cityLat + '&lon=' + cityLon + '&appID=' + appId)

          //capturing next day's date, temp, humidity
          //first convert dt_text format using moment to friendly format mm/dd/yy
          let day1Date = moment(data.list[2].dt_txt).format("MM/DD/YYYY")
          $('#day1-date').text(day1Date);
          //To DO: add icon
          $('#day1-temp').text("Temp: " + data.list[2].main.temp + " °F");
          $('#day1-humidity').text("Humidity: " +data.list[2].main.humidity + " %");
         //capturing second day's date, temp, humidity
         //first convert dt_text format using moment to friendly format mm/dd/yy
          let day2Date = moment(data.list[10].dt_txt).format("MM/DD/YYYY")
          $('#day2-date').text(day2Date);
          //To DO: add icon
          $('#day2-temp').text("Temp: " + data.list[10].main.temp + " °F");
          $('#day2-humidity').text("Humidity: " +data.list[10].main.humidity + " %");
         //capturing third day's date, temp, humidity
         //first convert dt_text format using moment to friendly format mm/dd/yy
          let day3Date = moment(data.list[18].dt_txt).format("MM/DD/YYYY")
          $('#day3-date').text(day3Date);
          //To DO: add icon
          $('#day3-temp').text("Temp: " + data.list[18].main.temp + " °F");
          $('#day3-humidity').text("Humidity: " +data.list[18].main.humidity + " %");
         //capturing fourth day's date, temp, humidity
         //first convert dt_text format using moment to friendly format mm/dd/yy
          let day4Date = moment(data.list[26].dt_txt).format("MM/DD/YYYY")
          $('#day4-date').text(day4Date);
          //To DO: add icon
          $('#day4-temp').text("Temp: " + data.list[26].main.temp + " °F");
          $('#day4-humidity').text("Humidity: " +data.list[26].main.humidity + " %");
         //capturing fifth day's date, temp, humidity
         //first convert dt_text format using moment to friendly format mm/dd/yy
          let day5Date = moment(data.list[34].dt_txt).format("MM/DD/YYYY")
          $('#day5-date').text(day5Date);
          //To DO: add icon
          $('#day5-temp').text("Temp: " + data.list[34].main.temp + " °F");
          $('#day5-humidity').text("Humidity: " +data.list[34].main.humidity + " %");
          //function to populate icon image based on icon value returned
      } )

      //making second api call to get the uvi index based on the lon and lat we captured earlier
      .then(function getUviApi() {
        fetch(uviRequestUrlFinal)
          .then(function (response) {
              return response.json();
          }
          )
          .then(function (data) {
          uvIndex.textContent = (data.value)
          let uvValue = data.value;
          
          //now styling the UV element with apporpriate color codes
          if ((uvValue > 0) && (uvValue <= 2.99)) {
            $('#uv-value').css('background-color', 'green')
            $('#uv-value').css('color', 'white')
          }
          else if ((uvValue >= 3) && (uvValue <= 5.99)) {
            $('#uv-value').css('background-color', 'yellow')
            $('#uv-value').css('color', 'black')
          }
          else if ((uvValue >= 6) && (uvValue <= 7.99)) {
            $('#uv-value').css('background-color', 'red')
            $('#uv-value').css('color', 'white')
          }
          else if ((uvValue >= 8) && (uvValue <= 10.99)) {
            $('#uv-value').css('background-color', 'violet')
            $('#uv-value').css('color', 'white')
          }
          else if (uvValue >=11) {
            $('#uv-value').css('background-color', 'purple')
            $('#uv-value').css('color', 'white')
          }
            } 
            ) 
    }
      )
      
      //running the function to display today's date using moment.js format
      displayToday();
};
}



//function call weather api


//event listener to fire up api function upon clicking search 
// searchBtn.addEventListener('click', getApi);
searchBtn.addEventListener('click', formSubmitHandler);

//display current date using moment.js 
function displayToday (event) {
    // event.preventDefault();
    let todayDate = moment().format('dddd, MMM DD, YYYY');
    today.textContent = (" (" + todayDate) +")";
    };


//jquery auto complete function. Not necessary, maybe we will add major cities
// $( function() {
//   var availableCities = [
//     "ActionScript",
//     "AppleScript",
//     "Asp",
//     "BASIC",
//     "C",
//     "C++",
//     "Clojure",
//     "COBOL",
//     "ColdFusion",
//     "Erlang",
//     "Fortran",
//     "Groovy",
//     "Haskell",
//     "Java",
//     "JavaScript",
//     "Lisp",
//     "Perl",
//     "PHP",
//     "Python",
//     "Ruby",
//     "Scala",
//     "Scheme"
//   ];
//   $( "#cityname" ).autocomplete({
//     source: availableCities
//   });
// } );