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
let customer;
let hotel;


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

const showLogin = () => {
  event.preventDefault();
  let currentUserName = userIdentification.val();
  let date = new Date().toJSON();
  let today = date.substring(0, 10).replace(/-/g, "/");
  console.log(today);
  let currentUserId = +currentUserName.match(/\d+/);
  if(currentUserName === 'manager' && userPassword.val() === 'overlook2020') {
     let roomsAvail = hotel.roomsAvailable(today)
     let revenue = hotel.totalRevenue(today)
     let percentFilled = hotel.percentOccupied(today)
     let managerTable = $(`<table class="man-table">`);
      let managerHead = $(`
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
            let manTr = $(`<tr class="man-tr">`);
            manTr.append(`<td>${room.number}</td>`);
            manTr.append(`<td>${room.roomType}</td>`);
            manTr.append(`<td>${room.numBeds}</td>`);
            manTr.append(`<td>${room.bedSize}</td>`);
            manTr.append(`<td>${room.costPerNight}</td>`);
            managerTable.append(manTr);
          })

   } else if(currentUserName.includes('customer') && userPassword.val() === 'overlook2020') {
     currentUser = userData[currentUserId];
     customer = new Customer(currentUser);
     let todayRooms = customer.presentBookings(bookingData, "2020/04/20");
     let futureRooms = customer.pastBookings(bookingData, today);
     console.log(todayRooms)
     let todayTable = $(`<table class="today-table">`);
     let todayHead = $(`
       <tr><th>Room</th>
       <th>Date</th>`)
      todayTable.append(todayHead);

     console.log(customer);
     let userTotalSpent = customer.getTotalSpent(bookingData, roomData)
     mainPage.html(`<h1>Hello, ${currentUser.name}<h1>
       <h2>you've spent $${userTotalSpent.toFixed(2)} at this hotel.</h2>
       <section class="today-booking"></section><section class="for-date"><form><label for="pick-date">Pick a date to book:</label><input type="date" id="date-picker"></form></section>`);
       // addDatePicker();
      // $(".rooms-avail").append(todayTable);
      if(todayRooms.length === 0) {
        $(".today-booking").append(`<h2>you have no bookings for today`)
      }
        else {
          $(".today-booking").append(`<h2>today's bookings</h2>`);
          $(".today-booking").append(todayTable);
          todayRooms.forEach(room => {
            let todayTr = $(`<tr class="today-tr">`);
            todayTr.append(`<td>${room.roomNumber}</td>`);
            todayTr.append(`<td>${room.date}</td>`);
            todayTable.append(todayTr);

          })

        }


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

$('.submit-button').click(showLogin);
