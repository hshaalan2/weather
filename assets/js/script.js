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
//fixing local storage items getting lost on refresh because of this array variable running on load every time
// if (localStorage.getItem("City") != null) {}
let cityHistory = [];



//get the last 10 city search history items from localstorage if it exists
function init() {
  let getHistory = JSON.parse(localStorage.getItem("City"))
  if (getHistory !== null) {
    //succeedeed in geting city history from local storage and adding to history element as bootstrap list items. I need a for loop and need to figure out a way to set max history at 
    let getHistory0 = (getHistory[0])
    if (getHistory0) {
      let paintHistoryLi = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory0+'</button>')
    }
    
    let getHistory1 = getHistory[1]
    if (getHistory1) {
      let paintHistoryLi1 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory1+'</button>')
    }
    
    let getHistory2 = getHistory[2]
    if (getHistory2) {
      let paintHistoryLi2 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory2+'</button>')
    }

    let getHistory3 = getHistory[3]
    if (getHistory3) {
      let paintHistoryLi3 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory3+'</button>')
    }

    let getHistory4 = getHistory[4]
    if (getHistory4) {
      let paintHistoryLi4 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory4+'</button>')
    }

    let getHistory5 = getHistory[5]
    if (getHistory5) {
      let paintHistoryLi5 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory5+'</button>')
    }
    
    let getHistory6 = getHistory[6]
    if (getHistory6) {
      let paintHistoryLi6 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory6+'</button>')
    }

    let getHistory7 = getHistory[7]
    if (getHistory7) {
      let paintHistoryLi7 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory7+'</button>')
    }

    let getHistory8 = getHistory[8]
    if (getHistory8) {
      let paintHistoryLi8 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory8+'</button>')
    }

    let getHistory9 = getHistory[9]
    if (getHistory9) {
      let paintHistoryLi9 = $('#history').prepend('<button class="btn2 btn-secondary">'+getHistory9+'</button>')
    }

    //function to capture value of city search history button clicked so we run getApi again for that city
    $('.btn2').on('click', function () {
      let text = $(this).text();
      console.log(text);
      })

    }
  }


//function triggered when search icon is clicked when triggers getapi function
let formSubmitHandler  = function(event) {
  event.preventDefault();
  let selectCity = nameInputEl.value.trim();
  if(selectCity) {
    nameInputEl.value = '';
  } else {
    alert("You must enter a city name")
  }
   
  //constructing URL using 2 constants and 1 variable 
  let requestUrl = (requestUrlStart + selectCity + requestUrlEnd);
  getApi();

  //LOCAL STORAGE: store last city in an array and seperately last url in another array
  let saveLastCity = cityHistory.push(selectCity)
  localStorage.setItem("City", JSON.stringify(cityHistory));

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

          //adding icon
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
          image1.attr('src', `http://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png`)
          $('#day1-icon').append(image1)
          $('#day1-temp').text("Temp: " + data.list[2].main.temp + " °F");
          $('#day1-humidity').text("Humidity: " +data.list[2].main.humidity + " %");

        //capturing 2nd day's date, temp, humidity. Converting date format using moment
          let day2Date = moment(data.list[10].dt_txt).format("MM/DD/YYYY")
          $('#day2-date').text(day2Date);
          //adding icon
          $('#day2-icon').empty()
          let image2 = $('<img>')
          image2.attr('src', `http://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`)
          $('#day2-icon').append(image2)
          $('#day2-temp').text("Temp: " + data.list[10].main.temp + " °F");
          $('#day2-humidity').text("Humidity: " +data.list[10].main.humidity + " %");

         //capturing 3rd day's date, temp, humidity. Converting date format using moment
          let day3Date = moment(data.list[18].dt_txt).format("MM/DD/YYYY")
          $('#day3-date').text(day3Date);
          //adding icon
          $('#day3-icon').empty()
          let image3 = $('<img>')
          image3.attr('src', `http://openweathermap.org/img/wn/${data.list[20].weather[0].icon}.png`)
          $('#day3-icon').append(image3)
          $('#day3-temp').text("Temp: " + data.list[18].main.temp + " °F");
          $('#day3-humidity').text("Humidity: " +data.list[18].main.humidity + " %");

         //capturing 4th day's date, temp, humidity. Converting date format using momenty
          let day4Date = moment(data.list[26].dt_txt).format("MM/DD/YYYY")
          $('#day4-date').text(day4Date);
          //adding icon
          $('#day4-icon').empty()
          let image4 = $('<img>')
          image4.attr('src', `http://openweathermap.org/img/wn/${data.list[30].weather[0].icon}.png`)
          $('#day4-icon').append(image4)
          $('#day4-temp').text("Temp: " + data.list[26].main.temp + " °F");
          $('#day4-humidity').text("Humidity: " +data.list[26].main.humidity + " %");

         //capturing 5th day's date, temp, humidity. Converting date format using moment
          let day5Date = moment(data.list[34].dt_txt).format("MM/DD/YYYY")
          $('#day5-date').text(day5Date);
          //adding icon
          $('#day5-icon').empty()
          let image5 = $('<img>')
          image5.attr('src', `http://openweathermap.org/img/wn/${data.list[38].weather[0].icon}.png`)
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

//calling functions to set and get items in local storage
init();

//defining function to display current date using moment.js 
function displayToday (event) {
    // event.preventDefault();
    let todayDate = moment().format('dddd, MMM DD, YYYY');
    today.textContent = (" (" + todayDate) +")";
    };