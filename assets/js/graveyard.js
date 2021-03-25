//UNSUCCESSFUL function to capture text of city clicked in history. Only works when inside init() function
$('.btn2').on('click', function () {
    let cityValue = $(this).text();
    console.log(cityValue);
    rememberCity = value;
    addEventListener('click', formSubmitHandler);
  })

  //seperating function from click event
  function clickHistory () {
    let cityValue = $(this).text();
    console.log(cityValue);
  }

  //event listener
  $('.btn2').on('click', clickHistory) 


    //UNSUCCESSFUL code added right below line 46 after nameInputEl.value = '' that allowed using same a single function to both search for city when entered in search box or clicked on from history. End result is clicking city from history worked but searching by city broke 
  // if(selectCity) {
  //   nameInputEl.value = '';
  // } else {
  //   selectCity = rememberCity
  // }
   

  //UNSUCCESSFULfunction to clear local storage. Unsuccessful. Will consult with tutor or Lada and
// function clear (event) {
//   event.preventDefault();
//   localStorage.clear();
//   $('#history').empty();
// }
// //event listener to clear history
// $('#clear-history').on('click',clear);