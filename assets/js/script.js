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
let uviRequestUrlDraft = 'https://api.openweathermap.org/data/2.5/uvi?';
let uviRequestUrlFinal = '';
let requestUrlStart = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let requestUrlEnd= '&units=imperial&appid=f05a2f8113996a536e6a20f88d375781';
let requestUrl = null
let getHistory = JSON.parse(localStorage.getItem("City")) || []
let rememberCity = "";
let historyCall = false;


//get the last 10 city search history items from localstorage if it exists
function init() {
  for (var i = 0; i < getHistory.length; i++) {
    if (getHistory !== null) {
      //for loop to populat each city in local storage into history element
        $('#history').prepend('<button class="btn2 btn-outline-secondary">'+getHistory[i]+'</button>').attr('value', getHistory[i]);
      // }
      
    }
  }
  //function to capture value of city clicked in history
  function clickHistory () {
    let cityValue = $(this).text();
    console.log(cityValue);
    rememberCity = cityValue;
    historyCall = true;
    formSubmitHandler(event);
  }
  //event listener to fire clickHistory function
  $('.btn2').on('click', clickHistory) 
}


//main function that captures user input and runs getApi functions to return city weather
let formSubmitHandler  = function(event) {
  event.preventDefault();
  let selectCity = nameInputEl.value.trim();
  nameInputEl.value = '';
  //constructing URL using 2 constants and 1 variable
  if (!historyCall) {
    requestUrl = (requestUrlStart + selectCity + requestUrlEnd);
  } 
  else if (historyCall) {
    requestUrl = (requestUrlStart + rememberCity + requestUrlEnd);
    historyCall = false;
  }

  
  getApi();

  //LOCAL STORAGE: store last city in an array and keep max number to 10 using an if else statment and the shift method to purge the first item
  if (getHistory.length > 9) {
    getHistory.shift();
    getHistory.push(selectCity)
    localStorage.setItem("City", JSON.stringify(getHistory));
  }
  else if (getHistory.length <= 9) {
    getHistory.push(selectCity)
    localStorage.setItem("City", JSON.stringify(getHistory));
  }

  //now we have the correct city url we run the getapi function and later the get uvi function
  function getApi() {
    fetch(requestUrl)
      .then(function (response) {
          return response.json();
      }
      )
      .then(function (data) {
        console.log(data);

          //capturing current day's city name, temp, humidity,and wind speed then populating to html element 
          cityName.textContent = (data.city.name + ", " + data.city.country);
          temperature.textContent = ("Temperature: " + data.list[0].main.temp + " °F");
          humidity.textContent = ("Humidity: " + data.list[0].main.humidity + " %");
          wind.textContent = ("Wind Speed: " + data.list[0].wind.speed + " MPH");

          //adding current day's icon
          $('#icon').empty()
          let image = $('<img>')
          image.attr('src', `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`)
          $('#icon').append(image)

          //capturing city's long and lat and storing in global varible to later run a second api call to get UV index
          cityLat = data.city.coord.lat
          cityLon =  data.city.coord.lon
          uviRequestUrlFinal = (uviRequestUrlDraft + 'lat=' + cityLat + '&lon=' + cityLon + '&appID=' + appId)

          //capturing next day's date, temp, humidity. Converting date format using moment
          let day1Date = moment(data.list[2].dt_txt).format("MM/DD/YYYY")
          $('#day1-date').text(day1Date);
          //adding icon
          $('#day1-icon').empty()
          let image1 = $('<img>')
          image1.attr('src', `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}.png`)
          $('#day1-icon').append(image1)
          $('#day1-temp').text("Temp: " + data.list[2].main.temp + " °F");
          $('#day1-humidity').text("Humidity: " +data.list[2].main.humidity + " %");

        //capturing 2nd day's date, temp, humidity. Converting date format using moment
          let day2Date = moment(data.list[10].dt_txt).format("MM/DD/YYYY")
          $('#day2-date').text(day2Date);
          //adding icon
          $('#day2-icon').empty()
          let image2 = $('<img>')
          image2.attr('src', `http://openweathermap.org/img/wn/${data.list[11].weather[0].icon}.png`)
          $('#day2-icon').append(image2)
          $('#day2-temp').text("Temp: " + data.list[10].main.temp + " °F");
          $('#day2-humidity').text("Humidity: " +data.list[10].main.humidity + " %");

         //capturing 3rd day's date, temp, humidity. Converting date format using moment
          let day3Date = moment(data.list[18].dt_txt).format("MM/DD/YYYY")
          $('#day3-date').text(day3Date);
          //adding icon
          $('#day3-icon').empty()
          let image3 = $('<img>')
          image3.attr('src', `http://openweathermap.org/img/wn/${data.list[19].weather[0].icon}.png`)
          $('#day3-icon').append(image3)
          $('#day3-temp').text("Temp: " + data.list[18].main.temp + " °F");
          $('#day3-humidity').text("Humidity: " +data.list[18].main.humidity + " %");

         //capturing 4th day's date, temp, humidity. Converting date format using momenty
          let day4Date = moment(data.list[26].dt_txt).format("MM/DD/YYYY")
          $('#day4-date').text(day4Date);
          //adding icon
          $('#day4-icon').empty()
          let image4 = $('<img>')
          image4.attr('src', `http://openweathermap.org/img/wn/${data.list[27].weather[0].icon}.png`)
          $('#day4-icon').append(image4)
          $('#day4-temp').text("Temp: " + data.list[26].main.temp + " °F");
          $('#day4-humidity').text("Humidity: " +data.list[26].main.humidity + " %");

         //capturing 5th day's date, temp, humidity. Converting date format using moment
          let day5Date = moment(data.list[34].dt_txt).format("MM/DD/YYYY")
          $('#day5-date').text(day5Date);
          //adding icon
          $('#day5-icon').empty()
          let image5 = $('<img>')
          image5.attr('src', `http://openweathermap.org/img/wn/${data.list[35].weather[0].icon}.png`)
          $('#day5-icon').append(image5)
          $('#day5-temp').text("Temp: " + data.list[34].main.temp + " °F");
          $('#day5-humidity').text("Humidity: " +data.list[34].main.humidity + " %");
          
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
          
          // styling the UV Index element with apporpriate color codes
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
      //calling function to display today's date using moment.js format
      displayToday();
};
}

//event listener to fire main function which has all other functions in it
searchBtn.addEventListener('click', formSubmitHandler);

//calling history function to set and get items in local storage
init();

//defining function to display current date using moment.js 
function displayToday (event) {
    // event.preventDefault();
    let todayDate = moment().format('dddd, MMM DD, YYYY');
    today.textContent = (" (" + todayDate) +")";
    };