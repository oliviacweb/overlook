// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// import Booking from './Booking';
// import Hotel from './Hotel';
// import Room from './Room';
import Customer from './Customer';
let userData;
let newDataObj;
let bookingData;
let roomData;
let currentUser;

let userIdentification = $('.user-name');
let userPassword = $('.pword');
let mainPage = $('.main-page');

$(document).ready(() => {
  fetchData().then(data => {
  userData = data.userData;
  bookingData = data.bookingData;
  roomData = data.roomData;
})
  .then(pageLoadHandler)
  .catch(error => console.log(error));
});

const pageLoadHandler = () => {
  console.log("hey")
}

const showLogin = () => {
  event.preventDefault();
  let currentUserName = userIdentification.val();
  let currentUserId = +currentUserName.match(/\d+/);
  if(currentUserName === 'manager' && userPassword.val() === 'overlook2020') {
     mainPage.html('<h1>Hello, manager<h1>');

   } else if(currentUserName.includes('customer') && userPassword.val() === 'overlook2020') {
     let currentUser = userData[currentUserId]
     mainPage.html(`<h1>Hello, ${currentUser.name}<h1>`);

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
