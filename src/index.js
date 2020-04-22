import $ from 'jquery';
import moment from 'moment';

import './css/base.scss';
import './css/styles.scss';

import './images/turing-logo.png';
import Customer from './Customer';
import Hotel from './Hotel';
import Manager from './Manager';
import allFetch from './fetch.js';
import domUpdates from './domupdates';

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
let individualRoom;
let matches;
let roomsAvailableOnDate;
let roomFilter;
let dateString;
let availableList;
let nameInput;
let namesArray;
let pastCustomerBookings;
let findTodayCustomerBookings;
let findFutureCustomerBookings;
let allFutureBookings;
let pastBookingsContailer;
let pastUserTable;
let pastUserHead;
let pastUserTr;

let userIdentification = $('.user-name');
let userPassword = $('.password');
let mainPage = $('.main-page');

$(document).ready(() => {
  allFetch.fetchData().then(data => {
  userData = data.userData;
  bookingData = data.bookingData;
  roomData = data.roomData;
  hotel = new Hotel(bookingData, roomData);
})
  .catch(error => console.log(error));
});

const findTodayDate = () => {
  today = moment().format('YYYY/MM/DD');
  // today = "2020/01/16";
}

const createManagerTable = () => {
  managerTable = $(`<table class="man-table">`);
  managerHead = $(`
     <tr><th>Room Number</th>
     <th>Room Type</th>
     <th>Beds</th>
     <th>Bed Size</th>
     <th>Cost</th>`)
  managerTable.append(managerHead);
}

const createManagerDashboard = () => {
  mainPage.html(`<section class="manager-main">
    <section class="manager-section">
    <h1 class="manager-greeting">Hello, Undead Leonardo DiCaprio<h1>
    <section class="hotel-info">
    <h2>${percentFilled}% of rooms are occupied</h2>
    <h2>Revenue for today is $${revenue.toFixed(2)}</h2>
    <h2>Today there are ${roomsAvail.length} rooms available:</h2>
    <section class="rooms-avail"></section>
    </section>
    </section>
    <section class="user-section">
    <section class="search-user">
    <label for="specific-user-name">Find User By Name:</label>
    <input aria-label="search user name" type="text" id="specific-user-name" required>
    <button class="name-submit" type="button" val="Submit">submit</button>
    </section>
    <section class="user-info">
    </section>
    </section>
    </section>`);
}

const createRoomsAvailTable = () => {
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

const showManagerLoginHandler = () => {
  theManager = new Manager();
  roomsAvail = domUpdates.showHotelRoomsAvail(hotel, today)
  revenue = domUpdates.showTotalRevenue(hotel, today)
  percentFilled = domUpdates.showPercentOccupied(hotel, today)
  createManagerTable();
  createManagerDashboard();
  $(".rooms-avail").append(managerTable);
  $('.name-submit').click(showCustomerDataHandler);
  createRoomsAvailTable();
}

const makeReservation = (event) => {
  let target;
  let date;
  let roomNumber;
  if($(event.target).hasClass('book-room')) {
    target = $(event.target);
   roomNumber = +target.attr("roomnumber");
    date = target.attr("date");
    allFetch.postData(roomNumber, currentUserId, date);
    target.parent().remove()
  }
}

const deleteReservation = (event) => {
  let deleteTarget;
  let bookingID;
 if($(event.target).hasClass("delete-booking")) {
      deleteTarget = $(event.target);
      bookingID = +deleteTarget.attr("bookingnumber");
      allFetch.deleteData(bookingID);
    $(event.target).parent().remove();
  }
 }

const iterateAvailableRooms = () => {
  roomsAvailableOnDate.forEach(
    room => {
    if(roomFilter === "" || room.roomType === roomFilter) {
    matches++;
      individualRoom = $(`<div class="individual-room">
      <button class="book-room" date="${dateString}" roomnumber="${room.number}" type="button">Book Room</button>
      <p>room number: ${room.number}</p>
      <p>room type: ${room.roomType}</p>
      <p>beds: ${room.numBeds} ${room.bedSize}</p>
      <p>cost: $${room.costPerNight} per night</p>
      </div>`);
    individualRoom.click(makeReservation);
    availableList.append(individualRoom)
    }
  })
}

const createAvailableRooms = () => {
  if(roomsAvailableOnDate.length === 0) {
    availableList.append(`<h1>Sorry there are no rooms available on this date!</h1>`)
  } else {
   matches = 0;
   iterateAvailableRooms();
  if(matches === 0) {
    availableList.append(`<h1>Sorry there are no ${roomFilter}s available! Please try a different date.</h1>`)
  }
 }
}

const showAvailableRoomsForDate = () => {
  event.preventDefault();
    availableList = $(".available-list");
  console.log($('#date-picker').val())
     roomFilter = $('#room-filter').val()
     dateString = $('#date-picker').val().replace(/-/g, "/")
   roomsAvailableOnDate = domUpdates.showHotelRoomsAvail(hotel, dateString);
  availableList.empty();
  createAvailableRooms();
}

const showAvailableRoomsForCustomer = () => {
    event.preventDefault();
    if($('#date-picker').val() === "") {
      $(".available-list").html("<p>please enter a valid date</p>");
    } else {
  showAvailableRoomsForDate();
  }
}

const showAvailableRoomsForManager = () => {
  event.preventDefault();
  if($('#date-picker').val() === "") {
    $(".available-list").html("<p>please enter a valid date</p>");
  } else {
showAvailableRoomsForDate();
 }
}

const displayCustomerData = () => {
  if(!namesArray.includes(nameInput.val())) {
      $(".user-info").html("<p>please enter a valid user</p>")
  } else  {
    $(".user-info").html(`<div id='past-user-bookings'>
    <h2>This User's Past Bookings</h2>
    </div>
    <div id='future-user-bookings'>
    <h2>This User's Future Bookings</h2>
    </div>
    <section class="manager-booking-container">
    <h2>Book Room For User:</h2>
    <div class="for-date">
    <label for="booking-form"></label>
    <form class="booking-form">
    <label for="date-picker">Pick a date to book:</label>
    <input min="${today.replace(/\//g, '-')}" type="date" id="date-picker" required>
    <label for="room-filter">Filter By Room Type:</label>
    <select class"room-select" type="text" id="room-filter">
    <option value="residential suite">residential suite</option>
     <option value="suite">suite</option>
     <option value="single room">single room</option>
     <option value="junior suite">junior suite</option>
    </select>
    <button class="manager-booking-submit" type="button" val="Submit">Submit</button>
    </form></div>
    <rooms-available>
    <div class="available-list"></div>
    </rooms-available>
    </section>`);
 }
}

const makePastResTable = () => {
  pastBookingsContailer = $("#past-user-bookings");
  pastUserTable = $(`<table class="past-user-table">`);
  pastUserHead = $(`<tr><th>Room Number</th><th>Date</th>`)
  pastUserTable.append(pastUserHead);
  pastBookingsContailer.append(pastUserTable);
  pastCustomerBookings.forEach(booking => {
    pastUserTr = $(`<tr class="past-cust-tr">`);
    pastUserTr.append(`<td>${booking.roomNumber}</td>`);
    pastUserTr.append(`<td>${booking.date}</td>`);
    pastUserTable.append(pastUserTr);
 })
}

const createFutureBookings = () => {
  if(allFutureBookings.length === 0) {
    $('#future-user-bookings').append(`<h1>This user has no future bookings</h1>`)
  } else {
     allFutureBookings.forEach(booking => {
       let individualBooking = $(`<div bookingdate="${booking.date}" bookingroomnumber="${booking.roomNumber}" class="individual-room">
           <button class="delete-booking" bookingnumber="${booking.id}" type="button">Delete Booking</button>
           <p>date:${booking.date}</p>
           <p>room number:${booking.roomNumber}</p>
            </div>`);
            $('#future-user-bookings').append(individualBooking)
     })
     $(".delete-booking").click(deleteReservation);
  }
}

const showCustomerDataHandler = () => {
  $(".user-info").html("");
  nameInput = $("#specific-user-name");
  namesArray = userData.map(data => data.name)
  currentUserId = theManager.findCustomerId(userData, nameInput.val());
  pastCustomerBookings = theManager.findPastCustomerBookings(bookingData, today, currentUserId);
  findTodayCustomerBookings = theManager.findTodayCustomerBookings(bookingData, today, currentUserId);
  findFutureCustomerBookings = theManager.findFutureCustomerBookings(bookingData, today, currentUserId);
  allFutureBookings = findTodayCustomerBookings.concat(findFutureCustomerBookings);
  displayCustomerData();
  $('.manager-booking-submit').click(showAvailableRoomsForManager);
  makePastResTable();
  createFutureBookings();

   }

const createCurrentUser = () => {
  currentUser = userData[currentUserId - 1];
  customer = new Customer(currentUser);
}

const showCustomerBookingTable = () => {
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

const showCustomerDashBoard = () => {
  mainPage.html(`<h2 class="greet-customer">Hello, ${currentUser.name}! you've spent $${userTotalSpent.toFixed(2)} at this hotel.<h2>
    <section class="specific-user-container">
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
    <input required min="${today.replace(/\//g, '-')}" type="date" id="date-picker">
    <label for="room-filter">Filter By Room Type:</label>
    <select class"room-select" type="text" id="room-filter">
    <option value="residential suite">residential suite</option>
     <option value="suite">suite</option>
     <option value="single room">single room</option>
     <option value="junior suite">junior suite</option>
    </select>
    <input class="booking-submit" type="submit" val="Submit">
    </form></div>
    <rooms-available>
    <div class="available-list"></div>
    </rooms-available>
    </section>
    </section>`);
}

const showCustomerLoginHandler = () => {
  createCurrentUser();
  todayRooms = domUpdates.showTodayBookings(customer, bookingData, today);
  futureRooms = domUpdates.showFutureBookings(customer, bookingData, today);
  pastRooms = domUpdates.showPastBookings(customer, bookingData, today);
  userTotalSpent = domUpdates.showCustomerAmountSpent(customer, bookingData, roomData, today);
  showCustomerBookingTable();
  showCustomerDashBoard();
  $('.booking-submit').click(showAvailableRoomsForCustomer);
  displayUserTodayBookings();
  displayFutureBookings();
  displayPastBookings();
}

const getUserId = () => {
  currentUserName = userIdentification.val();
  currentUserId = +currentUserName.match(/\d+/);
}

const showLoginHandler = () => {
  event.preventDefault();
  findTodayDate();
  getUserId();
  if(currentUserName === 'Undead Leonardo DiCaprio' && userPassword.val() === 'overlook2020') {
    showManagerLoginHandler();
  } else if(currentUserName.includes('customer') && userPassword.val() === 'overlook2020' && currentUserId < 50) {
     showCustomerLoginHandler();
   }
    else {
      mainPage.html("<h1>Please enter a valid login<h1>")
  }
}

$('.submit-button').click(showLoginHandler);
