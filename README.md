# weather
Link to repo: https://github.com/hshaalan2/weather
Link to page: https://hshaalan2.github.io/weather

Components of my weather dashboard app: 

1- HTML and CSS:
Used Bootstrap row and column elements to create a left most column for the city search box, and the a history element to store the last 10 searched cites. On the right is the display of city's weather which closely followed the mockup provided by Lada.  Also used Bootstrap list group elements for the city's current weather as it looks neater than just a plan ul html element. Used a large image I got from images.google.com as a banner to decorate the app.  Also used Bootstrap buttons for the search icon as well as to populate the History section as they look neat and came with hover functionality.  

2- JS and jQuery:
Used a combination of JS and jQuery syntax but def more jQuery. Got better at using jQuery syntax in the process. Learned to reduce number of variables created and intead use jquery's $('') to select a class or an ID.  Ran into scoping issues with functions but managed to move functions inside or outside other functions to address that. 

3- API:
OpenWeather's doc were pretty decent so I used the 5 day forecast api  http://api.openweathermap.org/data/2.5/forecast?q= to get a city's current forecast plus the next 5 days. In the response for this api was an array called list which contained 40 objects. Each 8 objects represent one day as it displays fresh weather info every 3 hours hence 3 x 8 = 24.  I only wanted the weather from each day at 12pm so from that object selected index #2 for day 1, #10 for day 2, #18 for day 3, #26 for day 4, #34 for day 5. Used techcniques we learned here to populate the screen with the info returned. 
I faced two challenges. One was getting the UV Index and two was displaying the proper icon image.

The UN index required a seperate API call to http://api.openweathermap.org/data/2.5/uvi? so I managed to add that api call function inside the main api call function.  Also used an IF else IF statement to change the background color on the UV html element to indicate severity of uv level, e.g. green if under 3, red if over 6 but under 8, purple if over 8 but under 11, etc. 

The icon image file comes form the following URL http://openweathermap.org/img/wn/ .  The icon value is returned in the api response and there were 18 possible values, each value corresponds to an image file e.g. icon = 019 uses image file 019.png. Worked with a tutor to construct a url path to the image file based on the icon value.

4- Local Storage:
Set items in local storage and getting items form local storage to use in the history list was not difficult but my challenge was keeping limiting the history to only last 10 cities search otherwise the history element gets very long. Acheived that by using an if statement so if lenght of history array exceeds 9 it uses the array shift method to remove the last item and that worked great. 

5- History
Now that we have retrieved the last 10 search cities form local storage and populated in history element, we needed a function to allow clicking on a history item and running the search for that city.  I ran into trouble there because I knew how to copy and use the same search function which meant an extra 140 lines of code but wanted to optimize my code and use the existing city search function. I figured out how to use the same main function to fire when clicking a history item. To make the function distinguish whether it was triggered from entering a search keyword or clicking on a history item, I created a global boolean variable historyClick and set it to false. Once user clicks a history item it fires a small function that sets that value to true and calls the main function. Added an if else statement in the main function so if historyClick is false it runs the function normally by pulling the city name from the input box, but if historyClick is true it captures the city name from the history button that was clicked. 

6- Moment.js
Used moment to display today's date next to the city's name as well as convert the date value we got from the api for the 5 day forecast into the format matching the mockup provided by instructor. 

