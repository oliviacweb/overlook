let allFetch = {

  fetchData() {
  let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then((response) => response.json())
    .catch(error => console.log(error));
  let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then((response) => response.json())
    .catch(error => console.log(error));
  let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then((response) => response.json())
    .catch(error => console.log(error));
  return Promise.all([userData, bookingData, roomData])
    .then(response => {
      let newDataObj = {};
      newDataObj.userData = response[0].users;
      newDataObj.bookingData = response[1].bookings;
      newDataObj.roomData = response[2].rooms;
      return newDataObj;
    })
    .catch(error => console.log(error));
},

postData(roomNumber, currentUserId, date) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userID': currentUserId,
        'date': date,
        'roomNumber': roomNumber
      })
    }).then(() => {
      console.log(`${roomNumber} is booked`);
      alert(`${roomNumber} is booked`)
    }).catch(() => {
      console.log("Sorry we couldn't complete this booking");
    })
},

 deleteData(bookingID) {
   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'id': bookingID
    })
  }).then(() => {
    console.log(`${bookingID} is deleted`);
    alert(`reservation is deleted`)
  }).catch(() => {
    console.log('error deleting booking');
    alert('failed to delete this booking')
  })
 }

}


export default allFetch;
