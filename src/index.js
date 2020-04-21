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
let individualRoom;



let userIdentification = $('.user-name');
let userPassword = $('.password');
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
  today = moment().format('YYYY/MM/DD')
  // today = "2020/01/13";
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
    <label for="specific-user-name">Find User By Name:</label>
    <input aria-label="search user name" type="text" id="specific-user-name" required>
    <button class="name-submit" type="button" val="Submit">submit</button>
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
  // let target = $(event.target);
  // if(target.is("p")) {
  //    target = target.parent()
  // }
  let target;
  if($(event.target).hasClass('book-room')) {
    target = $(event.target);
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
    target.parent().remove()
}
}

const deleteReservation = (event) => {
 if($(event.target).hasClass("delete-booking")) {
     let bookingID = $(event.target).attr("bookingnumber");
     fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'id': +bookingID
      })
    }).then(() => {
      console.log(`${bookingID} is deleted`);
      alert(`reservation is deleted`)
    }).catch(() => {
      console.log('error deleting booking');
      alert('failed to delete this booking')
    })
    $(event.target).parent().remove();
  }
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
  if(matches === 0) {
    availableList.append(`<h1>Sorry there are no ${roomFilter}s available!</h1>`)
  }
}

}

const showAvailableRoomsForCustomer = () => {
  showAvailableRoomsForDate();
}

const showAvailableRoomsForManager = () => {
  console.log('yooooo');
  showAvailableRoomsForDate();
}


const showCustomerData = () => {
  $("#user-info").html("");
  let nameInput = $("#specific-user-name");
  let namesArray = userData.map(data => data.name)
  currentUserId = theManager.findCustomerId(userData, nameInput.val());
  let pastCustomerBookings = theManager.findPastCustomerBookings(bookingData, today, currentUserId);
  let findTodayCustomerBookings = theManager.findTodayCustomerBookings(bookingData, today, currentUserId);
  let findFutureCustomerBookings = theManager.findFutureCustomerBookings(bookingData, today, currentUserId);
  let allFutureBookings = findTodayCustomerBookings.concat(findFutureCustomerBookings);
  console.log(allFutureBookings);

  // console.log(findFutureCustomerBookings);
  if(!namesArray.includes(nameInput.val())) {
      $("#user-info").html("<p>please enter a valid user</p>")
  } else  {
    $("#user-info").html(`<div id='past-user-bookings'>
    <h1>This User's Past Bookings</h1>
    </div>
    <div id='future-user-bookings'>
    <h1>This User's Future Bookings</h1>
    </div>
    <section class="manager-booking-container">
    <h1>Book Room For User:</h1>
    <div class="for-date">
    <label for="booking-form"></label>
    <form class="booking-form">
    <label for="date-picker">Pick a date to book:</label>
    <input min="${today.replace(/\//g, '-')}" required type="date" id="date-picker">
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
    $('.manager-booking-submit').click(showAvailableRoomsForManager);

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
  <label for="booking-form"></label>
  <form class="booking-form">
  <label for="date-picker">Pick a date to book:</label>
  <input min="${today.replace(/\//g, '-')}" required type="date" id="date-picker">
  <label for="room-filter">Filter By Room Type:</label>
  <select class"room-select" type="text" id="room-filter">
  <option value="residential suite">residential suite</option>
   <option value="suite">suite</option>
   <option value="single room">single room</option>
   <option value="junior suite">junior suite</option>
  </select>
  <button class="booking-submit" type="button" val="Submit">Submit</button>
  </form></div>
  </section>
  <rooms-available>
  <div class="available-list"></div>
  </rooms-available>`);
  $('.booking-submit').click(showAvailableRoomsForCustomer);
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
