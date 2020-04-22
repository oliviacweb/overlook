class Customer {
  constructor(data) {
    this.id = data.id;
  }

  allBookings(bookingData) {
   return bookingData.filter(booking => booking.userID === this.id)
  }

  futureBookings(bookingData, todayDate) {
   return this.allBookings(bookingData).filter(booking => booking.date > todayDate)
  }

  pastBookings(bookingData, todayDate) {
   return this.allBookings(bookingData).filter(booking => booking.date < todayDate)
  }

  presentBookings(bookingData, todayDate) {
   return this.allBookings(bookingData).filter(booking => booking.date === todayDate)
  }

  getTotalSpent(bookingData, roomData) {
   let userSpent = this.allBookings(bookingData).reduce((acc, booking) => {
    let costOfRoom = roomData.find(room => room.number === booking.roomNumber).costPerNight
      acc += costOfRoom
      return acc;
    }, 0)
   return userSpent;
  }
}


export default Customer;
