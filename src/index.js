// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// import datepicker from 'js-datepicker';
// import flatpickr from 'flatpickr';
import moment from 'moment';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// import Booking from './Booking';
// import Hotel from './Hotel';
// import Room from './Room';
import Customer from './Customer';
import Hotel from './Hotel';
import Manager from './Manager';
let userData;
let newDataObj;
let bookingData;
let roomData;
let currentUser;
let currentUserName;
let customer;
let hotel;
let date;
let today;
let currentUserId;
let roomsAvail;
let revenue;
let percentFilled;
let managerTable;
let managerHead;
let manTr;
let todayRooms;
let futureRooms;
let pastRooms;
let todayTable;
let todayHead;
let todayTr;
let futureTable;
let futureHead;
let futureTr;
let pastTr;
let pastTable;
let pastHead;
let userTotalSpent;
let theManager;



let userIdentification = $('.user-name');
let userPassword = $('.pword');
let mainPage = $('.main-page');

$(document).ready(() => {
  fetchData().then(data => {
  userData = data.userData;
  bookingData = data.bookingData;
  roomData = data.roomData;
  hotel = new Hotel(bookingData, roomData);
})
  .then(pageLoadHandler)
  .catch(error => console.log(error));
});

const pageLoadHandler = () => {
  console.log("hey")
}

const findTodayDate = () => {
  // date = new Date().toJSON();
  // today = date.substring(0, 10).replace(/-/g, "/");
  // today = moment().format('YYYY/MM/DD')
  today = "2020/02/03";
}

const showManagerLogin = () => {
  theManager = new Manager();
  roomsAvail = hotel.roomsAvailable(today)
  revenue = hotel.totalRevenue(today)
  percentFilled = hotel.percentOccupied(today)
  managerTable = $(`<table class="man-table">`);
  managerHead = $(`
     <tr><th>Room Number</th>
     <th>Room Type</th>
     <th>Beds</th>
     <th>Bed Size</th>
     <th>Cost</th>`)
     managerTable.append(managerHead);
  mainPage.html(`<h1>Hello, manager<h1>
    <h2>${percentFilled}% of rooms are occupied</h2>
    <h2>Revenue for today is $${revenue.toFixed(2)}</h2>
    <h2>Today there are ${roomsAvail.length} rooms available:</h2>
    <section class="rooms-avail"></section>
    <section class="search-user">
    <label for="user-name">Find User By Name:</label>
    <input type="text" id="user-name" required>
    <input class="name-submit" type="button" val="Submit">submit</input>
    </section>
    <section id="user-info">



    </section>`);
  $(".rooms-avail").append(managerTable);
  $('.name-submit').click(showCustomerData);
  roomsAvail.forEach(room =>
       {
         manTr = $(`<tr class="man-tr">`);
         manTr.append(`<td>${room.number}</td>`);
         manTr.append(`<td>${room.roomType}</td>`);
         manTr.append(`<td>${room.numBeds}</td>`);
         manTr.append(`<td>${room.bedSize}</td>`);
         manTr.append(`<td>${room.costPerNight}</td>`);
         managerTable.append(manTr);
       })

}

const displayUserTodayBookings = () => {
  if(todayRooms.length === 0) {
    $(".today-booking").append(`<h2>you have no bookings for today`)
  }
    else {
      $(".today-booking").append(todayTable);
      todayRooms.forEach(room => {
        todayTr = $(`<tr class="today-tr">`);
        todayTr.append(`<td>${room.roomNumber}</td>`);
        todayTr.append(`<td>${room.date}</td>`);
        todayTable.append(todayTr);

      })
    }
 }

const displayFutureBookings = () => {
  if(futureRooms.length === 0) {
    $(".future-booking").append(`<h2>you have no future bookings</h2>`)
  }
  else {
    $(".future-booking").append(futureTable);
    futureRooms.forEach(room => {
      futureTr = $(`<tr class="future-tr">`);
      futureTr.append(`<td>${room.roomNumber}</td>`);
      futureTr.append(`<td>${room.date}</td>`);
      futureTable.append(futureTr);
  })
}
}

const displayPastBookings = () => {
  if(pastRooms.length === 0) {
    $(".past-booking").append(`<h2>you have no past bookings</h2>`)
  }
  else {
    $(".past-booking").append(pastTable);
    pastRooms.forEach(room => {
      pastTr = $(`<tr class="past-tr">`);
      pastTr.append(`<td>${room.roomNumber}</td>`);
      pastTr.append(`<td>${room.date}</td>`);
      pastTable.append(pastTr);
  })
}
}

//
const makeReservation = (event) => {
  let target = $(event.target);
  if(target.is("p")) {
     target = target.parent()
  }
  let roomNumber = target.attr("roomnumber");
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userID': currentUserId,
        'date': target.attr("date"),
        'roomNumber': parseInt(roomNumber)
      })
    }).then(() => {
      console.log(`${roomNumber} is booked`);
      alert(`${roomNumber} is booked`)
    }).catch(() => {
      console.log("Sorry we couldn't complete this booking");
    })
}

function showAvailableRoomsForDate() {
  event.preventDefault();
  let availableList = $(".available-list");
  console.log($('#date-picker').val())
  let roomFilter = $('#room-filter').val()
  let dateString = $('#date-picker').val().replace(/-/g, "/")
  let roomsAvailableOnDate = hotel.roomsAvailable(dateString)
  availableList.empty();
  if(roomsAvailableOnDate.length === 0) {
    availableList.append(`<h1>Sorry there are no rooms available on this date!</h1>`)
  } else {
   let matches = 0;
  roomsAvailableOnDate.forEach(
    room => {
    if(roomFilter === "" || room.roomType === roomFilter) {
    matches++;
    let individualRoom = $(`<div date="${dateString}" roomnumber="${room.number}" class="individual-room">
      <p>room number: ${room.number}</p>
      <p>room type: ${room.roomType}</p>
      <p>beds: ${room.numBeds} ${room.bedSize}</p>
      <p>cost: $${room.costPerNight} per night</p>
      </div>`);
    individualRoom.click(makeReservation);
    availableList.append(individualRoom)
    }
  })
  if(matches === 0) {
    availableList.append(`<h1>Sorry there are no ${roomFilter}s available!</h1>`)
  }
}

}


const showCustomerData = () => {
  $("#user-info").html("");
  let nameInput = $("#user-name");
  let namesArray = userData.map(data => data.name)
  let custId = theManager.findCustomerId(userData, nameInput.val());
  let pastCustomerBookings = theManager.findPastCustomerBookings(bookingData, today, custId);
  let findTodayCustomerBookings = theManager.findTodayCustomerBookings(bookingData, today, custId);
  let findFutureCustomerBookings = theManager.findFutureCustomerBookings(bookingData, today, custId);
  let allFutureBookings = findTodayCustomerBookings.concat(findFutureCustomerBookings);
  console.log(allFutureBookings);

  // console.log(findFutureCustomerBookings);
  if(!namesArray.includes(nameInput.val())) {
      $("#user-info").html("<p>please enter a valid user</p>")
  } else  {
    $("#user-info").html("<div id='past-user-bookings'><h1>This User's Past Bookings</h1></div><div id='future-user-bookings'><h1>This User's Future Bookings</h1></div>");

    let pastBookingsContailer = $("#past-user-bookings");
    let pastUserTable = $(`<table class="past-user-table">`);
    let pastUserHead = $(`
       <tr><th>Room Number</th>
       <th>Date</th>`)
       pastUserTable.append(pastUserHead);
      pastBookingsContailer.append(pastUserTable);
      pastCustomerBookings.forEach(booking => {
        let pastUserTr = $(`<tr class="past-cust-tr">`);
        pastUserTr.append(`<td>${booking.roomNumber}</td>`);
        pastUserTr.append(`<td>${booking.date}</td>`);
        pastUserTable.append(pastUserTr);
    })
  }
}



  // $("#user-info > span").text("")
  // let nameInput = $("#user-name").val();
  // let custId = theManager.findCustomerId(userData, nameInput);
  // if(custId === null) {
  //   $("#user-info > span").text("Please enter a valid user")
  //   return
  // }
  // let customer = new Customer(custId)
  // console.log(theManager.findPastCustomerBookings(bookingData, today, custId))



const showCustomerLogin = () => {
currentUser = userData[currentUserId];
customer = new Customer(currentUser);
todayRooms = customer.presentBookings(bookingData, today);
futureRooms = customer.futureBookings(bookingData, today);
pastRooms = customer.pastBookings(bookingData, today);
todayTable = $(`<table class="today-table">`);
todayHead = $(`
  <tr><th>Room</th>
  <th>Date</th>`)
 todayTable.append(todayHead);
 futureTable = $(`<table class="future-table">`)
 futureHead = $(`
   <tr><th>Room</th>
   <th>Date</th>`)
 futureTable.append(futureHead);
 pastTable = $(`<table class="past-table">`)
 pastHead = $(`
   <tr><th>Room</th>
   <th>Date</th>`)
 pastTable.append(pastHead);
userTotalSpent = customer.getTotalSpent(bookingData, roomData)
mainPage.html(`<h1>Hello, ${currentUser.name}<h1>
  <h2>you've spent $${userTotalSpent.toFixed(2)} at this hotel.</h2>
  <section class="today-booking">
  <h1>Today's Bookings:</h1>
  </section>
  <section class="future-booking">
  <h1>Future Bookings:</h1>
  </section>
  <section class="past-booking">
  <h1>Past Bookings:</h1>
  </section>
  <section class="user-booking">
  <div class="for-date">
  <form class="booking-form">
  <label for="date-picker">Pick a date to book:</label>
  <input min="${today.replace(/\//g, '-')}" required type="date" id="date-picker">
  <label for="room-filter">Filter By Room Type:</label>
  <input type="text" id="room-filter">
  <button class="booking-submit" type="button" val="Submit">Submit</button>
  </form></div>
  </section>
  <rooms-available>
  <div class="available-list"></div>
  </rooms-available>`);
  $('.booking-submit').click(showAvailableRoomsForDate);
  displayUserTodayBookings();
  displayFutureBookings();
  displayPastBookings();
}

const showLoginHandler = () => {
  event.preventDefault();
  findTodayDate();
  currentUserName = userIdentification.val();
  currentUserId = +currentUserName.match(/\d+/);
  if(currentUserName === 'manager' && userPassword.val() === 'overlook2020') {
    showManagerLogin();
  } else if(currentUserName.includes('customer') && userPassword.val() === 'overlook2020' && currentUserId < 50) {
     showCustomerLogin();
   }
    else {
      mainPage.html("<h1>Please enter a valid login<h1>")
    }
}

const fetchData = () => {
   userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then((response) => response.json())
    .catch(error => console.log(error));
    bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then((response) => response.json())
    .catch(error => console.log(error));
    roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then((response) => response.json())
    .catch(error => console.log(error));
  return Promise.all([userData, bookingData, roomData])
    .then(response => {
      newDataObj = {};
      newDataObj.userData = response[0].users;
      newDataObj.bookingData = response[1].bookings;
      newDataObj.roomData = response[2].rooms;
      return newDataObj;
    })
    .catch(error => console.log(error));
}

$('.submit-button').click(showLoginHandler);
