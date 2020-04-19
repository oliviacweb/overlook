// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// import datepicker from 'js-datepicker';
import flatpickr from 'flatpickr';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// import Booking from './Booking';
// import Hotel from './Hotel';
// import Room from './Room';
import Customer from './Customer';
import Hotel from './Hotel';
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

function addDatePicker() {
    flatpickr('#date-picker-js', {
      dateFormat: 'Y/m/d'
    });
  }
const findTodayDate = () => {
  date = new Date().toJSON();
  today = date.substring(0, 10).replace(/-/g, "/");
}

const showManagerLogin = () => {
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
    <section class="rooms-avail"></section>`);
  $(".rooms-avail").append(managerTable);
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
// "number": 2,
// "roomType": "suite",
// "bidet": false,
// "bedSize": "full",
// "numBeds": 2,
// "costPerNight": 477.38

function showAvailableRoomsForDate() {
  event.preventDefault();
  let availableList = $(".available-list");
  console.log($('#date-picker').val())
  console.log($('#room-filter').val())
  let dateString = $('#date-picker').val().replace(/-/g, "/")
  hotel.roomsAvailable(dateString).forEach(
    room => availableList.append(`<div class="individual-room">
      <p>room number: ${room.number}</p>
      <p>room type: ${room.roomType}</p>
      <p>beds: ${room.numBeds} ${room.bedSize}</p>
      <p>cost: $${room.costPerNight} per night</p>
      </div>`)
  )

}

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
  <label for="pick-date">Pick a date to book:</label>
  <input required type="date" id="date-picker">
  <label for="filter-rooms">Filter By Room Type:</label>
  <input type="text" id="room-filter">
  <input class="booking-submit" type="button" val="Submit">
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
